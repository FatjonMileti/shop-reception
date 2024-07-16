import { Grid } from '@mui/material'
import { getImageTitle } from './helpers'
import { useEffect, useState } from 'react'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { ImageDetails } from './ImageDetails'
import cn from 'classnames'
import s from './Images.modules.scss'
import { useQuery } from 'react-query'

const Images = ({ id }) => {
  const [images, setImages] = useState([])
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const { showNotification } = useNotification()

  const { data: pictureModels } = useQuery(
    ['pictureModels', id],
    async () => {
      if (id) {
        const result = await makeCoreGetRequest(`/shop-reception/return-trucks/${id}/details/tabs/images`)
        return result
      }
      return null
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea listei de imagini. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  useEffect(() => {
    ;(async () => {
      try {
        const imageResults = typeof pictureModels !== 'undefined' ? await Promise.all(
          pictureModels.map(async picture => {
            if (picture.deleted) {
              return { ...picture, src: '', title: picture.title || getImageTitle(picture) }
            } else {
              try {
                const response = await makeCoreGetFileRequest('/shop-reception/pictures/export', {
                  responseType: 'blob',
                  // params: { path: 'exit/truck_images/9/20240429045337_211.jpg' }
                  params: { path: picture.path }
                })
                const { data } = response
                const blobUrl = URL.createObjectURL(data)
                return {
                  ...picture,
                  src: blobUrl,
                  title: picture.title || getImageTitle(picture)
                }
              } catch (e) {
                return { ...picture, src: '', title: picture.title || getImageTitle(picture) }
              }
            }
          })
        ): []

        setImages(imageResults)
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la obtinerea imaginilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    })()
  }, [pictureModels])

  const openDetailsModal = (): void => setIsDetailsModalOpen(true)
  const closeDetailsModal = (): void => setIsDetailsModalOpen(false)

  return (
    <>
      <Grid container spacing={2}>
        {images.map(image => (
          <Grid item key={`${image.path}-${image.locationName}`} xs={12} sm={6} md={4}>
            <div>{image.title}</div>
            <div
              onClick={() => {
                if (image.src) {
                  setSelectedImage(image)
                  openDetailsModal()
                }
              }}
              className={cn(s.imgContainer, { [s.clickable]: image.src })}
            >
              <img src={image.src || 'images/imageNotAvailable.png'} alt="Imagine" />
            </div>
          </Grid>
        ))}
      </Grid>
      <ImageDetails
        isModalOpen={isDetailsModalOpen}
        closeModal={closeDetailsModal}
        image={selectedImage}
      />
    </>
  )
}

export default Images
