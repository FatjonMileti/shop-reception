import { Edit, Delete, Description } from '@mui/icons-material'
import { ButtonWithModalAndForm } from '../../ButtonWithModalAndForm'
import { ButtonWithConfirmDeleteModal } from '../../ButtonWithConfirmDeleteModal'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { useNavigate } from 'react-router-dom'


const TableActions = ({
  itemId,
  viewAction,
  editAction,
  deleteAction,
  additionalAction,
  comboValue,
  canView,
  canEdit,
  canDelete
}) => {
  const navigate = useNavigate()

  return (
    <div style={{ minWidth: '5rem' }}>
      {viewAction && canView && (
        <Button onClick={() => navigate(viewAction.url, { state: { pdfUrl: viewAction.pdfUrl.replace(':id', itemId) }} )} style={{ minWidth: '0.7rem' }}>
          <Description />
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
