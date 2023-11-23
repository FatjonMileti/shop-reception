import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid, Typography } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useNotification } from 'hooks'
import { FC } from 'react'
import { makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { SUBMIT_MODAL_CONTENT } from '../BillsTable/constants'

interface ModalProps {
  isModalOpen: boolean
  closeModal: Function
  id: number
  setShouldRefreshData?: Function
}

const SubmitModal: FC<ModalProps> = props => {
  const { isModalOpen, closeModal, id, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const onSubmit = async () => {
    try {
      await makeCorePutRequest(`/supply-omni/order/preparation/${id}`)

      closeModal()
      if (setShouldRefreshData) {
        setShouldRefreshData(true)
      }
    } catch (error) {
      showNotification({
        message: `Error on set order as prepared. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Confirma actiunea">
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <Typography>{SUBMIT_MODAL_CONTENT}</Typography>
        </Grid>
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Renunta" onClick={() => closeModal()} />
          <Button variant="contained" label="Confirma" onClick={onSubmit} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default SubmitModal
