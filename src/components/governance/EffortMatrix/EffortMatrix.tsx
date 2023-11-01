import { useMemo, useState } from 'react'
import { Box, CircularProgress, Grid, Paper, debounce } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import s from './EffortMatrix.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import { useNotification, usePermissions } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { Table } from 'components/core-ui/Table'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Delete, Edit } from '@mui/icons-material'
import { toTableRowItems } from './serializers'
import { columns, roles } from './helpers'
import { EffortMatrix, ValueLabelInterface } from '../interfaces'
import { useQuery } from 'react-query'
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import EffortMatrixFormModal from "./NewEffortMatrix/EffortMatrixFormModal";

const EffortMatrix = () => {
  const [domainFilterValue, setDomainFilterValue] = useState<ValueLabelInterface>(null)
  const [tableItems, setTableItems] = useState<EffortMatrix[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<EffortMatrix>()

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

  const { data: roleOptions, isLoading: isRoleOptionsLoading } = useQuery(
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
  }, [columns, canEdit, canDelete])

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

  const handleFilterChange = value => {
    setDomainFilterValue(value)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/effortMatrix',
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

  return (
    <div className={s.mainContainer}>
      <Paper className={s.filtersContainer}>
        <Grid container spacing={4}>
          {(isFilterOptionsLoading || isRoleOptionsLoading) && (
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
              options={filterOptions ?? []}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>
      </Paper>
      {domainFilterValue && (
        <Box>
          <EffortMatrixFormModal
            isModalOpen={isNewModalOpen}
            closeModal={closeNewModal}
            setShouldRefreshData={setShouldRefreshData}
            roles={roleOptions}
          />
          <EffortMatrixFormModal
            isModalOpen={isEditModalOpen}
            closeModal={closeEditModal}
            setShouldRefreshData={setShouldRefreshData}
            editItem={selectedRow}
            isEdit
          />

          <DeleteConfirmationModal
            isModalOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            deleteItem={`${selectedRow?.id}`}
            setShouldRefreshData={setShouldRefreshData}
            actionUrl="/governance/effortMatrix/:id"
          />
          <Table
            hideCheckbox
            orderBy="role"
            order="asc"
            columns={columnsWithActions}
            items={tableItems}
            fetchData={fetchData}
            isLoading={isLoading}
            totalCount={totalCount}
            newButton={canCreate ? { onClick: openNewModal } : null}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
          />
        </Box>
      )}
    </div>
  )
}

export default EffortMatrix
