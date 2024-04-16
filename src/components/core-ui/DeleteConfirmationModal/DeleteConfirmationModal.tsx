import { Modal } from 'components/core-ui/Modal'
import { Grid } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { makeCoreDeleteRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { FC, ReactNode } from 'react'

interface DeleteConfirmationProps {
  isModalOpen: boolean
  closeModal: Function
  actionUrl: string
  itemId: string | number
  content: ReactNode
  title?: string
  deleteLabel?: string
  cancelLabel?: string
  setShouldRefreshData?: Function
  additionalAction?: Function
}

const DeleteConfirmationModal: FC<DeleteConfirmationProps> = props => {
  const {
    isModalOpen,
    closeModal,
    actionUrl,
    itemId,
    title,
    content,
    deleteLabel,
    cancelLabel,
    setShouldRefreshData,
    additionalAction
  } = props
  const { showNotification } = useNotification()

  const onDelete = async () => {
    try {
      await makeCoreDeleteRequest(actionUrl.replace(':id', `${itemId}`))
      additionalAction && additionalAction()
      setShouldRefreshData && setShouldRefreshData(true)
      closeModal()
    } catch (error) {
      showNotification({
        message: `Error while deleting data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={title || 'Delete'}>
      <Grid container spacing={4}>
        <Grid xs={12} item className={s.modalMessage}>
          {content}
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label={cancelLabel ?? 'Cancel'} onClick={() => closeModal()} />
          <Button variant="contained" label={deleteLabel ?? 'Delete'} onClick={onDelete} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default DeleteConfirmationModal
