import { useEffect, useState } from 'react'
import { Typography, ListTable } from '@fullscreendigital/carrefour-dex-fe'
import s from './AssignedTasks.modules.scss'
import { Box, debounce } from '@mui/material'
import cn from 'classnames'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { handleQueryError } from '../utils'
import { useNotification } from 'hooks'
import TaskDescription from '../TaskAllocation/TaskDescription'

const AssignedTasks = () => {
  const hideDetails = true
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
            url: '/volumetry/tasks/aggregation/summary',
            page,
            rowsPerPage
          })
        )
        setRows(
          toListTableRows(
            response.list,
            shouldRefreshAllocationsData,
            setShouldRefreshAllocationsData,
            setSelectedRowId,
            hideDetails
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
      // const response = await makeCoreGetRequest(
      //   toTableGETUrl({
      //     url: '/volumetry/tasks/aggregation/summary',
      //     page,
      //     rowsPerPage
      //   })
      // )

      const response = {
        list: [
          {
            taskContributionId: 557,
            taskTemplateId: 12,
            rayonsOrDepartment: 'BLS',
            taskName: 'Realimentare magazin BLS (stoc cascheta)',
            recommendedInterval: '06:00 - 09:00',
            priorityId: 1,
            priorityValue: '1 - Ridicat',
            workload: '2 paleti',
            timerStatus: 'IN_PROGRESS',
            progressPercentage: 60,
            comment: 'Aparatul a fost reparat.',
            createdAt: '2022-01-15',
            frequency: 'zilnic'
          },
          {
            taskContributionId: 558,
            taskTemplateId: 12,
            rayonsOrDepartment: 'BLS',
            taskName: 'Realimentare magazin BLS (stoc cascheta)',
            recommendedInterval: '06:00 - 09:00',
            priorityId: 1,
            priorityValue: '1 - Ridicat',
            workload: '3 paleti',
            timerStatus: 'FINISHED',
            progressPercentage: 60,
            comment: 'Aparatul a fost reparat.',
            createdAt: '2022-01-15',
            frequency: 'zilnic'
          },
          {
            taskContributionId: 559,
            taskTemplateId: 13,
            rayonsOrDepartment: 'BLS',
            taskName: 'Realimentare magazin BLS (stoc cascheta)123456',
            recommendedInterval: '06:00 - 09:00',
            priorityId: 1,
            priorityValue: '1 - Ridicat',
            workload: '2 paleti',
            timerStatus: 'IN_PROGRESS',
            progressPercentage: 60,
            comment: 'Aparatul a fost reparat.',
            createdAt: '2022-01-15',
            frequency: 'zilnic'
          },
          {
            taskContributionId: 560,
            taskTemplateId: 14,
            rayonsOrDepartment: 'BLS',
            taskName: 'Realimentare magazin BLS (stoc cascheta)00000123456',
            recommendedInterval: '06:00 - 09:00',
            priorityId: 1,
            priorityValue: '1 - Ridicat',
            workload: '2 paleti',
            timerStatus: 'NOT_STARTED',
            progressPercentage: 60,
            comment: 'Aparatul a fost reparat.',
            createdAt: '2022-01-15',
            frequency: 'zilnic'
          }
        ],
        page: {
          totalCount: 3
        }
      }

      setRows(
        toListTableRows(
          response.list,
          shouldRefreshAllocationsData,
          setShouldRefreshAllocationsData,
          setSelectedRowId,
          hideDetails
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

  // const handleRemoteDetails = async (rowId: string) => {
  //   setSelectedRowId(rowId)
  //   const response = await makeCoreGetRequest(
  //     `/volumetry/tasks?filterBy=taskTemplateId&filterValue=${rowId}`
  //   )
  //   const data = await response
  //   const item = tableItems.find(tableItem => tableItem.taskTemplateId === rowId)

  //   return (
  //     <TaskDescription
  //       item={item}
  //       employees={data}
  //       shouldRefreshData={shouldRefreshAllocationsData}
  //       setShouldRefreshData={setShouldRefreshAllocationsData}
  //       setSelectedRowId={setSelectedRowId}
  //     />
  //   )
  // }

  return (
    <div className={s.mainContainer}>
      {totalCount === 0 && <Typography variant="regular">Nu exista date disponibile.</Typography>}
      <Box className={cn({ [s.hidden]: totalCount === 0 })}>
        <ListTable
          rows={rows}
          handleRemoteData={debounce(fetchData, 500)}
          // handleRemoteDetails={handleRemoteDetails}
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
