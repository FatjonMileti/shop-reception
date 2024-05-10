import { useMemo, useState } from 'react'
import { getColumns, getFilters, roles } from './helpers'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { useNotification, usePermissions } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { Table } from 'components/core-ui/Table'
import { useQuery } from 'react-query'
import { formatAndDownloadResponse } from 'utils/helpers'
import { DownloadIcon, ViewActionIcon } from 'icons'
import { useNavigate } from 'react-router-dom'

const InProgressTasks = () => {
  const [tableItems, setTableItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const navigate = useNavigate()

  const { canView } = usePermissions(roles)

  const columns = useMemo(() => getColumns(canView), [])

  const { data: depositOptions } = useQuery(
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
          message: `A apărut o eroare la obtinerea depozitelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: shopOptions } = useQuery(
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
          message: `A aparut o eroare la obtinerea magazinelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: parentSocietyOptions } = useQuery(
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
          message: `A aparut o eroare la obtinerea societatilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: hubOptions } = useQuery(
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

  const filters = useMemo(
    () =>
      getFilters(
        depositOptions || [],
        hubOptions || [],
        shopOptions || [],
        parentSocietyOptions || []
      ),
    [depositOptions, hubOptions, shopOptions, parentSocietyOptions]
  )

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/return-litigation/in_progress',
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

  const exportFile = async (tableState, e) => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: '/shop-reception/return-litigation/in_progress/export',
      tableFilters: filters,
      order,
      orderBy
    })

    try {
      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `Error while download file. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Table
      hideCheckbox
      columns={columns}
      items={tableItems}
      fetchData={fetchData}
      isLoading={isLoading}
      totalCount={totalCount}
      shouldRefreshData={shouldRefreshData}
      setShouldRefreshData={setShouldRefreshData}
      toolbarActions={[
        {
          label: 'Export',
          icon: <DownloadIcon />,
          onClick: exportFile
        }
      ]}
      rowActions={[
        {
          label: 'Detalii',
          labelColor: 'white',
          typographyVariant: 'medium',
          backgroundColor: '#16a085',
          desktopIcon: <ViewActionIcon />,
          onClick: (e, rowId) => {
            navigate(`/shop-reception/package/storeReturnsDisputes/${rowId}`)
          }
        }
      ]}
      rowActionsWidth="130px"
      filters={filters}
      filtersButtonLabel="Filtre"
      filtersLabel="Filtre"
      appliedFiltersLabel="Filtre aplicate"
      cancelFiltersButtonLabel="Anuleaza"
      applyFiltersButtonLabel="Aplica"
    />
  )
}

export default InProgressTasks
