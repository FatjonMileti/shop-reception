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
import { ListTable } from '@fullscreendigital/carrefour-dex-fe'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'

const TaskAllocation = () => {
  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)
  const [rows, setRows] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { showNotification } = useNotification()

  const { data: departments, isLoading: isDepartmentsLoading } = useQuery(
    ['departments'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/department')
      return toDepartmentOptions(result.list)
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
          <Grid xs={12} md={2} item style={{ padding: 0 }}>
            <AsyncAutocomplete
              variant="outlined"
              name="teamMember.domain"
              label="Department"
              disableClearable
              value={departmentFilterValue}
              options={departments}
              onChange={handleDepartmentFilterChange}
              applyCustomStyle
            />
          </Grid>
        )}
      </Grid>
      {departmentFilterValue && (
        <ListTable
          rows={rows}
          handleRemoteData={debounce(fetchData, 500)}
          isLoading={isLoading}
          totalCount={totalCount}
        />
      )}
    </div>
  )
}

export default TaskAllocation
