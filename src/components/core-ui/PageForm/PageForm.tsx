import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmer } from 'use-immer'
import { set } from 'lodash'
import { ModalForm } from '../ModalWithForm/ModalForm'
import { toItemPayload } from 'utils/serializers'
import { makeCorePostRequest, makeCorePutRequest, makeCorePatchRequest } from 'utils/api'
import { useNotification } from 'hooks'
import cn from 'classnames'
import { Box } from '@mui/material'
import s from './PageForm.modules.scss'
import { getItemDefaults } from 'utils/helpers'

const PageForm = props => {
  const { formItems, formInfoItems, formButtons, formAction, formItemsPerRow, visible, href } =
    props

  const [isLoading, setIsLoading] = useState(true)

  const [editItem, setEditItem] = useImmer({})

  const navigate = useNavigate()

  const { showNotification } = useNotification()

  const gridSize = 12 / formItemsPerRow

  const setInitialItems = useCallback(async () => {
    setEditItem(getItemDefaults(formItems))

    const hiddenItems = formItems.filter(item => item.type === 'hidden')

    if (hiddenItems.length) {
      hiddenItems.map(item => {
        const { name, type, value } = item
        setEditItem(draft => {
          set(draft, name, value)
        })
      })
    }
  }, [formItems])

  useEffect(() => {
    setInitialItems()
  }, [setInitialItems])

  const handleInputChange = (value, name, type) => {
    setEditItem(draft => {
      set(draft, name, value)
    })
  }

  const saveData = async () => {
    setIsLoading(true)
    try {
      const payload = toItemPayload(editItem)
      let response
      if (formAction.type === 'POST') {
        response = await makeCorePostRequest(`${formAction.url}`, payload)
        showNotification({
          message: 'Item created successfully',
          type: 'success'
        })
      }
      if (formAction.type === 'PUT') {
        response = await makeCorePutRequest(`${formAction.url}`, payload)
        showNotification({
          message: 'Item saved successfully',
          type: 'success'
        })
      }
      if (formAction.type === 'PATCH') {
        response = await makeCorePatchRequest(`${formAction.url}`, payload)
        showNotification({
          message: 'Item saved successfully',
          type: 'success'
        })
      }

      setIsLoading(false)

      if (href) {
        navigate(`${href}/${response.id}`)
      }
    } catch (error) {
      showNotification({
        message: `Error while saving item. ${error?.message}`,
        type: 'error'
      })
    }
  }

  const resetForm = () => {
    setEditItem({})
    setInitialItems()
  }

  return (
    <Box className={cn({ [s.hidden]: !visible })}>
      <ModalForm
        modalTitle=""
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
    </Box>
  )
}

export default PageForm
