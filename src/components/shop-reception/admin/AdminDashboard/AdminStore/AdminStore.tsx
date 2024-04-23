import { columns, drawerFilters } from './helpers'
import { Add as AddIcon } from '@mui/icons-material'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { AdminStoreForm } from './AdminStoreForm'
import s from '../../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { Table } from 'components/core-ui/Table'
import { EditActionIcon } from 'icons'
import { useQuery } from 'react-query'
import { AutocompleteOption } from 'components/volumetry/interfaces'
import StoreIntervalModal from './StoreIntervalModal/StoreIntervalModal'

const AdminStore = () => {
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState<AdminStore[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<AdminStore>()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [modal, setModal] = useState(null)
  const openModal = (action): void => setModal(action)
  const closeModal = () => setModal(null)

  const selectRow = (rowId: number | string) => {
    const row = tableItems.find(item => item.id === rowId)
    row && setSelectedRow(row)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/shops',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const responseList = response.list

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

  const { data: shopCodes } = useQuery(
    ['shop-codes'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/shops/codes')

      const resultOptions = result.list.map(
        (item: any): AutocompleteOption => ({
          label: item.displayName,
          value: item.code
        })
      )

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching shop codes dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: metiShops } = useQuery(
    ['meti-shops'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/shops/meti')

      const resultOptions = result.map(
        (item: any): AutocompleteOption => ({
          label: item.displayName,
          value: item.code
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching shops dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: metiVersions } = useQuery(
    ['meti-versions'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/shops/meti-version')
      const resultOptions = result.map(
        (item: string): AutocompleteOption => ({
          label: item,
          value: item
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching versions dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: shopTypes } = useQuery(
    ['meti-types'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/products/types')
      const resultOptions = result.map(
        (item): AutocompleteOption => ({
          label: item.value,
          value: item.key
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching shop types dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: parentSocieties } = useQuery(
    ['parent-societies'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/shops/parent-society')
      const resultOptions = result.map(
        (item: string): AutocompleteOption => ({
          label: item,
          value: item
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching parent societies dropdown data. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <div className={s.mainContainer}>
      <AdminStoreForm
        isOpen={modal === 'create'}
        closeModal={closeModal}
        shopCodes={shopCodes}
        metiVersions={metiVersions}
        parentSocieties={parentSocieties}
        metiShops={metiShops}
      />
      <AdminStoreForm
        isOpen={modal === 'update'}
        closeModal={closeModal}
        editItem={selectedRow}
        isEdit
        shopCodes={shopCodes}
        metiVersions={metiVersions}
        parentSocieties={parentSocieties}
        metiShops={metiShops}
      />

      <StoreIntervalModal
        isOpen={modal === 'interval'}
        closeModal={closeModal}
        item={selectedRow}
      />
      <Table
        hideCheckbox
        orderBy="code"
        order="asc"
        columns={columns(setModal, selectRow)}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        rowActions={[
          {
            label: 'Edit',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <EditActionIcon />,
            onClick: (_, rowId) => {
              selectRow(rowId)
              setModal('update')
            }
          }
        ]}
        rowActionsWidth="130px"
        toolbarActions={[
          {
            label: 'Magazin',
            icon: <AddIcon />,
            onClick: () => openModal('create')
          }
        ]}
        filters={drawerFilters(shopCodes, metiShops, metiVersions, shopTypes, parentSocieties)}
        filtersButtonLabel="Filtre"
        filtersLabel="Filtre"
        appliedFiltersLabel="Filtre aplicate"
        cancelFiltersButtonLabel="Anuleaza"
        applyFiltersButtonLabel="Aplica"

      />
    </div>
  )
}

export default AdminStore
