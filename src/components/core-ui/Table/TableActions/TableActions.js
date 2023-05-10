import { Edit, Delete } from '@mui/icons-material'
import { ButtonWithModalAndForm } from '../../ButtonWithModalAndForm'
import { ButtonWithConfirmDeleteModal } from '../../ButtonWithConfirmDeleteModal'

const TableActions = ({
  itemId,
  editAction,
  deleteAction,
  additionalAction,
  comboValue,
  canEdit,
  canDelete
}) => {
  return (
    <div style={{ minWidth: '5rem' }}>
      {editAction && canEdit && (
        <ButtonWithModalAndForm
          buttonProps={{ children: <Edit /> }}
          modalTitle="Edit"
          formItems={editAction.formItems}
          formInfoItems={editAction.formInfoItems}
          formItemsPerRow={editAction.formItemsPerRow}
          formButtons={editAction.formButtons}
          formAction={{
            type: editAction.updateUrlType,
            url: editAction.updateUrl.replace(':id', itemId)
          }}
          editedItemId={itemId}
          editedItemUrl={editAction.getUrl}
          additionalAction={additionalAction}
          comboValue={comboValue}
        />
      )}
      {deleteAction && canDelete && (
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

export default TableActions
