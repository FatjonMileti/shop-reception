import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'

interface CreateClientModalProps {
  isOpen: boolean
  closeModal: Function
  onSubmit: Function
}

const CreateClientModal: React.FC<CreateClientModalProps> = props => {
  const { isOpen, closeModal, onSubmit } = props

  return (
    <Modal isModalOpen={isOpen} closeModal={closeModal} modalTitle={'Clientul cautat nu exista'}>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          Clientul cautat nu exista. Vrei sa adaugi client nou?
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="NU" onClick={() => closeModal()} />
          <Button variant="contained" label="DA" onClick={() => onSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default CreateClientModal
