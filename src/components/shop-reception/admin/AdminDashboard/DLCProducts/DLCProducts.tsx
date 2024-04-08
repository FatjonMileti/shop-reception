import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNotification } from 'hooks'
import { Table } from 'components/core-ui/Table'
import { AddActionIcon, DeleteActionIcon, EditActionIcon } from 'icons'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { columns, drawerFilters } from './helpers'
import { toTableRowItems } from './serializers'
import { DLCProductsForm } from './DLCProductsForm'
import { ImportProductsForm } from './ImportProductsForm'
import s from '../../../commonStyles.modules.scss'
import { DeleteConfirmationModal } from 'components/core-ui/DeleteConfirmationModal'
import { Typography } from '@mui/material'

const DLCProducts = () => {
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState<DLCProducts[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<DLCProducts>()

  const [createUpdateModal, setCreateUpdateModal] = useState<string>(null)
  const openCreateModal = (): void => setCreateUpdateModal('create')
  const openUpdateModal = (): void => setCreateUpdateModal('update')
  const closeCreateUpdateModal = (): void => setCreateUpdateModal(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const [isImportProductsModalOpen, setIsImportProductsModalOpen] = useState<boolean>(false)
  const openImportProductsModal = (): void => setIsImportProductsModalOpen(true)
  const closeImportProductsModal = (): void => setIsImportProductsModalOpen(false)

  const selectRow = (rowId: number | string) => {
    const row = tableItems.find(item => item.id === rowId)
    if (row) setSelectedRow(row)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/short-dlc',
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

  const { data: metiRayons } = useQuery(
    ['meti-rayons'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/products/meti-rayons`)
      return data.map(item => ({
        label: item.displayValue,
        value: item.code
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea raioanelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: metiFamilies } = useQuery(
    ['meti-families'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/products/meti-families`)
      return data.map(item => ({
        label: item.displayValue,
        value: item.code
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea familiilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: metiSubfamilies } = useQuery(
    ['meti-subfamilies'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/products/meti-sub-families`)
      return data.map(item => ({
        label: item.displayValue,
        value: item.code
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea subfamiliilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: metiUB } = useQuery(
    ['meti-ub'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/products/meti-ubs`)
      return data.map(item => ({
        label: item.displayValue,
        value: item.code
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea codurilor UB. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <div className={s.mainContainer}>
      <ImportProductsForm
        isModalOpen={isImportProductsModalOpen}
        closeModal={closeImportProductsModal}
        setShouldRefreshData={setShouldRefreshData}
        shopTypes={shopTypes}
      />
      <DLCProductsForm
        isOpen={createUpdateModal === 'create'}
        closeModal={closeCreateUpdateModal}
        setShouldRefreshData={setShouldRefreshData}
        shopTypes={shopTypes}
        metiRayons={metiRayons}
        metiFamilies={metiFamilies}
        metiSubfamilies={metiSubfamilies}
        metiUB={metiUB}
      />
      <DLCProductsForm
        isOpen={createUpdateModal === 'update'}
        closeModal={closeCreateUpdateModal}
        setShouldRefreshData={setShouldRefreshData}
        shopTypes={shopTypes}
        metiRayons={metiRayons}
        metiFamilies={metiFamilies}
        metiSubfamilies={metiSubfamilies}
        metiUB={metiUB}
        editItem={selectedRow}
        isEdit
      />
      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        actionUrl="/shop-reception/sensitives/:id"
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
        filters={drawerFilters(shopTypes, metiRayons, metiFamilies, metiSubfamilies, metiUB)}
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
            label: 'Importǎ produse DLC scurt',
            icon: <AddActionIcon />,
            onClick: openImportProductsModal
          },
          {
            label: 'Produse DLC scurt',
            icon: <AddActionIcon />,
            onClick: openCreateModal
          }
        ]}
      />
    </div>
  )
}

export default DLCProducts
