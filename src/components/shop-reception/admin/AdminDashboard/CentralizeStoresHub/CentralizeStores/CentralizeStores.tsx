import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { makeCoreGetRequest } from 'utils/api'
import { Table } from 'components/core-ui/Table'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditActionIcon } from 'icons'
import { useQuery } from 'react-query'
import EditStore from './EditStore/EditStore'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'

const CentralizeStores = () => {
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [selectedRow, setSelectedRow] = useState<DLCProducts>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const openUpdateModal = () => setIsOpen(true)
  const closeUpdateModal = () => setIsOpen(false)

  const selectRow = (rowId: number | string) => {
    const row = tableItems.find(item => item.id === rowId)
    if (row) setSelectedRow(row)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/delivery-matrix/shops',
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
        message: `A aparut o eroare la obtinerea datelor din tabel. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { data: shopCodes, isLoading: isShopCodesLoading } = useQuery(
    ['shop-codes'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/shops/codes`)
      return data.list.map(item => ({
        label: item.displayName,
        value: item.code
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

  const { data: depositOptions, isLoading: isDepositOptionsLoading } = useQuery(
    ['deposits'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/deposits/accessible`)
      return data.map(item => ({
        label: item.displayName,
        value: item.id
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea tipurilor de depozite. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const { data: hubsOptions, isLoading: isHubsOptionsLoading } = useQuery(
    ['hubs'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/hubs/accessible`)
      return data.map(item => ({
        label: item.displayName,
        value: item.id
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea huburilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <>
      <EditStore
        isOpen={isOpen}
        closeModal={closeUpdateModal}
        setShouldRefreshData={setShouldRefreshData}
        editItem={selectedRow}
      />

      <Table
        hideCheckbox
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        rowActions={[
          {
            label: 'Show',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <EditActionIcon />,
            onClick: (e, rowId) => {
              selectRow(rowId)
              openUpdateModal()
            }
          }
        ]}
        rowActionsWidth="130px"
        filters={drawerFilters(shopCodes, depositOptions, hubsOptions)}
        filtersButtonLabel="Filtre"
        filtersLabel="Filtre"
        appliedFiltersLabel="Filtre aplicate"
        cancelFiltersButtonLabel="Anuleaza"
        applyFiltersButtonLabel="Aplica"
      />
    </>
  )
}

export default CentralizeStores
