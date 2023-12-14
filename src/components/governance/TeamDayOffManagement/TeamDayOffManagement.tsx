import { Add, CalendarMonth } from '@mui/icons-material'
import { Box, CircularProgress, Grid, Paper, Typography, useMediaQuery } from '@mui/material'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'
import { Input } from 'components/core-ui/Input'
import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { useGovernanceDomains, useNotification, usePermissions } from 'hooks'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { roles } from './helpers'
import { TeamDayOffManagementItem, ValueLabelInterface } from '../interfaces'
import { NewTimeOff } from './NewTimeOff'
import s from './TeamDayOffManagement.modules.scss'
import { columns } from './helpers'
import { toTableRowItems } from './serializers'
import { RootState } from 'configureStore'
import { useSelector } from 'react-redux'
import { DeleteActionIcon, EditActionIcon } from 'icons'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { PublicHolidays } from '../PublicHolidays'

const TeamDayOffManagement = () => {
  const { dispatchFetchDomains } = useGovernanceDomains()
  const storedGovernanceDomains = useSelector((state: RootState) => state.governanceDomains.domains)

  const [domainFilterValue, setDomainFilterValue] = useState<ValueLabelInterface>(null)
  const [domainFilterOptions, setDomainFilterOptions] = useState<ValueLabelInterface[]>(null)

  const [tableItems, setTableItems] = useState<TeamDayOffManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isPublicHolidaysModalOpen, setIsPublicHolidaysModalOpen] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<TeamDayOffManagementItem>()

  const { showNotification } = useNotification()

  const { canCreate, canEdit, canDelete } = usePermissions(roles)
  const isXs = useMediaQuery('(max-width:624px)')

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

  const { data: teamMembers, isLoading: isTeamMembersLoading } = useQuery(
    ['teamMembers', domainFilterValue],
    async () => {
      if (domainFilterValue === null) {
        return null
      }

      const result = await makeCoreGetRequest(
        `/governance/teamMembers?page=-1&filterBy=domain&filterValue=${encodeURIComponent(
          domainFilterValue?.value
        )}`
      )
      const resultOptions = toAsyncSelectOptions(result.list, 'id', 'name') || []
      return resultOptions || null
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

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const openPublicHolidaysModal = (): void => setIsPublicHolidaysModalOpen(true)
  const closePublicHolidaysModal = (): void => setIsPublicHolidaysModalOpen(false)

  const rowActions = useMemo(() => {
    let actions

    const selectRow = (rowId, action) => {
      const item = tableItems.find(item => item.id === rowId)
      setSelectedRow(item)
      action === 'edit' ? openEditModal() : openDeleteModal()
    }

    if (canEdit || canDelete) {
      actions = [
        {
          label: 'Edit',
          labelColor: 'white',
          typographyVariant: 'medium',
          desktopIcon: <EditActionIcon />,
          backgroundColor: '#0970E6',
          onClick: (e, rowId) => selectRow(rowId, 'edit')
        },
        {
          label: 'Delete',
          labelColor: 'white',
          typographyVariant: 'medium',
          backgroundColor: '#CC4010',
          desktopIcon: <DeleteActionIcon />,
          onClick: (e, rowId) => selectRow(rowId, 'delete')
        }
      ]
    }
    return actions
  }, [columns, canEdit, canDelete, teamMembers, tableItems])

  const toolbarActions = useMemo(() => {
    let actions = [
      {
        label: 'Holidays',
        icon: <CalendarMonth />,
        onClick: () => openPublicHolidaysModal()
      }
    ]

    if (canCreate) {
      actions = [
        ...actions,
        {
          label: 'Add',
          icon: <Add />,
          onClick: () => openNewModal()
        }
      ]
    }

    return actions
  }, [canCreate])

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

  const tableFilterFields = [
    {
      name: 'teamMember.name',
      label: 'Team member',
      type: 'text',
      filter: (
        <Input type="text" name="teamMember.name" label="Team member" variant="outlined" value="" />
      )
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Grid sx={{ width: '100%', display: 'block' }} container>
        {!storedGovernanceDomains || isTeamMembersLoading ? (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        ) : (
          <Grid item style={{ display: 'block', padding: 0 }}>
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
          <PublicHolidays
            isModalOpen={isPublicHolidaysModalOpen}
            closeModal={closePublicHolidaysModal}
          />
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
          <DeleteConfirmationModal
            isModalOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            actionUrl="/governance/teamTimeOff/:id"
            itemId={`${selectedRow?.id}`}
            content={<Typography>Are you sure you want to delete this entry?</Typography>}
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
            rowActions={rowActions}
            rowActionsWidth="130px"
            toolbarActions={toolbarActions}
            filtersLabel="Filters"
            filtersButtonLabel="Filters"
            appliedFiltersLabel="Filters"
            cancelFiltersButtonLabel="Cancel"
            applyFiltersButtonLabel="Apply"
          />
        </Box>
      )}
    </div>
  )
}

export default TeamDayOffManagement
