import { useState, ChangeEvent } from 'react'
import { Switch as GeneralSwitch, Modal, Box, useMediaQuery, Grid } from '@mui/material'
import { Button, Typography, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Close } from '@mui/icons-material'
import { makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { SwitchProps } from './SwitchDefinitions'
import s from './Switch.modules.scss'

const sx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: '#fff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
  p: 4
}

const Switch = (props: SwitchProps) => {
  const { action, payloadKey, successMessage, value, pathId, confirmModal } = props

  const [checked, setChecked] = useState(value || false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tempChecked, setTempChecked] = useState(value || false)

  const { showNotification } = useNotification()

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setTempChecked(checked)
    openModal()
  }

  const onSubmit = async () => {
    try {
      if (action.type === 'PUT') {
        let url = action.url
        if (pathId) {
          url = `${url}/${pathId}`
        }

        await makeCorePutRequest(url, { [payloadKey]: tempChecked })

        setChecked(tempChecked)

        showNotification({
          message: successMessage || 'Scuccess',
          type: 'success'
        })
      }
      closeModal()
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la schimbarea statusului comenzii. ${formatErrorMessage(
          error
        )}`,
        type: 'error'
      })
    }
  }

  const isXs = useMediaQuery('(max-width:624px)')
  const isMd = useMediaQuery('(max-width:936px)')

  return (
    <>
      <GeneralSwitch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        className={s.switch}
      />
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={isModalOpen}
        onClose={closeModal}
      >
        <Box
          sx={{
            ...sx,
            width: isXs ? 'calc(100% - 24px)' : isMd ? '50%' : '30%'
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
                <span className={s.modalTitle}>{confirmModal.modalTitle}</span>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <span className={s.modalMessage}>
                {tempChecked ? confirmModal.toggleTrueMessage : confirmModal.toggleFalseMessage}
              </span>
            </Grid>
            <Grid item xs={12} className={s.modalButtons}>
              <Button label={confirmModal.cancelButtonText} onClick={closeModal} />
              <Button
                variant="contained"
                label={confirmModal.confirmButtonText}
                onClick={onSubmit}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default Switch
