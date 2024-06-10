import { Box } from '@mui/material'
import { WebcamCapture } from 'components/core-ui/WebcamCapture'
import { DeleteImageActionIcon, FullscreenImageActionIcon, UploadImageActionIcon } from 'icons'
import s from './PhotoItem.modules.scss'

const PhotoItem = props => {
  const { photo, setPhotoValue, setIsPictureChanged, errors, setShowPhotoCapture } = props

  return photo ? (
    <Box className={s.imageContainer}>
      <img
        src={URL.createObjectURL(photo)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box className={s.imageActions}>
        <Box onClick={() => setShowPhotoCapture(false)} className={s.imageAction}>
          <UploadImageActionIcon />
        </Box>
        <Box onClick={() => setPhotoValue(undefined)} className={s.imageAction}>
          <DeleteImageActionIcon />
        </Box>
        <Box onClick={() => console.log('large')} className={s.imageAction}>
          <FullscreenImageActionIcon />
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
      {!!errors && (
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
          {errors as string}
        </p>
      )}
    </Box>
  )
}

export default PhotoItem
