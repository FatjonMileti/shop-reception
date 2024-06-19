import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { makeCoreDeleteRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'

interface UnsnoozeAlarmModal {
  isModalOpen: boolean
  closeModal: Function
  id: string | number
  setShouldRefreshData?: Function
}

const UnsnoozeAlarmModal = (props: UnsnoozeAlarmModal) => {
  const { isModalOpen, closeModal, id, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const unsnoozeAlarm = async () => {
    try {
      await makeCoreDeleteRequest(`/lso/alerts-configuration/${id}`)
      closeModal()
      setShouldRefreshData(true)
      showNotification({
        message: 'Alarma a fost activata cu succes.',
        type: 'success'
      })
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la activarea alarmei. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Activeaza alarma">
      <Grid container spacing={4}>
        <Grid xs={12} item>
          Sunteti sigur ca vreti sa re-activati aceasta alarma?
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Nu" onClick={() => closeModal()} />
          <Button variant="contained" label="Da" onClick={unsnoozeAlarm} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default UnsnoozeAlarmModal
