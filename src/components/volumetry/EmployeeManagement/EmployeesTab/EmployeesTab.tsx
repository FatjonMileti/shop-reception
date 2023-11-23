import { Box, CircularProgress, Grid, Paper } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './EmployeesTab.modules.scss'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { Input } from 'components/core-ui/Input'
import { EmployeeManagementItem, ValueLabelInterface } from 'components/volumetry/interfaces'
import { columns } from './helpers'

const EmployeesTab = () => {
  const { showNotification } = useNotification()
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)
  const [nameFilterValue, setNameFilterValue] = useState<ValueLabelInterface>(null)
  const [positionFilterValue, setPositionFilterValue] = useState<ValueLabelInterface>(null)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<EmployeeManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const { data: filterOptions, isLoading: isFilterOptionsLoading } = useQuery(
    ['store'],
    async () => {
      const resultStore = await makeCoreGetRequest('/volumetry/store')
      const resultOptionsStore = resultStore.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )

      setStoreFilterValue(resultOptionsStore[0])
      return resultOptionsStore || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: filterOptionsDepartment } = useQuery(
    ['department'],
    async () => {
      const resultDepartment = await makeCoreGetRequest('/volumetry/department')

      const resultOptionsDepartment = resultDepartment.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )
      setDepartmentFilterValue(resultOptionsDepartment[0])
      return resultOptionsDepartment || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: filterOptionsName } = useQuery(
    ['employee'],
    async () => {
      const resultName = await makeCoreGetRequest('/volumetry/employee')

      const resultOptionsName = resultName.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )
      setNameFilterValue(resultOptionsName[0])
      return resultOptionsName || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: filterOptionsPosition } = useQuery(
    ['position'],
    async () => {
      const resultPosition = await makeCoreGetRequest('/volumetry/position')

      const resultOptionsPosition = resultPosition.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )
      setPositionFilterValue(resultOptionsPosition[0])
      return resultOptionsPosition || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const handleStoreFilterChange = (value: ValueLabelInterface): void => {
    setStoreFilterValue(value)
    setShouldRefreshData(true)
  }
  const handleNameFilterChange = (value: ValueLabelInterface): void => {
    setNameFilterValue(value)
    setShouldRefreshData(true)
  }
  const handleDepartmentFilterChange = (value: ValueLabelInterface): void => {
    setDepartmentFilterValue(value)
  }
  const handlePositionFilterChange = (value: ValueLabelInterface): void => {
    setPositionFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/employee',
          filters: [{ name: 'store.name', value: storeFilterValue.value }],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const tableFilterFields = [
    {
      filter: (
        <div style={{ width: '100%' }}>
          <AsyncAutocomplete
            variant="standard"
            name="name"
            applyCustomStyle
            label="Nume"
            disableClearable
            value={nameFilterValue}
            options={filterOptionsName}
            onChange={handleNameFilterChange}
          />
        </div>
      )
    },
    {
      filter: (
        <div style={{ width: '100%' }}>
          <AsyncAutocomplete
            variant="standard"
            name="department.name"
            label="Departament"
            disableClearable
            value={departmentFilterValue}
            options={filterOptionsDepartment}
            onChange={handleDepartmentFilterChange}
          />
        </div>
      )
    },
    {
      filter: (
        <div style={{ width: '100%' }}>
          <AsyncAutocomplete
            variant="standard"
            name="position"
            label="Position"
            disableClearable
            value={positionFilterValue}
            options={filterOptionsPosition}
            onChange={handlePositionFilterChange}
          />
        </div>
      )
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Paper className={s.filtersContainer}>
        <Grid container spacing={4}>
          {isFilterOptionsLoading && (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            </div>
          )}

          <Grid xs={12} md={3} item>
            <AsyncAutocomplete
              variant="standard"
              applyCustomStyle
              name="store.id"
              label="Selecteaza magazin"
              disableClearable
              value={storeFilterValue}
              options={filterOptions}
              onChange={handleStoreFilterChange}
            />
          </Grid>
        </Grid>
      </Paper>

      {storeFilterValue && nameFilterValue && positionFilterValue && departmentFilterValue && (
        <Box width={'100%'}>
          <Table
            hideCheckbox
            orderBy="department.name"
            order="desc"
            columns={columns}
            items={tableItems}
            fetchData={fetchData}
            isLoading={isLoading}
            totalCount={totalCount}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
            filters={tableFilterFields}
          />
        </Box>
      )}
    </div>
  )
}

export default EmployeesTab
