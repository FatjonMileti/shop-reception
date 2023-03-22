import { useState, useEffect } from 'react'
import { renderComponent } from 'utils/dynamicRenderingService'
import { makeDesignerGetRequest } from 'utils/api'

// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/teamTimeOffSchema'
// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/effortMatrixSchema'
import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/teamAssignmentSchema'
// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/capacityOverviewSchema'
// import { JSONSchema as JSONSchemaMock } from 'utils/mockedData/personCapacitySchema'

const DynamicComponent = props => {
  const [JSONSchema, setJSONSchema] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const result = await makeDesignerGetRequest(
          `/ui-schema?activityId=${props.id}&roleId=GOV_TL`
        )
        // setJSONSchema(JSON.parse(result.jsonSchema.replace(/'+/g, '')))
        setJSONSchema(JSONSchemaMock)
      } catch (error) {
        console.log(error)
        setJSONSchema(JSONSchemaMock)
      }
    })()
  }, [])

  return <div>{JSONSchema ? renderComponent(JSONSchema) : ''}</div>
}

export default DynamicComponent
