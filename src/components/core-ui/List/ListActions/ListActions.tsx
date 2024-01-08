import { ButtonWithConfirmDeleteModal } from '../../ButtonWithConfirmDeleteModal'
import { Delete } from '@mui/icons-material'

const ListActions = ({ item, deleteAction, additionalAction }) => {
  return (
    <div>
      {deleteAction && (
        <ButtonWithConfirmDeleteModal
          buttonProps={{ children: <Delete /> }}
          modalTitle="Delete"
          modalMessage={deleteAction.confirmText}
          formButtons={deleteAction.formButtons}
          deletedItemId={item.id}
          deleteActionUrl={deleteAction.url}
          additionalAction={additionalAction}
          deleteActionQueryParams={`${deleteAction.queryParam}=${item[deleteAction.variable]}`}
        />
      )}
    </div>
  )
}

export default ListActions
