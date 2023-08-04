import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Close } from '@mui/icons-material'
import { Autocomplete, IconButton, Button } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { useMediaQuery } from '@mui/material'

import s from './DownloadModal.modules.scss'
import { useNotification } from 'hooks'

const sx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  bgcolor: '#fff',
  p: 4,
  maxHeight: '80%',
  overflowY: 'auto',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px'
}

const DownloadModal = ({
  modalProps,
  isModalOpen,
  closeModal,
  columns,
  modalTitle,
  downloadUrl
}) => {
  const [value, setValue] = useState(columns)
  const { showNotification } = useNotification()

  const closeModalAndResetForm = () => {
    closeModal()
  }

  const onSubmit = () => {
    if (isModalOpen) {
      ;(async () => {
        try {
          await makeCoreGetRequest(`${downloadUrl}/`)
        } catch (error) {
          showNotification({
            message: `Error while fetching item. ${error?.message}`,
            type: 'error'
          })
        } finally {
          closeModalAndResetForm()
        }
      })()
    }
  }

  const isXs = useMediaQuery('(max-width:624px)')

  return (
    <Modal
      {...modalProps}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isModalOpen}
      onClose={closeModalAndResetForm}
    >
      <Box
        sx={{
          ...sx,
          width: isXs ? 'calc(100% - 24px)' : '415px',
          height: '472px',
          ...(modalProps ? modalProps.sx : {})
        }}
      >
        <IconButton
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          withBackground
          onClick={closeModalAndResetForm}
        >
          <Close />
        </IconButton>
        {modalTitle && modalTitle.length > 0 && (
          <Grid item xs={12}>
            <Typography component="h2" variant="medium">
              <span className={s.modalTitle}>{modalTitle}</span>
            </Typography>
          </Grid>
        )}
        <Autocomplete
          multiple={true}
          options={columns}
          value={value}
          onChange={(_, val) => setValue(val)}
          label="Selecteaza coloane"
          variant="standard"
        />
        <Grid item xs={12} className={s.modalButtons}>
          <Button label="Anuleaza" onClick={closeModal} />
          <Button variant="contained" label="Printeaza" onClick={() => {}} />
        </Grid>
      </Box>
    </Modal>
  )
}

export default DownloadModal
