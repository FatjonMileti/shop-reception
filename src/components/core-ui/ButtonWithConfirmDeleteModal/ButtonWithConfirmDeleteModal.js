import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Close } from '@mui/icons-material'
import { Button, Typography, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreDeleteRequest } from 'utils/api'

const sx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4
}

const ButtonWithConfirmDeleteModal = ({
  buttonProps,
  modalProps,
  modalTitle,
  modalMessage,
  formButtons,
  deletedItemId,
  deleteActionUrl,
  additionalAction
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  const deleteItem = async () => {
    try {
      await makeCoreDeleteRequest(`${deleteActionUrl}/${deletedItemId}`)
    } catch (error) {
      console.log(error)
    }
    additionalAction && additionalAction()
    closeModal()
  }
  return (
    <>
      <Button {...buttonProps} onClick={openModal} style={{ minWidth: '0.7rem' }} />
      <Modal
        {...modalProps}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={isModalOpen}
        onClose={closeModal}
      >
        <Box sx={{ ...sx, ...(modalProps ? modalProps.sx : {}) }}>
          <IconButton style={{ position: 'absolute', top: '1rem', right: '1.5rem' }} withBackground onClick={closeModal}>
            <Close />
          </IconButton>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography component="h2" variant="medium">
                {modalTitle}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {modalMessage}
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'right' }}>
              {formButtons.map(formButton => {
                const { isDeleteButton, ...rest } = formButton
                return (
                  <Button
                    key={formButton.label}
                    {...rest}
                    onClick={isDeleteButton ? deleteItem : closeModal}
                    style={{ marginLeft: '1.2rem' }}
                  />
                )
              })}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default ButtonWithConfirmDeleteModal
