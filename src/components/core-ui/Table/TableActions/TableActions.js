import { Edit, Delete, Visibility, Cancel } from '@mui/icons-material'
import { ButtonWithModalAndForm } from '../../ButtonWithModalAndForm'
import { ButtonWithConfirmDeleteModal } from '../../ButtonWithConfirmDeleteModal'
import { ButtonWithConfirmCancelModal } from '../../ButtonWithConfirmCancelModal'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { useNavigate, useSearchParams } from 'react-router-dom'

const TableActions = ({
  itemId,
  viewAction,
  editAction,
  deleteAction,
  cancelAction,
  additionalAction,
  canView,
  canEdit,
  canDelete,
  canCancel,
  isUserModal
}) => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  return (
    <div style={{ minWidth: '5rem' }}>
      {viewAction && canView && (
        <Button
          onClick={() => {
            let url = `${viewAction.url}/${itemId}`

            if (viewAction.variable) {
              const paramValue = searchParams.get(viewAction.variable)
              url = `${url}?${viewAction.variable}=${paramValue}`
            }

            navigate(url)
          }}
          style={{ minWidth: '0.7rem' }}
        >
          <Visibility />
        </Button>
      )}
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
          isUserModal={isUserModal}
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
      {cancelAction && canCancel && (
        <ButtonWithConfirmCancelModal
          buttonProps={{ children: <Cancel /> }}
          modalTitle="Cancel"
          modalMessage={cancelAction.confirmText}
          formButtons={cancelAction.formButtons}
          itemId={itemId}
          action={{
            type: cancelAction.type,
            url: cancelAction.url
          }}
          additionalAction={additionalAction}
        />
      )}
    </div>
  )
}

export default TableActions
