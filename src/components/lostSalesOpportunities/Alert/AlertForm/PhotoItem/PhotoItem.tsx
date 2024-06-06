import { Box, FormLabel } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import { WebcamCapture } from 'components/core-ui/WebcamCapture'
import { Button } from '@fullscreendigital/carrefour-dex-fe'

const PhotoItem = props => {
  const { photo, setPhotoValue, setIsPictureChanged, errors } = props

  return photo ? (
    <>
      <FormLabel>{photo.name}</FormLabel>
      <Button label="" variant="outlined" size="large" onClick={() => setPhotoValue(undefined)}>
        <DeleteOutline />
      </Button>
    </>
  ) : (
    <>
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
    </>
  )
}

export default PhotoItem
