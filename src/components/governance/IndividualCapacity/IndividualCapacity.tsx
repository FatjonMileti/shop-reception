import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { Box, CircularProgress, Grid, Paper } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import { Input } from 'components/core-ui/Input'
import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { RootState } from 'configureStore'
import { useGovernanceDomains, useNotification } from 'hooks'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import s from '../TeamDayOffManagement/TeamDayOffManagement.modules.scss'
import {
  IndividualCapacityTableFilter,
  TeamAssignmentItem,
  ValueLabelInterface
} from '../interfaces'
import { formatPayloadDate } from 'utils/helpers'

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
    type: 'string',
    sticky: true
  },
  {
    title: 'IIB Key',
    field: 'projectlibKey',
    align: 'left',
    type: 'string',
    sticky: true,
    collapsible: true
  },
  {
    title: 'IPB Key',
    field: 'projectIpbKey',
    align: 'left',
    type: 'string',
    sticky: true,
    collapsible: true
  },
  {
    title: 'Assigned Project',
    field: 'projectName',
    align: 'left',
    type: 'string',
    sticky: true
  },
  {
    title: 'Role',
    field: 'assignedRole',
    align: 'left',
    type: 'string',
    sticky: true,
    collapsible: true
  },
  {
    title: 'Start Date',
    field: 'startDate',
    align: 'left',
    type: 'date',
    sticky: true,
    collapsible: true
  },
  {
    title: 'End Date',
    field: 'endDate',
    align: 'left',
    type: 'date',
    sticky: true,
    collapsible: true
  },
  {
    title: 'T-Shirt Size',
    field: 'projectTShirtSize',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Project Stage',
    field: 'projectMilestoneStage',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Estimated Workload',
    field: 'estimatedWorkload',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'T-Shirt Size Multiplier',
    field: 'tshirtSizeMultiplier',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Real Effort',
    field: 'realEffort',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'Total available (h)',
    field: 'totalAvailable',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'Total timeoff (h)',
    field: 'totalTimeOff',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'Real availability (h)',
    field: 'realAvailability',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'Total Effort (h)',
    field: 'totalEffortHours',
    align: 'left',
    type: 'number',
    collapsible: true
  },
  {
    title: 'Effort (md)',
    field: 'totalEffortManDays',
    align: 'left',
    type: 'number',
    collapsible: true
  }
]

const IndividualCapacity: React.FC<EditTeamAssignmentProps> = props => {
  const [tableItems, setTableItems] = useState<TeamAssignmentItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const [tableFilter, setTableFilter] = useState<IndividualCapacityTableFilter>({
    teamMemberId: null,
    startDate: searchParams.get('startDate'),
    endDate: searchParams.get('endDate')
  })

  const { id } = useParams()

  const { showNotification } = useNotification()

  const handleFilterChange = value => {
    setShouldRefreshData(true)
  }

  const fetchData = async ({ tableFilters, rowsPerPage, order, orderBy }) => {
    setIsLoading(true)
    try {
      const getTableFilters = tableFilters.map((filter, index) => {
        if (!filter.value && !!searchParams.get(filter.name)) {
          return { name: filter.name, value: searchParams.get(filter.name) }
        }
        return filter
      })
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/individualCapacity',
          filters: [{ name: 'teamMember.id', value: id }],
          tableFilters: getTableFilters,
          orderBy,
          rowsPerPage,
          order
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
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      value: formatPayloadDate(tableFilter.startDate),

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
      value: formatPayloadDate(tableFilter.endDate),

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
      <Grid container spacing={4}>
        <Grid xs={12} md={2} item style={{ padding: 0 }}></Grid>
      </Grid>

      <Box>
        <Table
          hideCheckbox
          orderBy="teamMemberName"
          order="asc"
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          columns={columns}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          filters={tableFilterFields}
        />
      </Box>
    </div>
  )
}

export default IndividualCapacity
