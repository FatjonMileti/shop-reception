import { Modal } from 'components/core-ui/Modal'
import { Grid, Typography } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { makeCoreDeleteRequest } from 'utils/api'

const DeleteTimeOff = props => {
  const { isModalOpen, closeModal, deleteItem } = props

  const onDelete = async () => {
    try {
      await makeCoreDeleteRequest(`/governance/teamTimeOff/${deleteItem.id}`)
      closeModal();
    } catch (error) {
      console.error('Error DELETE timeoff request:', error)
    }
  }

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Delete'}>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <Typography>Are you sure you want to delete this entry?</Typography>
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={closeModal} />
          <Button variant="contained" label={'Delete'} onClick={onDelete} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default DeleteTimeOff
