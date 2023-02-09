import { useEffect, useMemo } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Close } from '@mui/icons-material'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { ModalForm } from './ModalForm'
import { useImmer } from 'use-immer'
import { makeGetRequest, makePostRequest, makePutRequest, makePatchRequest } from 'utils/api'
import { getModalWidth, getGridSize } from './helpers'
import { toEditItemPayload } from './serializers'

const sx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
  maxHeight: '80%',
  overflowY: 'auto'
}

const ModalWithForm = ({
  modalProps,
  modalTitle,
  formItems,
  formItemsPerRow,
  formButtons,
  formAction,
  editedItemId,
  editedItemUrl,
  additionalAction,
  isModalOpen,
  closeModal
}) => {
  const [editItem, setEditItem] = useImmer({})

  useEffect(() => {
    if (editedItemId) {
      ;(async () => {
        try {
          const result = await makeGetRequest(`${editedItemUrl}/${editedItemId}`)
          setEditItem(result)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [editedItemId])

  const modalWidth = useMemo(() => getModalWidth(formItemsPerRow), [formItemsPerRow])

  const gridSize = useMemo(() => getGridSize(formItemsPerRow), [formItemsPerRow])

  const handleInputChange = (value, name) => {
    setEditItem(draft => {
      draft[name] = value
      if (draft[`${name}Value`]) {
        draft[`${name}Value`] = value
      }
    })
  }

  const saveData = async () => {
    // TODO: save the new data; this is a POST to api
    try {
      const payload = toEditItemPayload(editItem)
      if (formAction.type === 'POST') {
        await makePostRequest(`${formAction.url}`, payload)
      }
      if (formAction.type === 'PUT') {
        await makePutRequest(`${formAction.url}/${editItem.id}`, payload)
      }
      if (formAction.type === 'PATCH') {
        await makePatchRequest(`${formAction.url}/${editItem.id}`, payload)
      }
    } catch (error) {
      console.log(error)
    }
    additionalAction && additionalAction()
    setEditItem({})
    closeModal()
  }

  return (
    <Modal
      {...modalProps}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isModalOpen}
      onClose={closeModal}
    >
      <Box
        sx={{
          ...sx,
          width: modalWidth,
          ...(modalProps ? modalProps.sx : {})
        }}
      >
        <IconButton style={{ position: 'absolute', top: '1rem', right: '1.5rem' }} withBackground>
          <Close onClick={closeModal} />
        </IconButton>
        <ModalForm
          modalTitle={modalTitle}
          formItems={formItems}
          gridSize={gridSize}
          handleInputChange={handleInputChange}
          editItem={editItem}
          formButtons={formButtons}
          saveData={saveData}
          closeModal={closeModal}
        />
      </Box>
    </Modal>
  )
}

export default ModalWithForm
