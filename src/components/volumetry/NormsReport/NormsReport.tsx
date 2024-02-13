import { Box, CircularProgress, Grid } from '@mui/material'
import s from './NormsReport.modules.scss'
import { useState } from 'react'
import { ValueLabelInterface } from '../interfaces'
import { getDepartmentsOptions, getLocationsOptions } from '../api'
import { useNotification, usePermissions } from 'hooks'
import { DatePicker, FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { columns } from './helpers'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { VOLUMETRY_DAILY_NORMS_REPORT } from '../TaskManagement/constants'
import { handleQueryError } from '../utils'
import { Table } from 'components/core-ui/Table'
import { toTableRowItems } from './serializers'
import { formatPayloadDate } from 'utils/helpers'
import { roles } from '../helpers'

const NormsReport = () => {
  const { showNotification } = useNotification()

  const { canUseCustomFilter } = usePermissions(roles)

  const [tableItems, setTableItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)

  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)
  const [locationsFilterValue, setLocationsFilterValue] = useState<ValueLabelInterface>(null)

  const { data: departmentsOptions, isLoading: isDepartmentsOptionsLoading } =
    getDepartmentsOptions(showNotification, setDepartmentFilterValue)

  const { data: locationsOptions, isLoading: isLocationsLoading } = getLocationsOptions(
    showNotification,
    setLocationsFilterValue,
    canUseCustomFilter
  )

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: VOLUMETRY_DAILY_NORMS_REPORT,
          filters: [
            { name: 'genericDepartmentId', value: departmentFilterValue.value },
            ...(canUseCustomFilter
              ? [{ name: 'locationId', value: locationsFilterValue.value }]
              : [])
          ],
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
      handleQueryError(error, 'Error while fetching table data', showNotification)
    }
  }

  const handleDepartmentOptionChange = value => {
    setDepartmentFilterValue(value)
    setShouldRefreshData(true)
  }

  const handleLocationOptionChange = value => {
    setLocationsFilterValue(value)
    setShouldRefreshData(true)
  }

  const tableFilterFields = [
    {
      name: 'queryDate',
      label: 'Data curenta',
      type: 'date',
      value: formatPayloadDate(new Date()),
      required: true,
      filter: (
        <DatePicker
          value={formatPayloadDate(new Date())}
          onChange={() => {}}
          label="Data curenta"
          variant="outlined"
          required
        />
      )
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Grid container spacing={4}>
        {canUseCustomFilter &&
          (isLocationsLoading ? (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            </div>
          ) : (
            <Grid xs={12} md={4} item style={{ padding: 0 }} className={s.filterContainer}>
              <FilterDataSelect
                name="location"
                defaultSelectedData={locationsFilterValue}
                label="Magazin:"
                showCounter={true}
                showSearch={true}
                counterLabel="Selecteaza magazin"
                noDataFoundLabel="Nu s-au gasit rezultate."
                options={locationsOptions}
                onSelect={handleLocationOptionChange}
              />
            </Grid>
          ))}
        {isDepartmentsOptionsLoading ? (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        ) : (
          <Grid xs={12} md={4} item style={{ padding: 0 }}>
            <FilterDataSelect
              name="name"
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
        )}
      </Grid>

      {(canUseCustomFilter
        ? departmentFilterValue && locationsFilterValue
        : departmentFilterValue) && (
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
          filters={tableFilterFields}
          rowActionsWidth="130px"
        />
      )}
    </div>
  )
}

export default NormsReport
