import { Modal } from 'components/core-ui/Modal'
import { Grid, Typography } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { makeCoreDeleteRequest } from 'utils/api'
import { handleQueryError } from 'utils/helpers'
import { useNotification } from 'hooks'
import { DeleteLocationCategoryProps } from 'components/volumetry/interfaces'

const DeleteLocationCategory: React.FC<DeleteLocationCategoryProps> = props => {
  const { isModalOpen, closeModal, itemId, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const onDelete = async () => {
    try {
      await makeCoreDeleteRequest(`/volumetry/location-categories/${itemId}`)
      closeModal()
      setShouldRefreshData(true)
    } catch (error) {
      handleQueryError(error, 'A aparut o eroare la stergerea categoriei', showNotification)
    }
  }
  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Sterge'}>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <Typography>Sunteti sigur ca vreti sa stergeti aceasta categorie?</Typography>
        </Grid>
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button variant="contained" label="Sterge" onClick={onDelete} />
        </Grid>
      </Grid>
    </Modal>
  )
}
export default DeleteLocationCategory
