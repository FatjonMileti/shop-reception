import { Box } from '@mui/material'
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
import { EmployeeManagementItem, ValueLabelInterface } from 'components/volumetry/interfaces'
import { columns } from './helpers'
import { Autocomplete, Input } from '@fullscreendigital/carrefour-dex-fe'

const EmployeesTab = () => {
  const { showNotification } = useNotification()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<EmployeeManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const { data: filterOptionsDepartment } = useQuery(
    ['department'],
    async () => {
      const resultDepartment = await makeCoreGetRequest('/volumetry/department')

      const resultOptionsDepartment = resultDepartment.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )
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

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/employee',
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
      name: 'name',
      label: 'Nume',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Nume"
          disableClearable
          options={filterOptionsName}
        />
      )
    },
    {
      name: 'department',
      label: 'Departament',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Departament"
          disableClearable
          options={filterOptionsDepartment}
        />
      )
    },
    {
      name: 'position',
      label: 'Position',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Position"
          disableClearable
          options={filterOptionsPosition}
        />
      )
    }
  ]

  return (
    <div className={s.mainContainer}>
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
    </div>
  )
}

export default EmployeesTab
