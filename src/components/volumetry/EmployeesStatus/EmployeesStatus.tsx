import { useState } from 'react'
import { CircularProgress, Grid } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './EmployeesStatus.modules.scss'
import { handleQueryError } from '../utils'
import { getDepartmentsOptions } from '../api'
import { useNotification } from 'hooks'
import { toTableRowItems } from './serializers'
import { columns } from './helpers'
import { ValueLabelInterface } from '../interfaces'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'

const EmployeesStatus = () => {
  const { showNotification } = useNotification()
  const [totalCount, setTotalCount] = useState<number>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableState, setTableState] = useState(
    window.history.state.tableState || {
      page: 0,
      rowsPerPage: 5
    }
  )
  const [tableItems, setTableItems] = useState([])

  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)

  const { data: departmentsOptions, isLoading: isDepartmentsOptionsLoading } =
    getDepartmentsOptions(showNotification, setDepartmentFilterValue)

  const handleDepartmentOptionChange = value => {
    setDepartmentFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async (page, rowsPerPage) => {
    setIsLoading(true)
    setTableState({ page, rowsPerPage })

    try {
      const response = {
        list: [
          {
            fullName: 'Razvan Ionescu',
            currentStatus: 'Fara task',
            todoTasks: true,
            inProgressTasks: 0,
            doneTasks: 1
          },
          {
            fullName: 'Ana Miu',
            currentStatus: 'Task in desfasurare',
            todoTasks: true,
            inProgressTasks: 2,
            doneTasks: 2
          },
          {
            fullName: 'Adrian Ion Vasilescu',
            currentStatus: 'Task neinceput',
            todoTasks: false,
            inProgressTasks: 0,
            doneTasks: 0
          }
        ],
        page: {
          totalCount: 1
        }
      }

      setTableItems(toTableRowItems(response.list))
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
      <Grid container spacing={4}>
        {isDepartmentsOptionsLoading ? (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        ) : (
          <Grid xs={4} md={3} mb={2} item style={{ padding: 0 }}>
            <FilterDataSelect
              name="department"
              defaultSelectedData={departmentFilterValue}
              label=""
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
        <Table
          hideCheckbox
          orderBy="name"
          order="desc"
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActionsWidth="130px"
        />
      )}
    </div>
  )
}

export default EmployeesStatus
