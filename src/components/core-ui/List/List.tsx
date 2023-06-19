import * as React from 'react'
import { Box } from '@mui/material'
import { ListTable } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { toTableRowItems } from 'utils/serializers'
import { useDataStore, useNotification } from 'hooks'
import { getRenderedColumns } from './helpers'
import s from './List.modules.scss'
import { ListActions } from './ListActions'
import { renderTableFooter } from '../Table/helpers'

const List = props => {
  const { action, columns, tableRowActions, tableFooter, ...rest } = props

  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [summary, setSummary] = React.useState({})

  const { showNotification } = useNotification()
  const { storeData } = useDataStore()

  const renderedColumns = React.useMemo(() => getRenderedColumns(columns), [columns])

  const tableFooterComponent = React.useMemo(
    () => tableFooter && renderTableFooter(tableFooter, summary),
    [tableFooter, summary]
  )

  const handleRemoteData = async () => {
    const url = action.url

    setIsLoading(true)
    try {
      let response
      if (action.type === 'GET') {
        response = await makeCoreGetRequest(url)
      }
      setItems(toTableRowItems(response.list, columns))
      setSummary(response.summary)
      if (action.storeIn) {
        storeData(action.storeIn, response) // [~] if we store the response first, then this 'response' variable becomes read-only and the following toTableRowItems throws an error
      }
    } catch (error) {
      showNotification({
        message: `Error while fetching list data. ${error.message}`,
        type: 'error'
      })
    }
    setIsLoading(false)
  }

  return (
    <Box className={s.listTableContainer}>
      <ListTable
        {...rest}
        columns={
          tableRowActions
            ? renderedColumns.concat({
                field: 'actions',
                width: '112px',
                collapsible: 'true',
                render: row => (
                  <ListActions
                    itemId={row.id}
                    deleteAction={tableRowActions.deleteAction}
                    additionalAction={() => handleRemoteData()}
                  />
                )
              })
            : renderedColumns
        }
        rows={items}
        handleRemoteData={handleRemoteData}
        isLoading={isLoading}
      />
      {tableFooter && <div style={{ textAlign: 'right' }}>{tableFooterComponent}</div>}
    </Box>
  )
}

export default List
