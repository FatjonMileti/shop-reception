import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Close } from '@mui/icons-material'
import { Button, Typography, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { makeCorePostRequest, makeCorePutRequest, makeCorePatchRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { CircularProgress, useMediaQuery } from '@mui/material'
import s from '../ModalWithForm/ModalForm/ModalForm.scss'

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

const ButtonWithConfirmCancelModal = ({
  buttonProps,
  modalTitle,
  modalMessage,
  formButtons,
  itemId,
  action,
  additionalAction
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)

  const { showNotification } = useNotification()

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  const cancelItem = async () => {
    setIsCanceling(true)
    try {
      if (action.type === 'POST') {
        await makeCorePostRequest(`${action.url}`, { id: itemId })
        showNotification({
          message: 'Anulat cu succes',
          type: 'success'
        })
      }
      if (action.type === 'PUT') {
        await makeCorePutRequest(`${action.url}`, { id: itemId })
        showNotification({
          message: 'Anulat cu succes',
          type: 'success'
        })
      }
      if (action.type === 'PATCH') {
        await makeCorePatchRequest(`${action.url}`, { id: itemId })
        showNotification({
          message: 'Anulat cu succes',
          type: 'success'
        })
      }
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la anulare. ${error?.message}`,
        type: 'error'
      })
    }
    additionalAction && additionalAction()
    setIsCanceling(false)
    closeModal()
  }

  const isXs = useMediaQuery('(max-width:624px)')
  const isMd = useMediaQuery('(max-width:936px)')

  return (
    <>
      <Button {...buttonProps} onClick={openModal} style={{ minWidth: '0.7rem' }} />
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
          {(isCanceling && (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            </div>
          )) || (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography component="h2" variant="medium">
                  <span className={s.modalTitle}>{modalTitle}</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <span className={s.modalMessage}>{modalMessage}</span>
              </Grid>
              <Grid item xs={12} className={s.modalButtons}>
                {formButtons.map(formButton => {
                  const { isDeleteButton, ...rest } = formButton
                  return (
                    <Button
                      key={formButton.label}
                      {...rest}
                      onClick={isDeleteButton ? cancelItem : closeModal}
                    />
                  )
                })}
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default ButtonWithConfirmCancelModal
