import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { useImmer } from 'use-immer'
import { set } from 'lodash'
import { ModalForm } from '../ModalWithForm/ModalForm'
import { toItemPayload } from 'utils/serializers'
import {
  makeCorePostRequest,
  makeCorePutRequest,
  makeCorePatchRequest,
  makeCoreGetRequest
} from 'utils/api'
import { useNotification } from 'hooks'
import cn from 'classnames'
import { Box } from '@mui/material'
import s from './PageForm.modules.scss'
import { getItemDefaults } from 'utils/helpers'
import { get } from 'lodash'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'

const PageForm = props => {
  const {
    formItems,
    formInfoItems,
    formButtons,
    formAction,
    formItemsPerRow,
    visible,
    href,
    title
  } = props

  const [isLoading, setIsLoading] = useState(true)

  const [editItem, setEditItem] = useImmer({})

  const navigate = useNavigate()

  const { id } = useParams()

  let [searchParams, _] = useSearchParams()

  const { showNotification } = useNotification()

  const gridSize = formItemsPerRow ? 12 / formItemsPerRow : 12

  const setInitialItems = useCallback(async () => {
    setEditItem(getItemDefaults(formItems))
  }, [formItems])

  // const setHiddenItems = () => {
  //   const hiddenItems = formItems.filter(item => item.type === 'hidden')
  //   console.log(editItem)

  //   if (hiddenItems.length) {
  //     hiddenItems.map(item => {
  //       const { name, value } = item
  //       setEditItem(draft => {
  //         set(draft, name, value)
  //       })
  //     })
  //   }
  // }

  useEffect(() => {
    if (formAction.getUrl) {
      ;(async () => {
        try {
          const result = await makeCoreGetRequest(`${formAction.getUrl}/${id}`)
          setEditItem({ ...getItemDefaults(formItems), ...result })
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
      setInitialItems()
    }
  }, [setInitialItems])

  const handleInputChange = (value, name, type) => {
    setEditItem(draft => {
      draft[name] = value
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
        let url = href
        if (response.id) {
          url = `${url}/${response.id}`
        }
        if (formAction.variable) {
          url = `${url}?${formAction.variable}=${searchParams.get(formAction.variable)}`
        }
        navigate(url)
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
    <Box className={cn({ [s.hidden]: !visible }, s.formContainer)}>
      {title && (
        <Typography component="h1" variant="medium">
          {get(editItem, title.name)}
        </Typography>
      )}
      <ModalForm
        modalTitle=""
        formItems={formItems.filter(item => item.type != 'hidden')}
        formInfoItems={formInfoItems}
        gridSize={gridSize}
        handleInputChange={handleInputChange}
        editItem={editItem}
        formButtons={formButtons}
        saveData={saveData}
        closeModal={resetForm}
        isPageForm
      />
    </Box>
  )
}

export default PageForm
