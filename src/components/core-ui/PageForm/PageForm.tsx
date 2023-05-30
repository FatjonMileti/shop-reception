import { useState } from 'react'
import { useImmer } from 'use-immer'
import { set } from 'lodash'
import { ModalForm } from '../ModalWithForm/ModalForm'
import { formatPayloadDate } from 'utils/helpers'
import { toItemPayload } from 'utils/serializers'
import { makeCorePostRequest, makeCorePutRequest, makeCorePatchRequest } from 'utils/api'
import { useNotification } from 'hooks'

const PageForm = props => {
  const { formItems, formInfoItems, gridSize, formButtons, formAction, ...rest } = props

  const [isLoading, setIsLoading] = useState(true)

  const [editItem, setEditItem] = useImmer({})

  const { showNotification } = useNotification()

  const handleInputChange = (value, name, type) => {
    setEditItem(draft => {
      set(draft, name, type === 'date' ? formatPayloadDate(value) : value)
    })
  }

  const saveData = async () => {
    setIsLoading(true)
    try {
      const payload = toItemPayload(editItem)
      if (formAction.type === 'POST') {
        await makeCorePostRequest(`${formAction.url}`, payload)
        showNotification({
          message: 'Item created successfully',
          type: 'success'
        })
      }
      if (formAction.type === 'PUT') {
        await makeCorePutRequest(`${formAction.url}`, payload)
        showNotification({
          message: 'Item saved successfully',
          type: 'success'
        })
      }
      if (formAction.type === 'PATCH') {
        await makeCorePatchRequest(`${formAction.url}`, payload)
        showNotification({
          message: 'Item saved successfully',
          type: 'success'
        })
      }
    } catch (error) {
      showNotification({
        message: `Error while saving item. ${error?.message}`,
        type: 'error'
      })
    }
    // additionalAction && additionalAction()
    // closeModalAndResetForm()
    setIsLoading(false)
  }

  const resetForm = () => {}

  return (
    <ModalForm
      modalTitle="Adauga client nou"
      formItems={formItems}
      formInfoItems={formInfoItems}
      gridSize={gridSize}
      handleInputChange={handleInputChange}
      editItem={editItem}
      formButtons={formButtons}
      saveData={saveData}
      closeModal={resetForm}
      comboValue={null}
    />
  )
}

export default PageForm
