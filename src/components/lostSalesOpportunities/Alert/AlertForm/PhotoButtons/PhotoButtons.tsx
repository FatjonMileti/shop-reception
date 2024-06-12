import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { useRef } from 'react'
import { PhotoButtonsProps } from 'components/lostSalesOpportunities/interfaces'

const PhotoButtons: React.FC<PhotoButtonsProps> = props => {
  const { setShowPhotoCapture, setPhoto } = props

  const inputFileRef = useRef<HTMLInputElement>()

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <IconButton
          label="Deschide camera"
          onClick={() => setShowPhotoCapture(true)}
          startIcon={<ImageIcon />}
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <IconButton
          label="Incarca foto"
          onClick={() => {
            inputFileRef?.current?.click()
          }}
          startIcon={<ImageIcon />}
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />
        <input
          ref={inputFileRef}
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={e => {
            if (e.target.files) {
              setPhoto(e.currentTarget.files[0])
              setShowPhotoCapture(true)
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default PhotoButtons
