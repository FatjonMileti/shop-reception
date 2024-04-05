import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { ScanTypeForm } from './ScanTypeForm'
import { useQuery } from 'react-query'
import s from '../../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { Table } from 'components/core-ui/Table'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { AddActionIcon, DeleteActionIcon, EditActionIcon } from 'icons'
import { DeleteConfirmationModal } from 'components/core-ui/DeleteConfirmationModal'
import { Typography } from '@mui/material'

const ManageScanTypes = () => {
  const { showNotification } = useNotification()

  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [tableItems, setTableItems] = useState<ScanType[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [selectedRow, setSelectedRow] = useState<ScanType>()
  const selectRow = (rowId: number | string) => {
    const row = tableItems.find(item => item.id === rowId)
    row && setSelectedRow(row)
  }
  const [createUpdateModal, setCreateUpdateModal] = useState<string>(null)
  const openCreateModal = (): void => setCreateUpdateModal('create')
  const openUpdateModal = (): void => setCreateUpdateModal('update')
  const closeCreateUpdateModal = (): void => setCreateUpdateModal(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/scan-types',
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

  const { data: shopTypes } = useQuery(
    ['shop-types'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/products/types`)
      return data.map(item => ({
        label: item,
        value: item
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea tipurilor de magazine. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const { data: ruleTypes } = useQuery(
    ['rule-types'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/scan-types/rule-organisation-types`)
      return data.map(item => ({
        label: item.value,
        value: item.key
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea regiunilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: scanTypes } = useQuery(
    ['scan-types'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/scan-types/types`)
      return data.map(item => ({
        label: item.value,
        value: item.key
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea tipurilor de scanare. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <div className={s.mainContainer}>
      <ScanTypeForm
        isModalOpen={createUpdateModal === 'create'}
        closeModal={closeCreateUpdateModal}
        setShouldRefreshData={setShouldRefreshData}
        ruleTypes={ruleTypes}
        scanTypes={scanTypes}
      />
      <ScanTypeForm
        isModalOpen={createUpdateModal === 'update'}
        closeModal={closeCreateUpdateModal}
        setShouldRefreshData={setShouldRefreshData}
        editItem={selectedRow}
        isEdit
        ruleTypes={ruleTypes}
        scanTypes={scanTypes}
      />
      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        actionUrl="/shop-reception/scan-types/:id"
        itemId={`${selectedRow?.id}`}
        content={<Typography>Esti sigur va vrei sa stergi acest produs?</Typography>}
        setShouldRefreshData={setShouldRefreshData}
      />
      <Table
        hideCheckbox
        orderBy="role"
        order="asc"
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        filters={drawerFilters(shopTypes, [], scanTypes)}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        rowActions={[
          {
            label: 'Edit',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <EditActionIcon />,
            onClick: (e, rowId) => {
              selectRow(rowId)
              openUpdateModal()
            }
          },
          {
            label: 'Delete',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <DeleteActionIcon />,
            onClick: (e, rowId) => {
              selectRow(rowId)
              openDeleteModal()
            }
          }
        ]}
        rowActionsWidth="130px"
        toolbarActions={[
          {
            label: 'Produse sensibile',
            icon: <AddActionIcon />,
            onClick: openCreateModal
          }
        ]}
      />
    </div>
  )
}

export default ManageScanTypes
