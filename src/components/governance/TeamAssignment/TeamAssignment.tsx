import { useState } from 'react'
import { Box, CircularProgress, Grid, Paper } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import s from '../TeamDayOffManagement/TeamDayOffManagement.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import { useNotification, usePermissions } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { Table } from 'components/core-ui/Table'
import { Input } from 'components/core-ui/Input'
import { Edit } from '@mui/icons-material'
import { PermissionRoles } from 'utils/enums'
import { TeamAssignmentItem, TeamAssignmentTableFilter, ValueLabelInterface } from '../interfaces'
import { EditTeamAssignment } from './EditTeamAssignment'
import { useQuery } from 'react-query'

const columns = [
  {
    title: 'Person',
    field: 'teamMemberName',
    align: 'left'
  },
  {
    title: 'Role',
    field: 'role',
    align: 'left'
  },
  {
    title: 'IIB Key',
    field: 'iibKey',
    align: 'left',
    collapsible: true
  },
  {
    title: 'IPB Key',
    field: 'ipbKey',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Assigned Project',
    field: 'assignedProject',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Assignment Start Date',
    field: 'assignmentStartDate',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Assignment End Date',
    field: 'assignmentEndDate',
    align: 'left',
    collapsible: true
  }
]

const TeamAssignment: React.FC = props => {
  const [domainFilterValue, setDomainFilterValue] = useState<ValueLabelInterface>(null)
  const [tableItems, setTableItems] = useState<TeamAssignmentItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<TeamAssignmentItem | number>(0)

  const [tableFilter, setTableFilter] = useState<TeamAssignmentTableFilter>({
    teamMemberName: null,
    iibKey: null,
    ipbKey: null,
    assignedProject: null
  })

  const { showNotification } = useNotification()

  const { canEdit } = usePermissions({
    editRoles: [
      PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN,
      PermissionRoles.GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL
    ]
  })

  const { data: filterOptions, isLoading: isFilterOptionsLoading } = useQuery(
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

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = row => {
    setSelectedRow(row)
    openEditModal()
  }

  const handleFilterChange = value => {
    setDomainFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/teamAssignments',
          filters: [{ name: 'teamMember.domain', value: domainFilterValue.value }],
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
      name: 'teamMember.name',
      label: 'Person',
      type: 'text',
      filter: (
        <Input type="text" name="teamMember.name" label="Person" variant="standard" value="" />
      )
    },
    {
      name: 'project.name',
      label: 'Assigned Project',
      type: 'text',

      filter: (
        <Input
          type="text"
          name="assignedProject"
          label="Assigned Project"
          variant="standard"
          onChange={value => setTableFilter({ ...tableFilter, assignedProject: value })}
          value={tableFilter.assignedProject}
        />
      )
    },
    {
      name: 'project.iibKey',
      label: 'IIB Key',
      type: 'text',

      filter: (
        <Input
          type="text"
          name="iibKey"
          label="IIB Key"
          variant="standard"
          onChange={value => setTableFilter({ ...tableFilter, iibKey: value })}
          value={tableFilter.iibKey}
        />
      )
    },
    {
      name: 'project.ipbKey',
      label: 'IPB Key',
      type: 'text',

      filter: (
        <Input
          type="text"
          name="ipbKey"
          label="IPB Key"
          variant="standard"
          onChange={value => setTableFilter({ ...tableFilter, ipbKey: value })}
          value={tableFilter.ipbKey}
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
              applyCustomStyle
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
          <EditTeamAssignment
            isModalOpen={isEditModalOpen}
            closeModal={closeEditModal}
            editItem={selectedRow}
            setShouldRefreshData={setShouldRefreshData}
          />
          <Table
            hideCheckbox
            orderBy="teamMember.name"
            order="asc"
            columns={columns}
            items={tableItems}
            fetchData={fetchData}
            isLoading={isLoading}
            totalCount={totalCount}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
            filters={tableFilterFields}
            rowActions={[
              {
                label: 'Edit',
                labelColor: 'white',
                typographyVariant: 'medium',
                backgroundColor: '#0970E6',
                onClick: (e, rowId) => {
                  selectRow(tableItems.find(item => item.id === rowId))
                }
              }
            ]}
          />
        </Box>
      )}
    </div>
  )
}

export default TeamAssignment
