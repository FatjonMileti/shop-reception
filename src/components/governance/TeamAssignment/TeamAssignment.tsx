import { Box, CircularProgress, Grid, Paper } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import { Input } from 'components/core-ui/Input'
import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { RootState } from 'configureStore'
import { useGovernanceDomains, useNotification, usePermissions } from 'hooks'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeCoreGetRequest } from 'utils/api'
import { PermissionRoles } from 'utils/enums'
import { formatErrorMessage } from 'utils/formatting'
import s from '../TeamDayOffManagement/TeamDayOffManagement.modules.scss'
import { TeamAssignmentItem, TeamAssignmentTableFilter, ValueLabelInterface } from '../interfaces'
import { EditTeamAssignment } from './EditTeamAssignment'
import { toTableRowItems } from './serializers'
import { EditActionIcon } from 'icons'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'

const columns = [
  {
    title: 'Person',
    field: 'teamMember.name',
    align: 'left'
  },
  {
    title: 'Role',
    field: 'role',
    align: 'left'
  },
  {
    title: 'IIB Key',
    field: 'project.iibKey',
    align: 'left',
    collapsible: true
  },
  {
    title: 'IPB Key',
    field: 'project.ipbKey',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Assigned Project',
    field: 'project.name',
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
  const { dispatchFetchDomains } = useGovernanceDomains()
  const storedGovernanceDomains = useSelector((state: RootState) => state.governanceDomains.domains)

  const [domainFilterValue, setDomainFilterValue] = useState<ValueLabelInterface>(null)
  const [domainFilterOptions, setDomainFilterOptions] = useState<ValueLabelInterface[]>(null)

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
      <Grid container spacing={4}>
        {!storedGovernanceDomains && (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        )}

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
      </Grid>
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
              canEdit && {
                label: 'Edit',
                labelColor: 'white',
                typographyVariant: 'medium',
                backgroundColor: '#0970E6',
                desktopIcon: <EditActionIcon />,
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
