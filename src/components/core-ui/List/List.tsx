import * as React from 'react'
import { Box } from '@mui/material'
import { ListTable } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { toTableRowItems } from 'utils/serializers'
import { useNotification } from 'hooks'
import { getRenderedColumns } from './helpers'
import s from './List.modules.scss'

const List = props => {
  const { action, columns, tableRowActions, ...rest } = props

  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [totalCount, setTotalCount] = React.useState(0)

  const { showNotification } = useNotification()

  const renderedColumns = React.useMemo(() => getRenderedColumns(columns), [columns])

  const handleRemoteData = async () => {
    const url = action.url

    setIsLoading(true)
    try {
      let response
      if (action.type === 'GET') {
        response = await makeCoreGetRequest(url)
      }
      setItems(toTableRowItems(response.list, columns))
      setTotalCount(response.page.totalCount)
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
          // tableRowActions
          //   ? renderedColumns.concat({
          //       title: '',
          //       field: 'actions',
          //       align: 'right',
          //       width: '112px',
          //       collapsible: 'true',
          //       render: row => (
          //         <ListActions
          //           itemId={row.id}
          //           viewAction={tableRowActions.viewAction}
          //           editAction={tableRowActions.editAction}
          //           deleteAction={tableRowActions.deleteAction}
          //           additionalAction={() => handleRemoteData()}
          //         />
          //       )
          //     })
          //   : renderedColumns
          renderedColumns
        }
        rows={items}
        handleRemoteData={handleRemoteData}
        isLoading={isLoading}
      />
    </Box>
  )
}

export default List
