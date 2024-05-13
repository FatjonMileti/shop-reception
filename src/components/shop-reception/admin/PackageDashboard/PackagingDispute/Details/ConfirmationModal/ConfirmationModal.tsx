import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'

const ConfirmationModal = ({ isModalOpen, closeModal, saveData }) => {
  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Confirma schimbarile">
      <Grid container spacing={4} style={{ marginBottom: '40px' }}>
        <Grid xs={12} item>
          Esti sigur ca vrei sa salvezi optiunile? Taskul va fi trimis la resposabilul de depozit.
        </Grid>
      </Grid>
      <Grid xs={12} item className={s.modalButtons}>
        <Button variant="outlined" label="Anuleaza" onClick={closeModal} />
        <Button variant="contained" label="Salveaza" onClick={saveData} />
      </Grid>
    </Modal>
  )
}

export default ConfirmationModal
