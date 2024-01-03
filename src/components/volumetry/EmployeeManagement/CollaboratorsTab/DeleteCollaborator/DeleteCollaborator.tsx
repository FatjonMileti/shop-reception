import { Modal } from 'components/core-ui/Modal'
import { Grid, Typography } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { makeCoreDeleteRequest } from 'utils/api'
import { handleQueryError } from 'components/volumetry/utils'

interface DeleteCollaboratorProps {
  isModalOpen: boolean
  closeModal: Function
  itemId: string | number
  setShouldRefreshData: Function
}

const DeleteCollaborator: React.FC<DeleteCollaboratorProps> = props => {
  const { isModalOpen, closeModal, itemId, setShouldRefreshData } = props

  const onDelete = async () => {
    try {
      await makeCoreDeleteRequest(`/volumetry/workers/contractors/${itemId}`)

      closeModal()
      setShouldRefreshData(true)
    } catch (error) {
      handleQueryError(error, 'Eroare la stergerea colaboratorului ')
    }
  }

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Sterge'}>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <Typography>Sunteti sigur ca vreti sa stergeti acest colaborator?</Typography>
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button variant="contained" label="Sterge" onClick={onDelete} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default DeleteCollaborator
