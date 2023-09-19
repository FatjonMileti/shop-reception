import { Edit, Delete, Visibility, Cancel } from '@mui/icons-material'
import { ButtonWithModalAndForm } from '../../ButtonWithModalAndForm'
import { ButtonWithConfirmDeleteModal } from '../../ButtonWithConfirmDeleteModal'
import { ButtonWithConfirmCancelModal } from '../../ButtonWithConfirmCancelModal'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Icon } from 'components/core-ui/Icon'

const TableActions = ({
  itemId,
  row,
  viewAction,
  editAction,
  deleteAction,
  cancelAction,
  additionalAction,
  canView,
  canEdit,
  canDelete,
  canCancel,
  customAction,
  canSeeCustomAction,
  userModal,
  extraUrlParams = ''
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
          style={{ minWidth: '0.7rem', background: 'transparent' }}
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
          userModal={userModal}
          extraUrlParams={extraUrlParams}
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
      {customAction && canSeeCustomAction && (
        <Button
          onClick={() => {
            var url = customAction.url
            customAction.keys?.forEach(key => { url = url.replace(`:${key}`, row[key])})
            navigate(url)
          }}
          style={{ minWidth: '0.7rem', background: 'transparent' }}
        >
          <Icon iconName={customAction.icon} tiny fill="#0970E6" />
        </Button>
      )}
    </div>
  )
}

export default TableActions
