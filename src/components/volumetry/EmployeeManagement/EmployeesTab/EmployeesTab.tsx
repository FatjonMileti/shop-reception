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

const EmployeesTab = () => {
  const { showNotification } = useNotification()
  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)
  const [nameFilterValue, setNameFilterValue] = useState<ValueLabelInterface>(null)
  const [positionFilterValue, setPositionFilterValue] = useState<ValueLabelInterface>(null)
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

  const handleNameFilterChange = (value: ValueLabelInterface): void => {
    setNameFilterValue(value)
    setShouldRefreshData(true)
  }
  const handleDepartmentFilterChange = (value: ValueLabelInterface): void => {
    setDepartmentFilterValue(value)
    setShouldRefreshData(true)
  }
  const handlePositionFilterChange = (value: ValueLabelInterface): void => {
    setPositionFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const filters =
        nameFilterValue && positionFilterValue && departmentFilterValue
          ? [
              { name: 'name', value: nameFilterValue.value },
              { name: 'position', value: positionFilterValue.value },
              { name: 'department.name', value: departmentFilterValue.value }
            ]
          : []

      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/employee',
          filters: filters,
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
        <div className={s.autoCompleteStyles}>
          <AsyncAutocomplete
            variant="standard"
            name="name"
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
        <div className={s.autoCompleteStyles}>
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
        <div className={s.autoCompleteStyles}>
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
