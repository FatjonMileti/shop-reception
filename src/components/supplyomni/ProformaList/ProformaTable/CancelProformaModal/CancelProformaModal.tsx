import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'

interface CancelProformaModalProps {
  isModalOpen: boolean
  closeModal: Function
  orderId: string | number
  setShouldRefreshData?: Function
}

const CancelProformaModal = (props: CancelProformaModalProps) => {
  const { isModalOpen, closeModal, orderId, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const cancelProforma = async () => {
    try {
      debugger
      await makeCorePutRequest(`/supply-omni/order/cancellation/${orderId}`)

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
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Anuleaza proforma">
      <Grid container spacing={4}>
        <Grid xs={12} item>
          Sunteti sigur ca vreti sa anulati aceasta proforma?
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Nu" onClick={() => closeModal()} />
          <Button variant="contained" label="Da" onClick={cancelProforma} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default CancelProformaModal
