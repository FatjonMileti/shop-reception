import { useEffect, useMemo, useState } from 'react'
import { Box, Grid, Paper, debounce } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import s from './TeamDayOffManagement.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import { useNotification, usePermissions } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { Table } from 'components/core-ui/Table'
import { Input } from 'components/core-ui/Input'
import { NewTimeOff } from './NewTimeOff'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Delete, Edit } from '@mui/icons-material'
import { DeleteTimeOff } from './DeleteTimeOff'
import { toTableRowItems } from './serializers'
import { TeamDayOffManagementItem, TeamDayOffManagementTableFilter, TeamMember, ValueLabelInterface } from '../interfaces'
import { PermissionRoles } from 'utils/enums'
import { columns, roles } from './helpers'

const TeamDayOffManagement = () => {
  const [domainFilterValue, setDomainFilterValue] = useState<ValueLabelInterface>(null)
  const [filterOptions, setFilterOptions] = useState<ValueLabelInterface[]>([])
  const [tableItems, setTableItems] = useState<TeamDayOffManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [teamMembers, setTeamMembers] = useState(null)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<TeamDayOffManagementItem | number>(0)
  const [tableFilter, setTableFilter] = useState<TeamDayOffManagementTableFilter>({
    teamMember: null,
    dayOffType: null,
    startDate: null,
    endDate: null
  })

  const { showNotification } = useNotification()

  const { canCreate, canEdit, canDelete } = usePermissions(roles)

  useEffect(() => {
    ;(async () => {
      try {
        const result = await makeCoreGetRequest('/governance/domains')

        const resultOptions = toAsyncSelectOptions(result, 'domain', 'domain') || []
        setFilterOptions(resultOptions)
      } catch (error) {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    })()
  }, [])

  useEffect(() => {
    if (filterOptions.length) {
      setDomainFilterValue(filterOptions[0])
    }
  }, [filterOptions])

  useEffect(() => {
    if (domainFilterValue) {
      ;(async () => {
        try {
          const result = await makeCoreGetRequest(
            `/governance/teamMembers?page=-1&filterBy=domain&filterValue=${encodeURIComponent(
              domainFilterValue?.value
            )}`
          )
          const resultOptions = toAsyncSelectOptions(result.list, 'id', 'name') || []
          setTeamMembers(resultOptions)
        } catch (error) {
          showNotification({
            message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        }
      })()
    }
  }, [domainFilterValue])

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const selectRow = (row, action) => {
    setSelectedRow(row)
    action === 'edit' ? openEditModal() : openDeleteModal()
  }

  const columnsWithActions = useMemo(() => {
    let result = columns

    if (canEdit || canDelete) {
      const actionsRow = {
        title: '',
        field: 'actions',
        align: 'right',
        width: '112px',
        collapsible: 'true',
        render: row => (
          <Box display="flex">
            {canEdit && (
              <Button
                onClick={() => selectRow(row, 'edit')}
                style={{ minWidth: '0.7rem', background: 'transparent' }}
                label=""
              >
                <Edit />
              </Button>
            )}

            {canDelete && (
              <Button onClick={() => selectRow(row, 'delete')} label="">
                <Delete />
              </Button>
            )}
          </Box>
        )
      } as any

      result = [...columns, actionsRow]
    }
    return result
  }, [columns, canEdit, canDelete, teamMembers])

  const handleFilterChange = value => {
    setDomainFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/teamTimeOff',
          filters: [{ name: 'teamMember.domain', value: domainFilterValue.value }],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const responseList = response.list.map(item =>
        typeof item.numberOfHours === 'undefined' || item.numberOfHours === null
          ? { ...item, numberOfHours: '' }
          : item
      )

      setTableItems(toTableRowItems(responseList))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }
  const debouncedHandleRemoteData = debounce(fetchData, 500)

  const tableFilterFields = [
    {
      name: 'teamMember.name',
      label: 'Team member',
      type: 'text',
      filter: (
        <Input type="text" name="teamMember.name" label="Team member" variant="standard" value="" />
      )
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Paper className={s.filtersContainer}>
        <Grid container spacing={4}>
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
          <NewTimeOff
            teamMembers={teamMembers}
            isModalOpen={isNewModalOpen}
            closeModal={closeNewModal}
            setShouldRefreshData={setShouldRefreshData}
          />
          <NewTimeOff
            isModalOpen={isEditModalOpen}
            closeModal={closeEditModal}
            editItem={selectedRow}
            setShouldRefreshData={setShouldRefreshData}
            isEdit
          />
          <DeleteTimeOff
            isModalOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            deleteItem={selectedRow}
            setShouldRefreshData={setShouldRefreshData}
          />
          <Table
            hideCheckbox
            orderBy="teamMemberName"
            order="asc"
            columns={columnsWithActions}
            items={tableItems}
            fetchData={debouncedHandleRemoteData}
            isLoading={isLoading}
            newButton={canCreate ? { onClick: openNewModal } : null}
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

export default TeamDayOffManagement
