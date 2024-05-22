import { useEffect, useState } from 'react'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from './ImageDetails.modules.scss'

const ImageDetails = ({ isModalOpen, closeModal, image }) => {
  const [rotateDegree, setRotateDegree] = useState(360)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    setTranslateY(rotateDegree === 90 ? -16 : rotateDegree === 270 ? 16 : 0)
  }, [rotateDegree])

  const rotateImage = () => setRotateDegree(rotateDegree === 360 ? 90 : rotateDegree + 90)

  return image ? (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={image.title}
      modalWidth="80%"
    >
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <Button variant="contained" label="Roteste" onClick={rotateImage} />
          <div className={s.imgContainer}>
            <img
              src={image.src || 'images/imageNotAvailable.png'}
              alt="Imagine"
              className={s.img}
              style={{
                transform: `rotate(${rotateDegree}deg) translateY(${translateY}%)`
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Modal>
  ) : null
}

export default ImageDetails
