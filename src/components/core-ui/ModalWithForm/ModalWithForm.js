import { useEffect, useMemo } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Close } from '@mui/icons-material'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { ModalForm } from './ModalForm'
import { useImmer } from 'use-immer'
import {
  makeCoreGetRequest,
  makeCorePostRequest,
  makeCorePutRequest,
  makeCorePatchRequest
} from 'utils/api'
import { getItemDefaults, formatPayloadDate } from 'utils/helpers'
import { toItemPayload } from 'utils/serializers'
import { getModalWidth, getGridSize } from './helpers'
import { set } from 'lodash'

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
  formInfoItems,
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
    if (isModalOpen && editedItemId) {
      ;(async () => {
        try {
          const result = await makeCoreGetRequest(`${editedItemUrl}/${editedItemId}`)
          setEditItem(result)
        } catch (error) {
          console.log(error)
        }
      })()
    } else {
      setEditItem(getItemDefaults(formItems))
    }
  }, [isModalOpen, editedItemId, formItems, editedItemUrl, setEditItem])

  const modalWidth = useMemo(() => getModalWidth(formItemsPerRow), [formItemsPerRow])

  const gridSize = useMemo(() => getGridSize(formItemsPerRow), [formItemsPerRow])

  const handleInputChange = (value, name, type) => {
    setEditItem(draft => {
      set(draft, name, type === 'date' ? formatPayloadDate(value) : value)
    })
  }

  const saveData = async () => {
    // TODO: save the new data; this is a POST to api
    try {
      const payload = toItemPayload(editItem)
      if (formAction.type === 'POST') {
        await makeCorePostRequest(`${formAction.url}`, payload)
      }
      if (formAction.type === 'PUT') {
        await makeCorePutRequest(`${formAction.url}`, payload)
      }
      if (formAction.type === 'PATCH') {
        await makeCorePatchRequest(`${formAction.url}`, payload)
      }
    } catch (error) {
      console.log(error)
    }
    additionalAction && additionalAction()
    setEditItem({})
    closeModal()
  }

  const closeModalAndResetForm = () => {
    closeModal()
    setEditItem({})
  }

  return (
    <Modal
      {...modalProps}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isModalOpen}
      onClose={closeModalAndResetForm}
    >
      <Box
        sx={{
          ...sx,
          width: modalWidth,
          ...(modalProps ? modalProps.sx : {})
        }}
      >
        <IconButton style={{ position: 'absolute', top: '1rem', right: '1.5rem' }} withBackground onClick={closeModalAndResetForm}>
          <Close />
        </IconButton>
        <ModalForm
          modalTitle={modalTitle}
          formItems={formItems}
          formInfoItems={formInfoItems}
          gridSize={gridSize}
          handleInputChange={handleInputChange}
          editItem={editItem}
          formButtons={formButtons}
          saveData={saveData}
          closeModal={closeModalAndResetForm}
        />
      </Box>
    </Modal>
  )
}

export default ModalWithForm
