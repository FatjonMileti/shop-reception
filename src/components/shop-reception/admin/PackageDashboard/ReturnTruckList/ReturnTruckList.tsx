import { useMemo, useState } from 'react'
import { useNotification } from 'hooks'
import { Table } from 'components/core-ui/Table'
import { getColumns, getFilters } from './helpers'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { DownloadIcon, ViewActionIcon } from 'icons'
import { formatAndDownloadResponse, handleQueryError } from 'utils/helpers'
import s from '../../../commonStyles.modules.scss'
import {
  getDepositOptions,
  getParentSocietyOptions,
  getShopOptions,
  getHubOptions,
  getReturnTruckTypesOptions,
  getReturnTruckStatusOptions
} from '../../api'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

const ReturnTruckList = () => {
  const [tableItems, setTableItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const navigate = useNavigate()

  const { data: shopOptions } = getShopOptions(showNotification)
  const { data: hubOptions } = getHubOptions(showNotification)
  const { data: despositOptions } = getDepositOptions(showNotification)
  const { data: returnTruckTypesOptions } = getReturnTruckTypesOptions(showNotification)
  const { data: returnTruckStatusOptions } = getReturnTruckStatusOptions(showNotification)
  const { data: parentSocietyOptions } = getParentSocietyOptions(showNotification)

  const filters = useMemo(
    () =>
      getFilters({
        shopOptions,
        hubOptions,
        despositOptions,
        returnTruckTypesOptions,
        returnTruckStatusOptions,
        parentSocietyOptions
      }),
    [
      shopOptions,
      hubOptions,
      despositOptions,
      returnTruckTypesOptions,
      returnTruckStatusOptions,
      parentSocietyOptions
    ]
  )

  const download = async id => {
    try {
      const response = await makeCoreGetFileRequest(`/shop-reception/return-trucks/${id}/print`, {
        responseType: 'blob'
      })

      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la printare. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const columns = useMemo(() => getColumns(download), [])

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/return-trucks',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )
      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page?.totalCount || 0)
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
      url: '/shop-reception/return-trucks/export',
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
              navigate(`/shop-reception/package/trucksReturn/${rowId}`)
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
    </div>
  )
}

export default ReturnTruckList
