import { useNotification } from 'hooks'
import s from '../../../commonStyles.modules.scss'
import { UploadForm } from './UploadForm'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useParams } from 'react-router-dom'
import { ImagesList } from './ImagesList'
import { toImagesData } from './serializers'

const PackingDisputeImages = () => {
  const { id } = useParams()

  const { showNotification } = useNotification()

  const { data: imageData, refetch } = useQuery(
    ['litigation', id],
    async () => {
      if (id) {
        const result = await makeCoreGetRequest(
          `/shop-reception/return-litigation/details/supports/${id}/images`
        )
        return { images: toImagesData(result), uploadModel: result.uploadModel }
      }
      return null
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea detaliilor litigiului. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <div className={s.mainContainer}>
      {imageData && (
        <>
          <UploadForm id={id} refetchImages={refetch} uploadModel={imageData.uploadModel} />
          <ImagesList images={imageData.images} />
        </>
      )}
    </div>
  )
}

export default PackingDisputeImages
