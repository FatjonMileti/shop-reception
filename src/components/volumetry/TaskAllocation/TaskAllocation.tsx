import { useEffect, useState } from 'react'
import s from './TaskAllocation.modules.scss'
import { ValueLabelInterface } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toListTableRows } from './serializers'
import { CircularProgress, Grid, debounce } from '@mui/material'
import { FilterDataSelect, ListTable } from '@fullscreendigital/carrefour-dex-fe'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import TaskDescription from './TaskDescription'
import { EditActionIcon } from 'icons'
import { EditCurrentTaskTemplate } from './EditCurrentTaskTemplate'
import { getDepartmentsOptions } from '../api'
import { handleQueryError } from '../utils'

const TaskAllocation = () => {
  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)
  const [rows, setRows] = useState([]) // TODO: To add interface when db schema is defined
  const [tableItems, setTableItems] = useState([]) // TODO: To add interface when db schema is defined
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState(0) // TODO: To add interface when db schema is defined
  const [shouldRefreshTaskData, setShouldRefreshTaskData] = useState<boolean>(false)
  const [shouldRefreshAllocationsData, setShouldRefreshAllocationsData] = useState<boolean>(false)
  const [tableState, setTableState] = useState(
    window.history.state.tableState || {
      page: 0,
      rowsPerPage: 10,
      tableFilters: []
    }
  )
  const [selectedRowId, setSelectedRowId] = useState('')

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      if (shouldRefreshTaskData) {
        const { page, rowsPerPage, tableFilters } = tableState
        await fetchData(page, rowsPerPage, tableFilters)
        setShouldRefreshTaskData(false)
      }
    })()
  }, [shouldRefreshTaskData])

  useEffect(() => {
    ;(async () => {
      // TODO check when BE is done that the data is refreshed when changing allocations
      if (shouldRefreshAllocationsData) {
        const details = await handleRemoteDetails(selectedRowId)
        const newRows = rows.map(row => (row.id === selectedRowId ? { ...row, details } : row))
        setRows(newRows)
        setShouldRefreshAllocationsData(false)
      }
    })()
  }, [shouldRefreshAllocationsData])

  const { data: departmentsOptions, isLoading: isDepartmentsOptionsLoading } =
    getDepartmentsOptions()

  const handleDepartmentOptionChange = value => {
    setDepartmentFilterValue(value)
    setShouldRefreshTaskData(true)
  }

  const handleRemoteDetails = async (rowId: string) => {
    setSelectedRowId(rowId)
    const response = await makeCoreGetRequest(`/volumetry/task-allocation/details/${rowId}`)
    const data = await response
    const item = tableItems.find(tableItem => tableItem.id === rowId)

    return (
      <TaskDescription
        item={item}
        employees={data.list}
        shouldRefreshData={shouldRefreshAllocationsData}
        setShouldRefreshData={setShouldRefreshAllocationsData}
        setShouldRefreshTaskData={setShouldRefreshTaskData}
      />
    )
  }

  const fetchData = async (page, rowsPerPage, tableFilters) => {
    setIsLoading(true)
    setTableState({ page, rowsPerPage, tableFilters })
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/task-allocation',
          filters: [{ name: 'department', value: departmentFilterValue.value }],
          tableFilters,
          page,
          rowsPerPage
        })
      )

      setRows(
        toListTableRows(
          response.list,
          shouldRefreshAllocationsData,
          setShouldRefreshAllocationsData
        )
      )
      setTableItems(response.list)
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      error => handleQueryError(error, 'A aparut o eroare la obtinerea datelor pentru tabel.')
    }
  }

  const openEditTaskModal = (): void => setIsEditTaskModalOpen(true)
  const closeEditTaskModal = (): void => setIsEditTaskModalOpen(false)

  const selectRow = row => {
    setSelectedRow(row)
    openEditTaskModal()
  }

  return (
    <div className={s.mainContainer}>
      <Grid container spacing={4}>
        {isDepartmentsOptionsLoading ? (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        ) : (
          <Grid xs={4} md={3} item style={{ padding: 0 }}>
            <FilterDataSelect
              name="teamMember.domain"
              defaultSelectedData={departmentFilterValue}
              label="Department"
              showCounter={true}
              showSearch={true}
              counterLabel="Select department"
              noDataFoundLabel="No results!"
              options={departmentsOptions}
              onSelect={handleDepartmentOptionChange}
            />
          </Grid>
        )}
      </Grid>
      {departmentFilterValue && (
        <>
          <ListTable
            rows={rows}
            handleRemoteData={debounce(fetchData, 500)}
            handleRemoteDetails={handleRemoteDetails}
            isLoading={isLoading}
            totalCount={totalCount}
            rowActions={[
              {
                label: 'Editeaza',
                labelColor: 'white',
                typographyVariant: 'medium',
                backgroundColor: '#0970E6',
                desktopIcon: <EditActionIcon />,
                onClick: (e, rowId) => selectRow(tableItems.find(item => item.id === rowId))
              }
            ]}
            rowActionsWidth="90px"
          />
          <EditCurrentTaskTemplate
            isModalOpen={isEditTaskModalOpen}
            closeModal={closeEditTaskModal}
            editItem={selectedRow}
            setShouldRefreshData={setShouldRefreshTaskData}
          />
        </>
      )}
    </div>
  )
}

export default TaskAllocation
