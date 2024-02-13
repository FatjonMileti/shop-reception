import {
  Button,
  FilterDataSelect,
  ListTable,
  Typography
} from '@fullscreendigital/carrefour-dex-fe'
import { Box, CircularProgress, Grid, debounce } from '@mui/material'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { EditActionIcon } from 'icons'
import { useEffect, useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { getDepartmentsOptions } from '../api'
import { ValueLabelInterface } from '../interfaces'
import { handleQueryError } from 'utils/helpers'
import { EditCurrentTaskTemplate } from './EditCurrentTaskTemplate'
import s from './TaskAllocations.modules.scss'
import TaskDescription from './TaskDescription'
import { toListTableRows } from './serializers'
import { useNotification } from 'hooks'
import cn from 'classnames'
import { AttendanceModal } from './AttendanceModal'

const TaskAllocations = () => {
  const { showNotification } = useNotification()
  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)
  const [rows, setRows] = useState([]) // TODO: To add interface when db schema is defined
  const [tableItems, setTableItems] = useState([]) // TODO: To add interface when db schema is defined
  const [totalCount, setTotalCount] = useState<number>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState(0) // TODO: To add interface when db schema is defined
  const [shouldRefreshTaskData, setShouldRefreshTaskData] = useState<boolean>(false)
  const [shouldRefreshAllocationsData, setShouldRefreshAllocationsData] = useState<boolean>(false)
  const [tableState, setTableState] = useState(
    window.history.state.tableState || {
      page: 0,
      rowsPerPage: 5,
      tableFilters: []
    }
  )
  const [selectedRowId, setSelectedRowId] = useState('')
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false)
  const [allExpanded, setAllExpanded] = useState(false)

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
      if (shouldRefreshAllocationsData) {
        const { page, rowsPerPage, tableFilters } = tableState
        const response = await makeCoreGetRequest(
          toTableGETUrl({
            url: '/volumetry/tasks/aggregation/summary',
            filters: [{ name: 'genericDepartmentId', value: departmentFilterValue.value }],
            tableFilters,
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

  const { data: departmentsOptions, isLoading: isDepartmentsOptionsLoading } =
    getDepartmentsOptions(showNotification, setDepartmentFilterValue)

  const handleDepartmentOptionChange = value => {
    setDepartmentFilterValue(value)
    setShouldRefreshTaskData(true)
  }

  const handleRemoteDetails = async (rowId: string) => {
    setSelectedRowId(rowId)
    const response = await makeCoreGetRequest(
      `/volumetry/tasks?filterBy=taskTemplateId&filterValue=${rowId}`
    )
    const item = tableItems.find(tableItem => tableItem.taskTemplateId === rowId)

    return (
      <TaskDescription
        item={item}
        employees={response}
        shouldRefreshData={shouldRefreshAllocationsData}
        setShouldRefreshData={setShouldRefreshAllocationsData}
        setSelectedRowId={setSelectedRowId}
      />
    )
  }

  const fetchData = async (page, rowsPerPage, tableFilters) => {
    setIsLoading(true)
    setTableState({ page, rowsPerPage, tableFilters })

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/tasks/aggregation/summary',
          filters: [{ name: 'genericDepartmentId', value: departmentFilterValue.value }],
          tableFilters,
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

  const openEditTaskModal = (): void => setIsEditTaskModalOpen(true)
  const closeEditTaskModal = (): void => setIsEditTaskModalOpen(false)

  const openAttendanceModal = (): void => setIsAttendanceModalOpen(true)
  const closeAteendanceModal = (): void => setIsAttendanceModalOpen(false)

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
          <>
            <Grid xs={12} md={6} item style={{ padding: 0 }}>
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
            <Grid
              xs={12}
              md={6}
              item
              style={{ padding: 0, paddingRight: '40px', textAlign: 'right' }}
            >
              <Button
                variant="contained"
                label="Incepe alocarea automata"
                onClick={openAttendanceModal}
              />
            </Grid>
          </>
        )}
      </Grid>
      {departmentFilterValue && (
        <>
          {totalCount === 0 && (
            <Grid item sx={{ padding: '1rem 1.5rem' }}>
              <Typography variant="regular">Nu exista date disponibile.</Typography>
            </Grid>
          )}
          <Box className={cn({ [s.hidden]: totalCount === 0 })}>
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
                  onClick: (e, rowId) =>
                    selectRow(tableItems.find(item => item.taskTemplateId === rowId))
                }
              ]}
              rowActionsWidth="90px"
              selectedRowId={selectedRowId}
              shouldRefreshedSelectedRowDetails={shouldRefreshAllocationsData}
              hasExpandCollapseAll
              allExpanded={allExpanded}
            />
          </Box>
          <EditCurrentTaskTemplate
            isModalOpen={isEditTaskModalOpen}
            closeModal={closeEditTaskModal}
            editItem={selectedRow}
            setShouldRefreshData={setShouldRefreshTaskData}
          />
          <AttendanceModal
            isModalOpen={isAttendanceModalOpen}
            closeModal={closeAteendanceModal}
            departmentId={departmentFilterValue.value}
            setAllExpanded={setAllExpanded}
          />
        </>
      )}
    </div>
  )
}

export default TaskAllocations
