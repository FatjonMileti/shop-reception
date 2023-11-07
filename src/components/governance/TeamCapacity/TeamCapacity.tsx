import { useMemo, useState } from 'react'
import { Box, CircularProgress, Grid, Paper } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import s from '../TeamDayOffManagement/TeamDayOffManagement.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import { useNotification, usePermissions } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { Table } from 'components/core-ui/Table'
import { Input } from 'components/core-ui/Input'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { TeamAssignmentItem, TeamCapacityTableFilter, ValueLabelInterface } from '../interfaces'
import { useQuery } from 'react-query'

interface EditTeamAssignmentProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
}

const columns = [
  {
    title: 'Person',
    field: 'teamMemberName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Total Effort (MD)',
    field: 'totalEffort',
    align: 'left',
    type: 'number'
  },
  {
    title: 'Total Available (MD)',
    field: 'totalAvailable',
    align: 'left',
    type: 'number'
  },
  {
    title: 'Remaining (MD)',
    field: 'remaining',
    align: 'left',
    type: 'number'
  },
  {
    title: 'Number Of Projects',
    field: 'numberOfProjects',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'Base Role',
    field: 'baseRole',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Assigned Roles',
    field: 'assignedRoles',
    align: 'left',
    type: 'string',
    collapsible: true
  }
]

const TeamCapacity: React.FC<EditTeamAssignmentProps> = props => {
  const [domainFilterValue, setDomainFilterValue] = useState<ValueLabelInterface>(null)
  const [tableItems, setTableItems] = useState<TeamAssignmentItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [tableFilter, setTableFilter] = useState<TeamCapacityTableFilter>({
    teamMemberName: null,
    baseRole: null,
    startDate: null,
    endDate: null
  })

  const { showNotification } = useNotification()

  const {
    data: filterOptions,
    isLoading: isFilterOptionsLoading,
    error,
    isError
  } = useQuery(
    ['domains'],
    async () => {
      const result = await makeCoreGetRequest('/governance/domains')
      const resultOptions = toAsyncSelectOptions(result, 'domain', 'domain') || []

      setDomainFilterValue(resultOptions[0])
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

      setTableItems(response.list)
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
      name: 'teamMemberName',
      label: 'Person',
      type: 'text',
      filter: <Input type="text" name="teamMemberName" label="Person" variant="standard" value="" />
    },
    {
      name: 'baseRole',
      label: 'Base Role',
      type: 'text',

      filter: (
        <Input
          type="text"
          name="baseRole"
          label="Base Role"
          variant="standard"
          onChange={value => setTableFilter({ ...tableFilter, baseRole: value })}
          value={tableFilter.baseRole}
        />
      )
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',

      filter: (
        <DatePicker
          value={tableFilter.startDate}
          onChange={value => setTableFilter({ ...tableFilter, startDate: value })}
          label="Start date"
          variant="standard"
        />
      )
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',

      filter: (
        <DatePicker
          value={tableFilter.endDate}
          onChange={value => setTableFilter({ ...tableFilter, endDate: value })}
          label="End date"
          variant="standard"
        />
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
              name="teamMember.domain"
              label="Domain"
              disableClearable
              value={domainFilterValue}
              options={filterOptions}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>
      </Paper>
      {domainFilterValue && (
        <Box>
          <Table
            hideCheckbox
            orderBy="teamMember.name"
            order="asc"
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

export default TeamCapacity
