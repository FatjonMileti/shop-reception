import { useState } from 'react'
import { Box, Grid, Modal as GeneralModal, useMediaQuery } from '@mui/material'
import { Button, Typography, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Close, West } from '@mui/icons-material'
import s from './Modal.modules.scss'

const sx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  maxHeight: '90%',
  bgcolor: '#fff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
  p: 4,
  overflow: 'scroll'
}

const Modal = props => {
  const {
    isModalOpen,
    closeModal,
    modalTitle,
    children,
    modalWidth = null,
    onClick,
    backAction
  } = props

  const isXs = useMediaQuery('(max-width:624px)')
  const isMd = useMediaQuery('(max-width:936px)')

  return (
    <GeneralModal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isModalOpen}
      onClose={closeModal}
      onClick={onClick}
    >
      <Box
        sx={{
          ...sx,
          width: isXs ? 'calc(100% - 24px)' : modalWidth || '30%',
          overflow: 'auto'
        }}
      >
        <IconButton
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          withBackground
          onClick={closeModal}
        >
          <Close />
        </IconButton>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography component="h2" variant="medium">
              {backAction && (
                <IconButton onClick={backAction}>
                  <West />
                </IconButton>
              )}
              <span className={s.modalTitle}>{modalTitle}</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </GeneralModal>
  )
}

export default Modal
