import { Box, CircularProgress, Grid, Paper } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { RootState } from 'configureStore'
import { useNotification } from 'hooks'
import { useGovernanceDomains } from 'hooks/useGovernanceDomains'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import s from '../TeamDayOffManagement/TeamDayOffManagement.modules.scss'
import { TeamAssignmentItem, TeamCapacityTableFilter, ValueLabelInterface } from '../interfaces'
import { buildColumns, buildTableFilterFields } from './utils'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { toTableRowItems } from './helpers'

const TeamCapacity = () => {
  const { dispatchFetchDomains } = useGovernanceDomains()
  const storedGovernanceDomains = useSelector((state: RootState) => state.governanceDomains.domains)

  const [domainFilterValue, setDomainFilterValue] = useState<ValueLabelInterface>(null)
  const [domainFilterOptions, setDomainFilterOptions] = useState<ValueLabelInterface[]>(null)

  const [tableItems, setTableItems] = useState<TeamAssignmentItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableFilter, setTableFilter] = useState<TeamCapacityTableFilter>({
    teamMemberName: null,
    baseRole: null,
    startDate: new Date(),
    endDate: new Date()
  })

  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const { showNotification } = useNotification()

  const tableFilterFields = useMemo(
    () => buildTableFilterFields(tableFilter, setTableFilter),
    [tableFilter]
  )
  const tableColumns = useMemo(() => buildColumns(searchParams), [searchParams])

  useEffect(() => {
    ;(async () => {
      if (storedGovernanceDomains === null) {
        dispatchFetchDomains()
      } else {
        const resultOptions =
          toAsyncSelectOptions(storedGovernanceDomains, 'domain', 'domain') || []
        setDomainFilterValue(resultOptions[0])
        setDomainFilterOptions(resultOptions)
      }
    })()
  }, [storedGovernanceDomains])

  const handleFilterChange = value => {
    setDomainFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/teamCapacity',
          filters: [{ name: 'teamMember.domain', value: domainFilterValue.value }],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )
      if (
        tableFilters &&
        tableFilters.length > 3 &&
        (tableFilters[2].value || tableFilters[3].value)
      ) {
        setSearchParams({
          startDate: tableFilters[2].value ?? '',
          endDate: tableFilters[3].value ?? ''
        })
      }
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
      <Grid container spacing={4}>
        {!storedGovernanceDomains || domainFilterValue === null ? (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        ) : (
          <Grid xs={12} md={2} item style={{ padding: 0 }}>
            <FilterDataSelect
              name="teamMember.domain"
              defaultSelectedData={domainFilterValue}
              label="Domain"
              showCounter={true}
              showSearch={true}
              counterLabel="Select category"
              noDataFoundLabel="No results!"
              options={domainFilterOptions}
              onSelect={handleFilterChange}
            />
          </Grid>
        )}
      </Grid>
      {domainFilterValue && (
        <Box>
          <Table
            hideCheckbox
            orderBy="teamMemberName"
            order="asc"
            items={tableItems}
            fetchData={fetchData}
            isLoading={isLoading}
            columns={tableColumns}
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

export default TeamCapacity
