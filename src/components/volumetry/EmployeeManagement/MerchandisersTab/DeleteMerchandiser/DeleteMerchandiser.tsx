import { Modal } from 'components/core-ui/Modal'
import { Grid, Typography } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { makeCoreDeleteRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

interface DeleteMerchandiserProps {
  isModalOpen: boolean
  closeModal: Function
  deleteItem: any
  setShouldRefreshData: Function
}

const DeleteMerchandiser: React.FC<DeleteMerchandiserProps> = props => {
  const { isModalOpen, closeModal, deleteItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const onDelete = async () => {
    try {
      const itemId = (deleteItem as any)?.id;

      await makeCoreDeleteRequest(`/volumetry/merchendiser/${itemId}`)

      closeModal()
      setShouldRefreshData(true)
    } catch (error) {
      showNotification({
        message: `Eroare la stergerea merchandiserului. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Sterge'}>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <Typography>Sunteti sigur ca vreti sa stergeti acest merchandiser?</Typography>
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button variant="contained" label="Sterge" onClick={onDelete} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default DeleteMerchandiser
