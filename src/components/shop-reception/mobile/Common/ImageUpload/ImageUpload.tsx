import { useState } from 'react'
import { makeCorePostRequest } from '../../../../../utils/api'
import { IconButton } from '@mui/material'
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { WebcamCapture } from 'components/core-ui/WebcamCapture'
import { resizeFile } from 'utils/helpers'

const ImageUpload = ({
  uploadUrl,
  onSuccess,
  onError,
  inputId,
  isButton = false,
  label = 'Adauga imagine'
}) => {
  const [imageSelected, setImageSelected] = useState(false)
  const [showPhotoCapture, setShowPhotoCapture] = useState(false)

  return (
    <div>
      {showPhotoCapture && (
        <WebcamCapture
          buttonStyle={{ width: '100%' }}
          onImageCapture={async imageSrc => {
            fetch(imageSrc)
              .then(res => res.blob())
              .then(async blob => {
                const file = new File([blob], 'image.JPEG', { type: 'image/png' })

                try {
                  const formData = new FormData()
                  formData.append('photoFile', file)

                  const response = await makeCorePostRequest(uploadUrl, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                  if (onSuccess) {
                    onSuccess(response)
                  }
                } catch (error) {
                  if (onError) {
                    onError(error)
                  }
                }
              })
          }}
          videoConstraints={{ width: 300, height: 300, facingMode: 'environment' }}
        />
      )}
      {!showPhotoCapture && (
        <>
          {isButton ? (
            <Button
              type="button"
              variant="outlined"
              label={label}
              style={{ width: '100%' }}
              onClick={() => {
                setShowPhotoCapture(true)
              }}
            />
          ) : (
            <IconButton
              onClick={() => {
                setShowPhotoCapture(true)
              }}
              style={{ color: imageSelected ? 'green' : '#0970E6' }}
            >
              <CameraIcon />
            </IconButton>
          )}
        </>
      )}
      {/* </label> */}
    </div>
  )
}

export default ImageUpload
