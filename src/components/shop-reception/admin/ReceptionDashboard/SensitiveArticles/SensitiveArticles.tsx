import { columns, drawerFilters } from './helpers'
import { useMemo, useState } from 'react'
import { toTableRowItems } from './serializers'
import s from '../../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { Table } from 'components/core-ui/Table'
import { getRegionTypesOptions, getShopOptions, getShopTypesOptions } from '../../api'
import { useQuery } from 'react-query'
import { DownloadIcon } from 'icons'
import { formatAndDownloadResponse } from 'utils/helpers'

const SensitiveArticles = () => {
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState<UnorderedProducts[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    const hasFilters = tableFilters
      .map(filter => typeof filter.value !== 'undefined' && filter.value?.length > 0)
      .find(item => item === true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: hasFilters
            ? `/shop-reception/sensitiveReport/filter`
            : `/shop-reception/sensitiveReport`,
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
        message: `A aparut o eroare la incarcarea datelor in tabel. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { data: shopTypesOptions } = getShopTypesOptions(showNotification)
  const { data: shopOptions } = getShopOptions(showNotification)
  const { data: regionTypes } = getRegionTypesOptions(showNotification)

  const { data: reportType } = useQuery(
    ['report-type'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/sensitiveReport/reportType')
      const resultOptions = result.map(
        (item): AutocompleteOption => ({
          label: item.sensitiveProductReportTypeValue,
          value: item.sensitiveProductReportType
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea tipurilor de rapoarte. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const filters = useMemo(
    () => drawerFilters(shopTypesOptions, shopOptions, reportType, regionTypes),
    [shopTypesOptions, shopOptions, reportType, regionTypes]
  )

  const exportFile = async (tableState, e) => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: '/shop-reception/sensitiveReport/export',
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
        message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        toolbarActions={
          totalCount > 0
            ? [
                {
                  label: 'Export',
                  icon: <DownloadIcon />,
                  onClick: exportFile
                }
              ]
            : []
        }
        filters={filters}
        filtersLabel="Filtreaza"
        filtersButtonLabel="Filtreaza"
        appliedFiltersLabel="Filtre"
        cancelFiltersButtonLabel="Anuleaza"
        applyFiltersButtonLabel="Aplica"
      />
    </div>
  )
}

export default SensitiveArticles
