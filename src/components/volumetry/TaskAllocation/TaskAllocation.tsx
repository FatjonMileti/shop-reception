import { useState } from 'react'
import s from './TaskAllocation.modules.scss'
import { ValueLabelInterface } from '../interfaces'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toDepartmentOptions, toListTableRows } from './serializers'
import { CircularProgress, Grid, debounce } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { FilterDataSelect, ListTable } from '@fullscreendigital/carrefour-dex-fe'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import TaskDescription from './TaskDescription'

const TaskAllocation = () => {
  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)
  const [rows, setRows] = useState([]) // TODO: To add interface when db schema is defined
  const [tableItems, setTableItems] = useState([]) // TODO: To add interface when db schema is defined
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const { data: departments, isLoading: isDepartmentsLoading } = useQuery(
    ['departments'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/department')
      const departmentOptions = toDepartmentOptions(result.list)

      setDepartmentFilterValue(departmentOptions[0])

      return departmentOptions
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la preluarea datelor de optiuni pentru departamente. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const handleDepartmentFilterChange = value => {
    setDepartmentFilterValue(value)
  }

  const handleRemoteDetails = async (rowId: string) => {
    const response = await makeCoreGetRequest(`/volumetry/taskAllocation/details/${rowId}`)
    const data = await response
    const item = tableItems.find(tableItem => tableItem.id === rowId)

    return <TaskDescription item={item} employees={data.list} />
  }

  const fetchData = async (page, rowsPerPage, tableFilters) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/taskAllocation',
          filters: [{ name: 'department', value: departmentFilterValue.value }],
          tableFilters,
          page,
          rowsPerPage
        })
      )

      setRows(toListTableRows(response.list))
      setTableItems(response.list)
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching list data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <div className={s.mainContainer}>
      <Grid container spacing={4}>
        {isDepartmentsLoading ? (
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
              options={departments}
              onSelect={handleDepartmentFilterChange}
            />
          </Grid>
        )}
      </Grid>
      {departmentFilterValue && (
        <ListTable
          rows={rows}
          handleRemoteData={debounce(fetchData, 500)}
          handleRemoteDetails={handleRemoteDetails}
          isLoading={isLoading}
          totalCount={totalCount}
        />
      )}
    </div>
  )
}

export default TaskAllocation
