import { Modal } from "components/core-ui/Modal"
import { Grid, Typography } from "@mui/material"
import { Button } from "@fullscreendigital/carrefour-dex-fe"
import s from "components/core-ui/Modal/Modal.modules.scss"
import { makeCoreDeleteRequest } from "utils/api"
import { useNotification } from "hooks"
import { formatErrorMessage } from "utils/formatting"
import { FC, ReactNode } from "react"

interface DeleteConfirmationProps {
  isModalOpen: boolean
  closeModal: Function
  actionUrl: string
  itemId: string
  content: ReactNode
  deleteLabel?: string
  cancelLabel?: string
  setShouldRefreshData?: Function
}

const DeleteConfirmationModal: FC<DeleteConfirmationProps> = props => {
  const {
    isModalOpen,
    closeModal,
    actionUrl,
    itemId,
    content,
    deleteLabel,
    cancelLabel,
    setShouldRefreshData
  } = props
  const { showNotification } = useNotification()

  const onDelete = async () => {
    try {
      await makeCoreDeleteRequest(actionUrl.replace(":id", itemId))

      closeModal()
      if (setShouldRefreshData) {
        setShouldRefreshData(true)
      }
    } catch (error) {
      showNotification({
        message: `Error while deleting data. ${formatErrorMessage(error)}`,
        type: "error"
      })
    }
  }

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={"Delete"}>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          {content}
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label={cancelLabel ?? "Cancel"} onClick={() => closeModal()} />
          <Button variant="contained" label={deleteLabel ?? "Delete"} onClick={onDelete} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default DeleteConfirmationModal
