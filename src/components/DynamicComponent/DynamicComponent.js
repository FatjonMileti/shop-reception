import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { renderComponent } from 'utils/dynamicRenderingService'
import { makeDesignerGetRequest } from 'utils/api'
import s from './DynamicComponent.scss'

// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/teamTimeOffSchema'
// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/effortMatrixSchema'
// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/teamAssignmentSchema'
import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/capacityOverviewSchema'
import { Box } from '@mui/material'
import { IconButton, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { ArrowBackOutlined } from '@mui/icons-material'
import { Icon } from 'components/core-ui/Icon'
// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/personCapacitySchema'

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
        setJSONSchema(JSON.parse(result.jsonSchema))
        setScreen(result.screen)
      } catch (error) {
        console.log(error)
        setJSONSchema(JSONSchemaMock)
        setScreen({ 'name': 'chuchu', 'icon': 'BarChart' })
      }
    })()
  }, [props.activityId, props.screenId])

  return (
    <div>
      <Box className={s.moduleHeader}>
        <IconButton className={s.logo} onClick={goBack}>
          <ArrowBackOutlined />
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
