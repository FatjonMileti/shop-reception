import { useState } from 'react'
import { CircularProgress, Grid } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './EmployeesStatus.modules.scss'
import { getDepartmentsOptions } from '../api'
import { useNotification } from 'hooks'
import { toTableRowItems } from './serializers'
import { shiftCategoryOptions, columns } from './helpers'
import { ValueLabelInterface } from '../interfaces'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'

const EmployeesStatus = () => {
  const { showNotification } = useNotification()
  const [totalCount, setTotalCount] = useState<number>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [tableItems, setTableItems] = useState([])

  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)
  const [shiftCategoryFilterValue, setShiftCategoryFilterValue] = useState<ValueLabelInterface>(shiftCategoryOptions[0])

  const { data: departmentsOptions, isLoading: isDepartmentsOptionsLoading } =
    getDepartmentsOptions(showNotification, setDepartmentFilterValue)

  const handleDepartmentOptionChange = value => {
    setDepartmentFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    const filters = [
      { name: 'department', value: departmentFilterValue?.value },
      ...(typeof shiftCategoryFilterValue?.value !== 'undefined' && [
        { name: 'shiftCategory', value: shiftCategoryFilterValue?.value }
      ])
    ]

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/tasks/overview',
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

  const handleShiftCategoryOptionChange = value => {
    setShiftCategoryFilterValue(value)
    setShouldRefreshData(true)
  }

  return (
    <div className={s.mainContainer}>
      <Grid container spacing={4} style={{ marginBottom: '40px' }}>
        {isDepartmentsOptionsLoading ? (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        ) : (
          <>
            <Grid xs={4} md={3} mb={2} item style={{ padding: 0 }}>
              <FilterDataSelect
                name="department"
                defaultSelectedData={departmentFilterValue}
                label="Departament"
                showCounter={true}
                showSearch={true}
                counterLabel="Select department"
                noDataFoundLabel="No results!"
                options={departmentsOptions}
                onSelect={handleDepartmentOptionChange}
              />
            </Grid>
            <Grid xs={12} md={3} item style={{ padding: 0, marginLeft: '60px' }}>
              <FilterDataSelect
                name="shiftCategory"
                defaultSelectedData={shiftCategoryFilterValue}
                label="Ture/colaboratori"
                showCounter={true}
                showSearch={true}
                counterLabel="Ture/colaboratori"
                noDataFoundLabel="No results!"
                options={shiftCategoryOptions}
                onSelect={handleShiftCategoryOptionChange}
              />
            </Grid>
          </>
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
