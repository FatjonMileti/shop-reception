import { Edit, Delete, Visibility } from '@mui/icons-material'
import { ButtonWithModalAndForm } from '../../ButtonWithModalAndForm'
import { ButtonWithConfirmDeleteModal } from '../../ButtonWithConfirmDeleteModal'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { useNavigate, useSearchParams } from 'react-router-dom'

const TableActions = ({
  itemId,
  viewAction,
  editAction,
  deleteAction,
  additionalAction,
  comboValue,
  canView,
  canEdit,
  canDelete,
  isUserModal
}) => {
  const navigate = useNavigate()

  const [searchParams, _] = useSearchParams()

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
          comboValue={comboValue}
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
    </div>
  )
}

export default TableActions
