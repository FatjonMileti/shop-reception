import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { renderComponent } from 'utils/dynamicRenderingService'
import { makeDesignerGetRequest } from 'utils/api'
import s from './DynamicComponent.scss'

import { Box } from '@mui/material'
import { IconButton, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { ArrowBackIosNewOutlined } from '@mui/icons-material'
import { Icon } from 'components/core-ui/Icon'


const DynamicComponent = props => {
  const [JSONSchema, setJSONSchema] = useState(null)
  const [screen, setScreen] = useState(null)
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
        // setJSONSchema(JSON.parse(result.jsonSchema.replace(/'+/g, '')))
        // setJSONSchema(JSON.parse(result.jsonSchema))
        setJSONSchema(result.jsonSchema)
        setScreen(result.screen)
      } catch (error) {
        console.log(error) // should show main screen ?
      }
    })()
  }, [props.activityId, props.screenId])

  return (
    <div>
      <Box className={s.moduleHeader}>
        <IconButton className={s.back} onClick={goBack}>
          <ArrowBackIosNewOutlined />
        </IconButton>

        <Typography variant="medium">
          <span className={s.moduleSummary}>
            <Icon iconName={screen?.icon || props.icon || 'EmojiNature'} />
            {screen?.name || props.name || ''}
          </span>
        </Typography>
      </Box>

      {JSONSchema ? renderComponent(JSONSchema) : ''}
    </div>
  )
}

export default DynamicComponent
