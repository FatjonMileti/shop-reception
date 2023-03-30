import { useState, useEffect } from 'react'
import { renderComponent } from 'utils/dynamicRenderingService'
import { makeDesignerGetRequest } from 'utils/api'

// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/teamTimeOffSchema'
// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/effortMatrixSchema'
// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/teamAssignmentSchema'
import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/capacityOverviewSchema'
// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/personCapacitySchema'

const DynamicComponent = props => {
  const [JSONSchema, setJSONSchema] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const result = await makeDesignerGetRequest(
          `/ui-schema?activityId=${props.activityId}&screenId=${props.screenId}`
        )
        // setJSONSchema(JSON.parse(result.jsonSchema.replace(/'+/g, '')))
        setJSONSchema(result.jsonSchema)
      } catch (error) {
        console.log(error)
        setJSONSchema(JSONSchemaMock)
      }
    })()
  }, [])

  return <div>{JSONSchema ? renderComponent(JSONSchema) : ''}</div>
}

export default DynamicComponent
