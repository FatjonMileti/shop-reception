import { useState } from 'react'
import { makeCorePostRequest } from '../../../../../utils/api'
import { IconButton } from '@mui/material'
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import Resizer from 'react-image-file-resizer'

const resizeFile = (file: Blob): Promise<File> => {
  return new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      'JPEG',
      50,
      0,
      (uri: File) => {
        resolve(uri)
      },
      'file'
    )
  })
}

const ImageUpload = ({ uploadUrl, onSuccess, onError, inputId, isButton = false, label = "Adauga imagine" }) => {
  const [imageSelected, setImageSelected] = useState(false)

  const handleImageChange = async e => {
    const file = e.target.files[0]
    if (file) {
      const formData = new FormData()

      const resizedImage = await resizeFile(file);

      formData.append('photoFile', resizedImage)

      try {
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
      } finally {
        setImageSelected(true)
      }
    }

    e.target.value = null
  }

  return (
    <div>
      <label htmlFor={inputId} style={{ cursor: 'pointer' }}>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        {isButton ? (
          <Button
            type="button"
            variant="outlined"
            label={label}
            style={{ width: '100%' }}
            onClick={() => {
              document.getElementById(inputId).click()
            }}
          />
        ) : (
          <IconButton
            onClick={() => {
              document.getElementById(inputId).click()
            }}
            style={{ color: imageSelected ? 'green' : '#0970E6' }}
          >
            <CameraIcon />
          </IconButton>
        )}
      </label>
    </div>
  )
}

export default ImageUpload
