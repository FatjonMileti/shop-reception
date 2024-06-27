import { Box } from '@mui/material'
import { WebcamCapture } from 'components/core-ui/WebcamCapture'
import { DeleteImageActionIcon, FullscreenImageActionIcon, UploadImageActionIcon } from 'icons'
import s from './PhotoItem.modules.scss'
import { PhotoItemProps } from 'components/lostSalesOpportunities/interfaces'

const PhotoItem: React.FC<PhotoItemProps> = props => {
  const { photo, setPhotoValue, setIsPictureChanged, errors, setShowPhotoCapture } = props

  return photo ? (
    <Box className={s.imageContainer}>
      <img
        src={URL.createObjectURL(photo)}
        style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'cover' }}
      />
      <Box className={s.imageActions}>
        <Box
          onClick={() => {
            setPhotoValue(undefined)
            setShowPhotoCapture(false)
          }}
          className={s.imageAction}
        >
          <DeleteImageActionIcon />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box className={s.videoContainer}>
      <WebcamCapture
        onImageCapture={imageSrc => {
          fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
              const file = new File([blob], 'File name', { type: 'image/png' })
              setPhotoValue(file)
              setIsPictureChanged(true)
            })
        }}
        videoConstraints={{ width: 300, height: 300, facingMode: 'environment' }}
        buttonStyle={{ width: '100%', marginBottom: '24px' }}
      />
      {!!errors.photo && (
        <p
          style={{
            color: '#AA0D11',
            fontFamily: 'Ubuntu',
            fontWeight: '400',
            fontSize: '0.75rem',
            lineHeight: '1.66',
            margin: '4px 0 0 14px'
          }}
        >
          {errors.photo as string}
        </p>
      )}
    </Box>
  )
}

export default PhotoItem
