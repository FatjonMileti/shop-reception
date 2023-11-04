import React, { useMemo, useState } from 'react'
import { Box, CircularProgress, Grid, Paper, debounce, Typography } from "@mui/material"
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
import { toTableRowItems } from './serializers'
import { columns, roles } from './helpers'
import { TeamDayOffManagementItem, ValueLabelInterface } from '../interfaces'
import { useQuery } from 'react-query'
import DeleteConfirmationModal from "components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal";

const TeamDayOffManagement = () => {
  const [domainFilterValue, setDomainFilterValue] = useState<ValueLabelInterface>(null)
  const [tableItems, setTableItems] = useState<TeamDayOffManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<TeamDayOffManagementItem>()

  const { showNotification } = useNotification()

  const { canCreate, canEdit, canDelete } = usePermissions(roles)

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
          {isFilterOptionsLoading || isTeamMembersLoading ? (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            </div>
          ) : (
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
          )}
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
            orderBy="teamMemberName"
            order="asc"
            columns={columnsWithActions}
            items={tableItems}
            fetchData={fetchData}
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
