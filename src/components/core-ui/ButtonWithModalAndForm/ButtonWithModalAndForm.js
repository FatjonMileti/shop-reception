import { useState } from 'react'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { ModalWithForm } from 'components/core-ui/ModalWithForm'

const ButtonWithModalAndForm = ({
  buttonProps,
  modalProps,
  modalTitle,
  formItems,
  formItemsPerRow,
  formButtons,
  formAction,
  editedItemId,
  editedItemUrl,
  additionalAction
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Button {...buttonProps} onClick={openModal} style={{ minWidth: '0.7rem' }} />
      <ModalWithForm
        modalProps={modalProps}
        modalTitle={modalTitle}
        formItems={formItems}
        formItemsPerRow={formItemsPerRow}
        formButtons={formButtons}
        formAction={formAction}
        editedItemId={editedItemId}
        editedItemUrl={editedItemUrl}
        additionalAction={additionalAction}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  )
}

export default ButtonWithModalAndForm
