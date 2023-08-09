import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { renderComponent } from 'utils/dynamicRenderingService'
import { makeDesignerGetRequest } from 'utils/api'
import { useDataStore, useNotification } from 'hooks'
import s from './DynamicComponent.scss'
import sd from '../ServiceDomain/ServiceDomain.scss'

import { Box, CircularProgress } from '@mui/material'
import { IconButton, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { ArrowBackIosNewOutlined } from '@mui/icons-material'
import { formatErrorMessage } from 'utils/formatting'

const DynamicComponent = props => {
  const [isLoadingSchema, setIsLoadingSchema] = useState(true)

  const [JSONSchema, setJSONSchema] = useState(null)
  const [screen, setScreen] = useState(null)

  const { restore } = useDataStore()

  const { showNotification } = useNotification()

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    setIsLoadingSchema(true)
    ;(async () => {
      try {
        const result = await makeDesignerGetRequest(
          `/ui-schema?activityId=${props.activityId}&screenId=${props.screenId}`
        )
        setJSONSchema(result.jsonSchema)
        setScreen(result.screen)
      } catch (error) {
        showNotification({
          message: `Error while fetching page schema. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      } finally {
        setIsLoadingSchema(false)
      }
    })()
  }, [props.activityId, props.screenId])

  return (
    (isLoadingSchema && (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )) || (
      <div>
        <Box className={s.moduleHeader}>
          <div className={sd.backHolder}>
            <IconButton className={sd.back} onClick={goBack}>
              <ArrowBackIosNewOutlined />
            </IconButton>

            <Typography variant="medium">
              <span className={sd.backTitle}>{screen?.name || props.name || ''}</span>
            </Typography>
          </div>
        </Box>

        {JSONSchema ? renderComponent(restore(JSONSchema)) : ''}
      </div>
    )
  )
}

export default DynamicComponent
