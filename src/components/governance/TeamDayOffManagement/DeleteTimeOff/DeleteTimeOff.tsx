import { Modal } from 'components/core-ui/Modal'
import { Grid, Typography } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { makeCoreDeleteRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { TeamDayOffManagementItem } from 'components/interfaces'

interface DeleteTimeOffProps {
  isModalOpen: boolean
  closeModal: Function
  deleteItem: TeamDayOffManagementItem | number
  setShouldRefreshData: Function
}

const DeleteTimeOff: React.FC<DeleteTimeOffProps> = props => {
  const { isModalOpen, closeModal, deleteItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const onDelete = async () => {
    try {
      const itemId = (deleteItem as TeamDayOffManagementItem)?.id;

      await makeCoreDeleteRequest(`/governance/teamTimeOff/${itemId}`)

      closeModal()
      setShouldRefreshData(true)
    } catch (error) {
      showNotification({
        message: `Error while deleting data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Delete'}>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <Typography>Are you sure you want to delete this entry?</Typography>
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
          <Button variant="contained" label="Delete" onClick={onDelete} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default DeleteTimeOff
