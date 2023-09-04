import React, { useEffect, useState } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import s from './FileUpload.modules.scss'
import FileViewDetails from './FileViewDetails'

const FileUpload = props => {
  const { value, editItem, fileInputProps, onChange } = props
  const { displayImage } = fileInputProps
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedFileUrl, setSelectedFileUrl] = useState(null)

  async function getImageFileFromURL(imageUrl) {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      const file = new File([blob], editItem.name, { type: blob.type })
      return file
    } catch (error) {
      console.error('Error fetching image:', error)
      return null
    }
  }

  useEffect(() => {
    if (value) {
      ;(async () => {
        const response = await getImageFileFromURL(value)
        if (response) {
          const imageURL = URL.createObjectURL(response)
          setSelectedFile(response)
          setSelectedFileUrl(imageURL)
        }
      })()
    }
  }, [])

  const handleFileChange = event => {
    const file = event.target.files[0]
    const imageURL = URL.createObjectURL(file)

    onChange(event)
    setSelectedFile(file)
    setSelectedFileUrl(imageURL)
  }

  const handleClearFile = () => {
    onChange(null)
    setSelectedFile(null)
  }

  return (
    <div className={s.container}>
      {selectedFile ? (
        <>
          <div className={s.fileContainer}>
            <FileViewDetails
              selectedFile={selectedFile}
              selectedFileUrl={selectedFileUrl}
              displayImage={displayImage}
            />
            <div className={s.clearButton} onClick={handleClearFile}>
              <DeleteOutlineIcon style={{ marginRight: '9px' }} />
            </div>
          </div>
        </>
      ) : (
        <label htmlFor="file-upload">
          <div className={s.buttonWrapper}>
            <FileUploadIcon fontSize="small" style={{ marginRight: '9px' }} /> Alege fisier
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </label>
      )}
    </div>
  )
}

export default FileUpload
