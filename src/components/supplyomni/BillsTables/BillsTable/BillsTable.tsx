import { Checkbox } from '@fullscreendigital/carrefour-dex-fe'
import { Box, Grid, Switch } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { Table } from 'components/core-ui/Table'
import { Filter } from 'components/core-ui/Table/TableDefinitions'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { useNotification } from 'hooks'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import SubmitModal from '../SubmitModal/SubmitModal'
import s from './BillsTable.modules.scss'
import { defaultTableFilters, tableColumns } from './constants'
import {
  BillsResponseModel,
  BillsTableProps,
  DeliveryOptionModel,
  RowActionType,
  TableFilters,
  TableRowModel
} from './interaces'
import { toTableRowItems } from './serializer'
import { buildTableFilterInputs } from './utils'

export const BillsTable: React.FC<BillsTableProps> = props => {
  const { urlResource, rowAction } = { ...props }

  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const [tableItems, setTableItems] = useState<TableRowModel[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedRow, setSelectedRow] = useState<TableRowModel>()
  const [tableFilters, setTableFilters] = useState<TableFilters>(defaultTableFilters)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [isPrepareOrderModalOpen, setIsPrepareOrderModalOpen] = useState<boolean>(false)

  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null)
  const [withMyOrders, setWithMyOrders] = useState(null)

  const openPrepareOrderModal = (): void => setIsPrepareOrderModalOpen(true)
  const closePrepareOrderModal = (): void => setIsPrepareOrderModalOpen(false)

  const handleDepartmentFilterChange = (value): void => {
    setSelectedDeliveryOption(value)
    setShouldRefreshData(true)
  }

  const handleWithMyOrdersFilterChange = (value): void => {
    setWithMyOrders(value)
    setShouldRefreshData(true)
  }

  const columnsWithActions = useMemo(() => {
    if (rowAction === RowActionType.PAID) {
      const onPrepareOrder = row => {
        setSelectedRow(row)
        openPrepareOrderModal()
      }
      return [
        ...tableColumns,
        {
          title: 'Pregatita',
          field: 'prepared',
          align: 'left',
          render: row => (
            <Box key={row.id}>
              {row.prepared !== null && (
                <Switch
                  key={row.id}
                  checked={row.prepared}
                  disabled={row.prepared !== false}
                  onChange={() => onPrepareOrder(row)}
                />
              )}
            </Box>
          )
        }
      ]
    } else {
      return tableColumns
    }
  }, [])
  const tableFilterInputs = useMemo(() => buildTableFilterInputs(tableFilters, setTableFilters), [])

  const rowActions = useMemo(() => {
    if (rowAction !== RowActionType.PAID) {
      const selectRow = (rowId: number, action: RowActionType) => {
        const item = tableItems.find(item => item.id === rowId)
        setSelectedRow(item)
        if (action === RowActionType.WITH_INVOICE) {
          navigate(`/supplyOmni/bills/${item.id}`)
        } else if (action === RowActionType.WITHOUT_INVOICE) {
          navigate(`/supplyOmni/receiptClientDetails/${item.clientId}?orderId=${item.id}`)
        }
      }
      const actions = [
        {
          label: rowAction.toString(),
          labelColor: 'white',
          typographyVariant: 'medium',
          backgroundColor: '#0970E6',
          onClick: (e, rowId) => selectRow(rowId, rowAction)
        }
      ]
      return actions
    } else {
      return []
    }
  }, [tableColumns, tableItems])

  const { data: deliveryTypeOptions } = useQuery(
    ['deliveryTypes'],
    async () => {
      const result = (await makeCoreGetRequest(
        '/supply-omni/order/delivery-options'
      )) as DeliveryOptionModel[]
      return result.map(item => ({ label: item.description, value: item.type }))
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

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      let filters: Filter[] = []
      if (withMyOrders) {
        filters = [
          ...filters,
          {
            name: 'myOrders',
            value: String(withMyOrders)
          }
        ]
      }
      if (selectedDeliveryOption) {
        filters = [
          ...filters,
          {
            name: 'deliveryType',
            value: String(selectedDeliveryOption.value)
          }
        ]
      }
      const response = (await makeCoreGetRequest(
        toTableGETUrl({
          url: urlResource,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy,
          filters
        })
      )) as BillsResponseModel
      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <div className={s.mainContainer}>
      <Box>
        <SubmitModal
          isModalOpen={isPrepareOrderModalOpen}
          closeModal={closePrepareOrderModal}
          id={selectedRow?.id}
          setShouldRefreshData={setShouldRefreshData}
        />
        {deliveryTypeOptions && (
          <Grid container>
            <Grid xs={12} md={3} item>
              <Checkbox
                style={{ paddingTop: '0.7rem' }}
                label="Comenzile mele"
                checked={withMyOrders}
                onChange={event => handleWithMyOrdersFilterChange(event.target.checked)}
              />
            </Grid>
            <Grid xs={12} md={3} item>
              <AsyncAutocomplete
                variant="standard"
                name="deliveryTypes"
                label="Tip livrare"
                value={selectedDeliveryOption}
                options={deliveryTypeOptions}
                onChange={handleDepartmentFilterChange}
              />
            </Grid>
          </Grid>
        )}
        <Table
          hideCheckbox
          order="desc"
          orderBy="creationDate"
          columns={columnsWithActions}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          rowActions={rowActions}
          rowActionsWidth="130px"
          filters={tableFilterInputs}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
        />
      </Box>
    </div>
  )
}
