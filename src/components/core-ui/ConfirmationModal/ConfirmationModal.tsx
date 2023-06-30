import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useMediaQuery } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../ModalWithForm/ModalForm/ModalForm.modules.scss'

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

const ConfirmationModal = ({
  isModalOpen,
  closeModal,
  modalTitle,
  modalMessage,
  buttons,
  confirm
}) => {
  const isXs = useMediaQuery('(max-width:624px)')
  const isMd = useMediaQuery('(max-width:936px)')

  return (
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
            {buttons.map(button => {
              const { isConfirmButton, ...rest } = button
              return (
                <Button
                  key={button.label}
                  {...rest}
                  onClick={isConfirmButton ? confirm : closeModal}
                />
              )
            })}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ConfirmationModal
