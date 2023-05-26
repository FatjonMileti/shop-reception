import { ButtonWithConfirmDeleteModal } from '../../ButtonWithConfirmDeleteModal'
import { Delete } from '@mui/icons-material'

const ListActions = ({ itemId, deleteAction, additionalAction }) => {
  return (
    <div>
      {deleteAction && (
        <ButtonWithConfirmDeleteModal
          buttonProps={{ children: <Delete /> }}
          modalTitle="Delete"
          modalMessage={deleteAction.confirmText}
          formButtons={deleteAction.formButtons}
          deletedItemId={itemId}
          deleteActionUrl={deleteAction.url}
          additionalAction={additionalAction}
        />
      )}
    </div>
  )
}

export default ListActions
