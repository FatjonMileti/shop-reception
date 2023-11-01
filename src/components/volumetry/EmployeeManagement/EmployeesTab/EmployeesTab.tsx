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

const tableFilterFields = [
  {
    name: 'department.name',
    label: 'Departament',
    type: 'text',
    filter: (
      <Input type="text" name="department.name" label="Departament" variant="standard" value="" />
    )
  },
  {
    name: 'name',
    label: 'Nume',
    type: 'text',

    filter: <Input type="text" name="name" label="Nume" variant="standard" />
  },
  {
    name: 'position',
    label: 'Functie',
    type: 'text',

    filter: <Input type="text" name="position" label="Functie" variant="standard" />
  }
]

const EmployeesTab = () => {
  const { showNotification } = useNotification()
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<EmployeeManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const { data: filterOptions, isLoading: isFilterOptionsLoading } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/store')
      const resultOptions = result.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )

      setStoreFilterValue(resultOptions[0])
      return resultOptions || []
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

  const handleFilterChange = (value: ValueLabelInterface): void => {
    setStoreFilterValue(value)
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
              name="store.id"
              label="Selecteaza magazin"
              disableClearable
              value={storeFilterValue}
              options={filterOptions}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>
      </Paper>

      {storeFilterValue && (
        <Box>
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
