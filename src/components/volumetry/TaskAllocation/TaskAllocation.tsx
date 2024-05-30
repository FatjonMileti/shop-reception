import { useEffect, useMemo, useState } from 'react'
import { Typography, ListTable, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import s from './TaskAllocation.modules.scss'
import { Box, debounce } from '@mui/material'
import cn from 'classnames'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { handleQueryError } from 'utils/helpers'
import { useNotification } from 'hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Icon } from 'components/core-ui/Icon'
import { URLS } from '../constants'
import { EditActionIcon } from 'icons'
import { EditCurrentTaskTemplate } from '../TaskAllocations/EditCurrentTaskTemplate'

const TaskAllocation = () => {
  const [totalCount, setTotalCount] = useState<number>(null)
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableState, setTableState] = useState(
    window.history.state.tableState || {
      page: 0,
      rowsPerPage: 5
    }
  )
  const [tableItems, setTableItems] = useState([])
  const [shouldRefreshAllocationsData, setShouldRefreshAllocationsData] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState('')
  const [selectedRow, setSelectedRow] = useState(0)
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const taskTemplateId = useMemo(() => searchParams.get('taskTemplateId'), [searchParams])

  useEffect(() => {
    ;(async () => {
      if (shouldRefreshAllocationsData) {
        const { page, rowsPerPage } = tableState
        const response = await makeCoreGetRequest(
          toTableGETUrl({
            url: '/volumetry/tasks/aggregation/summary',
            filters: [{ name: 'taskTemplateId', value: taskTemplateId }],
            page,
            rowsPerPage
          })
        )
        const detailsResponse = await makeCoreGetRequest(
          `/volumetry/tasks?filterBy=taskTemplateId&filterValue=${taskTemplateId}`
        )
        setRows(
          toListTableRows(
            [response.list[0]],
            detailsResponse,
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
          url: '/volumetry/tasks/aggregation/summary',
          filters: [{ name: 'taskTemplateId', value: taskTemplateId }],
          page,
          rowsPerPage
        })
      )
      const detailsResponse = await makeCoreGetRequest(
        `/volumetry/tasks?filterBy=taskTemplateId&filterValue=${taskTemplateId}`
      )

      setRows(
        toListTableRows(
          [response.list[0]],
          detailsResponse,
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

  const navigateToAllocations = () => {
    navigate(`/${URLS.AUTH_TASK_ALLOCATIONS}`)
  }

  const openEditTaskModal = (): void => setIsEditTaskModalOpen(true)
  const closeEditTaskModal = (): void => setIsEditTaskModalOpen(false)

  const selectRow = row => {
    setSelectedRow(row)
    openEditTaskModal()
  }

  return (
    <div className={s.mainContainer}>
      {(!taskTemplateId || totalCount === 0) && (
        <Typography variant="regular">Nu exista date disponibile.</Typography>
      )}
      <Box className={cn({ [s.hidden]: totalCount === 0 || !taskTemplateId })}>
        <IconButton
          onClick={navigateToAllocations}
          label="Vezi toate alocarile"
          variant="contained"
          startIcon={<Icon iconName="AssignTasks" tiny={true} fill="white" />}
        />
        <ListTable
          rows={rows}
          handleRemoteData={debounce(fetchData, 500)}
          isLoading={isLoading}
          totalCount={totalCount}
          rowActions={[
            {
              label: 'Editeaza',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#0970E6',
              desktopIcon: <EditActionIcon />,
              onClick: (e, rowId) =>
                selectRow(tableItems.find(item => item.taskTemplateId === rowId))
            }
          ]}
          rowActionsWidth="90px"
          selectedRowId={selectedRowId}
          shouldRefreshedSelectedRowDetails={shouldRefreshAllocationsData}
        />
        <EditCurrentTaskTemplate
          isModalOpen={isEditTaskModalOpen}
          closeModal={closeEditTaskModal}
          editItem={selectedRow}
          setShouldRefreshData={setShouldRefreshAllocationsData}
        />
      </Box>
    </div>
  )
}

export default TaskAllocation
