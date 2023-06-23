import { useState } from 'react'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { ModalWithForm } from 'components/core-ui/ModalWithForm'
import { UserModal } from '../UserModal'

const ButtonWithModalAndForm = ({
  buttonProps,
  modalProps,
  modalTitle,
  formItems,
  formInfoItems,
  formItemsPerRow,
  formButtons,
  formAction,
  editedItemId,
  editedItemUrl,
  additionalAction,
  comboValue,
  isUserModal = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Button {...buttonProps} onClick={openModal} style={{ minWidth: '0.7rem' }} />
      {isUserModal ? (
        <UserModal editedItemId={editedItemId} isModalOpen={isModalOpen} closeModal={closeModal} />
      ) : (
        <ModalWithForm
          modalProps={modalProps}
          modalTitle={modalTitle}
          formItems={formItems}
          formInfoItems={formInfoItems}
          formItemsPerRow={formItemsPerRow}
          formButtons={formButtons}
          formAction={formAction}
          editedItemId={editedItemId}
          editedItemUrl={editedItemUrl}
          additionalAction={additionalAction}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          comboValue={comboValue}
        />
      )}
    </>
  )
}

export default ButtonWithModalAndForm
