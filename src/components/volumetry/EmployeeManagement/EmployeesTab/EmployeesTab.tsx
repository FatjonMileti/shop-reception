import { Box } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './EmployeesTab.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { EmployeeManagementItem } from 'components/volumetry/interfaces'
import { columns } from './helpers'
import { Autocomplete, Input } from '@fullscreendigital/carrefour-dex-fe'
import {
  getDepartmentsOptions,
  getEmployeeNamesOptions,
  getJobTitlesOptions
} from 'components/volumetry/api'
import { handleQueryError } from 'components/volumetry/utils'
import { useNotification } from 'hooks'

const EmployeesTab = () => {
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<EmployeeManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const { showNotification } = useNotification()

  const { data: departmentsOptions } = getDepartmentsOptions(showNotification)
  const { data: employeeNamesOptions } = getEmployeeNamesOptions(showNotification)
  const { data: jobTitlesOptions } = getJobTitlesOptions(showNotification)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/workers/employees',
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
      handleQueryError(error, 'Error while fetching job titles', showNotification)
    }
  }

  const tableFilterFields = [
    {
      name: 'fullName',
      label: 'Nume',
      type: 'text',
      value: '',
      filter: (
        <Input type="text" name="fullName" label="Nume" variant="outlined" value="" />
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
          options={departmentsOptions}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
      )
    },
    {
      name: 'position',
      label: 'Functie',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Functie"
          disableClearable
          options={jobTitlesOptions}
          isOptionEqualToValue={(option, value) => option.value === value.value}
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
