import { Table } from '../../../../core-ui/Table'
import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../constants'
import s from '../../../commonStyles.modules.scss'

const DeliverySlipsList = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<DeliverySlip[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/deliveryTicket',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page)
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
      <Table
        hideCheckbox
        orderBy="shopCode"
        order="asc"
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
            onClick: (e, rowId) => {
              navigate(URLS.AUTH_DELIVERY_SLIP.replace(':id', rowId))
            }
          }
        ]}
        rowActionsWidth="130px"
        filters={drawerFilters}
      />
    </div>
  )
}

export default DeliverySlipsList
