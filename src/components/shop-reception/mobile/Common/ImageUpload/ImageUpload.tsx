import { useRef, useState } from 'react'
import { makeCorePostRequest } from '../../../../../utils/api'
import { Box } from '@mui/material'
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import { Button, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { WebcamCapture } from 'components/core-ui/WebcamCapture'
import ImageIcon from '@mui/icons-material/Image'
import s from './ImageUpload.modules.scss'

const ImageUpload = ({
  uploadUrl,
  onSuccess,
  onError,
  isButton = false,
  label = 'Adauga imagine',
  btnStyle = {}
}) => {
  const [imageSelected, setImageSelected] = useState(false)
  const [showPhotoCapture, setShowPhotoCapture] = useState(false)
  const [file, setFile] = useState(null)

  const inputFileRef = useRef<HTMLInputElement>()

  const saveFile = async (file: File): Promise<void> => {
    setShowPhotoCapture(false)

    try {
      const formData = new FormData()
      formData.append('photoFile', file)

      const response = await makeCorePostRequest(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (onSuccess) {
        setFile(file)
        onSuccess(response)
      }
    } catch (error) {
      if (onError) {
        onError(error)
      }
    }
  }

  return (
    <div>
      {showPhotoCapture ? (
        <Box className={s.webcamContainer}>
          <WebcamCapture
            buttonStyle={{ width: '100%' }}
            onImageCapture={async imageSrc => {
              fetch(imageSrc)
                .then(res => res.blob())
                .then(async blob => {
                  const file = new File([blob], 'image.JPEG', { type: 'image/png' })
                  await saveFile(file)
                })
            }}
            videoConstraints={{ width: 300, height: 300, facingMode: 'environment' }}
          />
          <IconButton
            label="Incarca foto"
            onClick={() => {
              inputFileRef?.current?.click()
            }}
            startIcon={<ImageIcon />}
            variant="outlined"
            sx={{ marginBottom: '16px', marginTop: '24px', width: '100%' }}
          />
          <input
            ref={inputFileRef}
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            onChange={e => {
              if (e.target.files) {
                saveFile(e.currentTarget.files[0])
              }
            }}
          />
        </Box>
      ) : file ? (
        <Box className={s.imageContainer}>
          <img
            src={URL.createObjectURL(file)}
            style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'cover' }}
          />
        </Box>
      ) : (
        <>
          {isButton ? (
            <Button
              type="button"
              variant="outlined"
              label={label}
              style={{ ...btnStyle, width: '100%' }}
              onClick={() => {
                setShowPhotoCapture(true)
              }}
            />
          ) : (
            <IconButton
              onClick={() => {
                setShowPhotoCapture(true)
              }}
              style={{ ...btnStyle, color: imageSelected ? 'green' : '#0970E6' }}
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
