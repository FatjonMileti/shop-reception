import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { toFormDataPayload, toItemPayload } from 'utils/serializers'
import { getModalWidth, getGridSize } from './helpers'
import { set } from 'lodash'
import { useMediaQuery, CircularProgress } from '@mui/material'
import { useNotification } from 'hooks'

const sx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#fff',
  p: 4,
  maxHeight: '80%',
  overflowY: 'auto',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px'
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
  closeModal,
  comboValue,
  href
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [editItem, setEditItem] = useImmer({})

  const { showNotification } = useNotification()

  const navigate = useNavigate()

  useEffect(() => {
    if (isModalOpen && editedItemId) {
      ;(async () => {
        try {
          const result = await makeCoreGetRequest(`${editedItemUrl}/${editedItemId}`)
          setEditItem(result)
        } catch (error) {
          showNotification({
            message: `Error while fetching item. ${error?.message}`,
            type: 'error'
          })
        } finally {
          setTimeout(() => setIsLoading(false), 500)
        }
      })()
    } else {
      setEditItem(getItemDefaults(formItems))
      if (isModalOpen) {
        setTimeout(() => setIsLoading(false), 500)
      }
    }
  }, [isModalOpen, editedItemId, formItems, editedItemUrl, setEditItem])

  useEffect(() => {
    const hiddenItems = formItems.filter(item => item.type === 'hidden')

    if (hiddenItems.length) {
      hiddenItems.map(item => {
        const { name, type, value } = item
        setEditItem(draft => {
          set(draft, name, type === 'date' ? formatPayloadDate(value) : value)
        })
      })
    }
  }, [formItems])

  const modalWidth = useMemo(() => getModalWidth(formItemsPerRow), [formItemsPerRow])

  const gridSize = useMemo(() => getGridSize(formItemsPerRow), [formItemsPerRow])

  const handleInputChange = (value, name, type) => {
    setEditItem(draft => {
      set(draft, name, type === 'date' ? formatPayloadDate(value) : value)
    })
  }

  const saveData = async data => {
    setIsLoading(true)

    try {
      let result
      if (formAction.type === 'POST') {
        result = await makeCorePostRequest(`${formAction.url}`, data)
        showNotification({
          message: 'Item created successfully',
          type: 'success'
        })
      }
      if (formAction.type === 'PUT') {
        result = await makeCorePutRequest(`${formAction.url}`, data)
        showNotification({
          message: 'Item saved successfully',
          type: 'success'
        })
      }
      if (formAction.type === 'PATCH') {
        result = await makeCorePatchRequest(`${formAction.url}`, data)
        showNotification({
          message: 'Item saved successfully',
          type: 'success'
        })
      }

      if (href && result.id) {
        navigate(`${href}/${result.id}`)
      }
    } catch (error) {
      showNotification({
        message: `Error while saving item. ${error?.message}`,
        type: 'error'
      })
    }
    additionalAction && additionalAction()
    closeModalAndResetForm()
    setIsLoading(false)
  }

  const saveFormData = async () => {
    const formData = toFormDataPayload(editItem)
    await saveData(formData)
  }

  const saveJSONData = async () => {
    const payload = toItemPayload(editItem)
    await saveData(payload)
  }

  const closeModalAndResetForm = () => {
    closeModal()
    setEditItem({})
    setIsLoading(true)
  }

  const isXs = useMediaQuery('(max-width:624px)')
  const isMd = useMediaQuery('(max-width:936px)')

  const saveFn = formItems.some(item => item.type === 'file') ? saveFormData : saveJSONData

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
          width: isXs ? 'calc(100% - 24px)' : isMd ? '80%' : modalWidth,
          ...(modalProps ? modalProps.sx : {})
        }}
      >
        <IconButton
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          withBackground
          onClick={closeModalAndResetForm}
        >
          <Close />
        </IconButton>
        {(isLoading && (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        )) || (
          <div>
            <ModalForm
              modalTitle={modalTitle}
              formItems={formItems}
              formInfoItems={formInfoItems}
              gridSize={gridSize}
              handleInputChange={handleInputChange}
              editItem={editItem}
              formButtons={formButtons}
              saveData={saveFn}
              closeModal={closeModalAndResetForm}
              comboValue={comboValue}
            />
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default ModalWithForm
