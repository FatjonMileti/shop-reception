import { useEffect, useState } from 'react'
import { Typography, ListTable, Button, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import s from './AssignedTasks.modules.scss'
import { Box, Grid, debounce } from '@mui/material'
import cn from 'classnames'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { useNotification } from 'hooks'
import { handleQueryError } from 'utils/helpers'
import { RefreshIcon } from 'icons'

const AssignedTasks = () => {
  const [totalCount, setTotalCount] = useState<number>(null)
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableState, setTableState] = useState(
    window.history.state.tableState || {
      page: 0,
      rowsPerPage: 5
    }
  )
  const [shouldRefreshAllocationsData, setShouldRefreshAllocationsData] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState('')
  const [tableItems, setTableItems] = useState([])

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      if (shouldRefreshAllocationsData) {
        const { page, rowsPerPage, tableFilters } = tableState
        const response = await makeCoreGetRequest(
          toTableGETUrl({
            url: '/volumetry/tasks/aggregation/worker',
            page,
            rowsPerPage
          })
        )
        setRows(
          toListTableRows(
            response.list,
            shouldRefreshAllocationsData,
            setShouldRefreshAllocationsData,
            setSelectedRowId
          )
        )
        setTableItems(response.list)
        setShouldRefreshAllocationsData(false)
      }
    })()
  }, [shouldRefreshAllocationsData])

  const fetchData = async (page, rowsPerPage) => {
    setIsLoading(true)
    setTableState({ page, rowsPerPage })

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/tasks/aggregation/worker',
          page,
          rowsPerPage
        })
      )

      setRows(
        toListTableRows(
          response.list,
          shouldRefreshAllocationsData,
          setShouldRefreshAllocationsData,
          setSelectedRowId
        )
      )
      setTableItems(response.list)
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      error =>
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea datelor pentru tabel.',
          showNotification
        )
    }
  }

  return (
    <div className={s.mainContainer}>
      {totalCount === 0 && <Typography variant="regular">Nu exista date disponibile.</Typography>}
      <Box className={cn({ [s.hidden]: totalCount === 0 })}>
        <Grid container spacing={4}>
          <Grid xs={12} md={6} item />
          <Grid xs={12} md={6} item className={s.refreshDataBtn}>
            <IconButton
              onClick={() => setShouldRefreshAllocationsData(true)}
              label="Reincarca datele"
              variant="outlined"
              startIcon={<RefreshIcon />}
            />
          </Grid>
        </Grid>
        <ListTable
          rows={rows}
          handleRemoteData={debounce(fetchData, 500)}
          isLoading={isLoading}
          totalCount={totalCount}
          rowActionsWidth="90px"
          selectedRowId={selectedRowId}
          shouldRefreshedSelectedRowDetails={shouldRefreshAllocationsData}
        />
      </Box>
    </div>
  )
}

export default AssignedTasks
