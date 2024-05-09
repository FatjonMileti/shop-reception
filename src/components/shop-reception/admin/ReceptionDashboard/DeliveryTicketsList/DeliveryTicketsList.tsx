import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../constants'
import s from '../../../commonStyles.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { Table } from 'components/core-ui/Table'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { ViewActionIcon } from 'icons'
import { DeliveryTicket } from './interfaces'
import { useQuery } from 'react-query'

const DeliveryTicketsList = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<DeliveryTicket[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/deliveryTicket',
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

  const { data: statusOptions, isLoading: isStatusOptionsLoading } = useQuery(
    ['status'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/deliveryTicket/statuses`)
      return data.map(item => ({
        label: item.deliveryTicketStatusValue,
        value: item.deliveryTicketStatus
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea statusurilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

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
        rowActions={[
          {
            label: 'Show',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <ViewActionIcon />,
            onClick: (_e, rowId) => {
              navigate(URLS.AUTH_DELIVERY_SLIP.replace(':id', rowId))
            }
          }
        ]}
        rowActionsWidth="130px"
        filters={drawerFilters(shopCodes, depositOptions, statusOptions)}
      />
    </div>
  )
}

export default DeliveryTicketsList
