import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { renderComponent } from 'utils/dynamicRenderingService'
import { makeDesignerGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import s from './DynamicComponent.scss'
import sd from '../ServiceDomain/ServiceDomain.scss'

import { Box } from '@mui/material'
import { IconButton, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { ArrowBackIosNewOutlined } from '@mui/icons-material'

const DynamicComponent = props => {
  const [JSONSchema, setJSONSchema] = useState(null)
  const [screen, setScreen] = useState(null)

  const { showNotification } = useNotification()

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const result = await makeDesignerGetRequest(
          `/ui-schema?activityId=${props.activityId}&screenId=${props.screenId}`
        )
        setJSONSchema(result.jsonSchema)
        setScreen(result.screen)
      } catch (error) {
        showNotification({
          message: `Error while fetching page schema. ${error.message}`,
          type: 'error'
        })
      }
    })()
  }, [props.activityId, props.screenId])

  return (
    <div>
      <Box className={s.moduleHeader}>
        <div className={sd.backHolder}>
          <IconButton className={sd.back} onClick={goBack}>
            <ArrowBackIosNewOutlined />
          </IconButton>

          <Typography variant="medium">
            <span className={sd.backTitle}>
              {screen?.name || props.name || ''}
            </span>
          </Typography>
        </div>
      </Box>

      {JSONSchema ? renderComponent(JSONSchema) : ''}
    </div>
  )
}

export default DynamicComponent
