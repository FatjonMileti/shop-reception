import { useState } from 'react'
import { ImageCellProps } from './ImageCellDefinitions'
import cn from 'classnames'
import s from './ImageCell.modules.scss'
import { Box, Modal, useMediaQuery } from '@mui/material'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Close } from '@mui/icons-material'

const sx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '80%',
  bgcolor: '#fff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
  p: 4
}

const ImageCell = (props: ImageCellProps) => {
  const { value, imageUrl } = props

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  const isXs = useMediaQuery('(max-width:624px)')
  const isMd = useMediaQuery('(max-width:936px)')

  const clickImage = () => {
    if (imageUrl) {
      openModal()
    }
  }

  return (
    <div className={s.container}>
      <img
        className={cn(s.image, { [s.clickable]: imageUrl })}
        src={imageUrl ?? 'images/default-product-image.svg'}
        alt="Selected file"
        onClick={clickImage}
      />
      {value}
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={isModalOpen}
        onClose={closeModal}
      >
        <Box
          sx={{
            ...sx,
            width: isXs ? 'calc(100% - 24px)' : isMd ? '70%' : '50%'
          }}
        >
          <IconButton
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
            withBackground
            onClick={closeModal}
          >
            <Close />
          </IconButton>
          <Box className={s.modalImageContainer}>
            <img src={imageUrl} className={s.modalImage} alt="Selected file" />
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ImageCell
