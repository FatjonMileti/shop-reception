import { Box, CircularProgress, Grid } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './EmployeesTab.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { EmployeeManagementItem, ValueLabelInterface } from 'components/volumetry/interfaces'
import { columns } from './helpers'
import { Autocomplete, FilterDataSelect, Input } from '@fullscreendigital/carrefour-dex-fe'
import {
  getDepartmentsOptions,
  getJobTitlesOptions,
  getLocationsOptions
} from 'components/volumetry/api'
import { handleQueryError } from 'utils/helpers'
import { useNotification, usePermissions } from 'hooks'
import { roles } from '../../helpers'

const EmployeesTab = () => {
  const [locationsFilterValue, setLocationsFilterValue] = useState<ValueLabelInterface>(null)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<EmployeeManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const { showNotification } = useNotification()
  const { canUseCustomFilter } = usePermissions(roles)

  const { data: departmentsOptions } = getDepartmentsOptions(showNotification)
  const { data: jobTitlesOptions } = getJobTitlesOptions(showNotification)
  const { data: locationsOptions, isLoading: isLocationsLoading } = getLocationsOptions(
    showNotification,
    setLocationsFilterValue,
    canUseCustomFilter
  )

  const handleFilterChange = value => {
    setLocationsFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/workers/employees',
          filters: canUseCustomFilter
            ? [{ name: 'locationId', value: locationsFilterValue.value }]
            : [],
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
      handleQueryError(error, 'A aparut o eroare la obtinerea angajatilor.', showNotification)
    }
  }

  const tableFilterFields = [
    {
      name: 'fullName',
      label: 'Nume',
      type: 'text',
      value: '',
      filter: <Input type="text" name="fullName" label="Nume" variant="outlined" value="" />
    },
    {
      name: 'genericDepartmentId',
      label: 'Departament',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Departament"
          options={departmentsOptions}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
      )
    },
    {
      name: 'jobTitleId',
      label: 'Functie',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Functie"
          options={jobTitlesOptions}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
      )
    }
  ]

  return (
    <div className={s.mainContainer}>
      {canUseCustomFilter && (
        <Grid sx={{ width: '100%', display: 'block' }} container>
          {isLocationsLoading ? (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            </div>
          ) : (
            <Grid item style={{ display: 'block', padding: 0 }}>
              <FilterDataSelect
                name="location"
                defaultSelectedData={locationsFilterValue}
                label="Magazin:"
                showCounter={true}
                showSearch={true}
                counterLabel="Selecteaza magazin"
                noDataFoundLabel="Nu s-au gasit rezultate."
                options={locationsOptions}
                onSelect={handleFilterChange}
              />
            </Grid>
          )}
        </Grid>
      )}

      <Box width={'100%'}>
        {canUseCustomFilter ? (
          locationsFilterValue && (
            <Table
              hideCheckbox
              orderBy="genericDepartment"
              order="desc"
              columns={columns}
              items={tableItems}
              fetchData={fetchData}
              isLoading={isLoading}
              totalCount={totalCount}
              shouldRefreshData={shouldRefreshData}
              setShouldRefreshData={setShouldRefreshData}
              filters={tableFilterFields}
              filtersLabel="Filtreaza"
              appliedFiltersLabel="Filtre"
              applyFiltersButtonLabel="Aplica filtre"
              filtersButtonLabel="Filtreaza"
              cancelFiltersButtonLabel="Renunta"
              labelRowsPerPage="Randuri pe pagina:"
            />
          )
        ) : (
          <Table
            hideCheckbox
            orderBy="genericDepartment"
            order="desc"
            columns={columns}
            items={tableItems}
            fetchData={fetchData}
            isLoading={isLoading}
            totalCount={totalCount}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
            filters={tableFilterFields}
            filtersLabel="Filtreaza"
            appliedFiltersLabel="Filtre"
            applyFiltersButtonLabel="Aplica filtre"
            filtersButtonLabel="Filtreaza"
            cancelFiltersButtonLabel="Renunta"
            labelRowsPerPage="Randuri pe pagina:"
          />
        )}
      </Box>
    </div>
  )
}

export default EmployeesTab
