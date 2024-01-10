import { Box, Grid, Switch, FormControlLabel, useMediaQuery } from '@mui/material'
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
import {
  GENERATE_INVOICE_BUTTON_LABEL,
  SHOW_INVOICE_BUTTON_LABEL,
  STORE_DELIVERY_TYPE,
  defaultTableFilters,
  tableColumns
} from './constants'
import {
  BillsResponseModel,
  BillsTableProps,
  DeliveryOptionModel,
  TableType,
  TableFilters,
  TableRowModel
} from './interaces'
import { toTableRowItems } from './serializer'
import { buildTableFilterInputs } from './utils'
import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { InvoiceActionIcon, ViewActionIcon } from 'icons'

export const BillsTable: React.FC<BillsTableProps> = props => {
  const { urlResource, tableType } = props

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
  const [withMyOrders, setWithMyOrders] = useState(true)

  const isXs = useMediaQuery('(max-width:624px)')

  const openPrepareOrderModal = (): void => setIsPrepareOrderModalOpen(true)
  const closePrepareOrderModal = (): void => setIsPrepareOrderModalOpen(false)

  const handleDeliveryOptionFilterChange = (value): void => {
    setSelectedDeliveryOption(value || null)
    setShouldRefreshData(true)
  }

  const handleWithMyOrdersFilterChange = (value): void => {
    setWithMyOrders(value)
    setShouldRefreshData(true)
  }

  const columnsWithActions = useMemo(() => {
    if (tableType === TableType.ALL) {
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
              {row.deliveryType === STORE_DELIVERY_TYPE && (
                <Switch
                  key={row.id}
                  checked={row.prepared}
                  disabled={row.prepared === true}
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
    if (tableType !== TableType.ALL) {
      const selectRow = (rowId: number, action: TableType) => {
        const item = tableItems.find(item => item.id === rowId)
        setSelectedRow(item)
        if (action === TableType.WITH_INVOICE) {
          navigate(`/supplyOmni/bills/${item.id}`)
        } else if (action === TableType.WITHOUT_INVOICE) {
          navigate(`/supplyOmni/receiptClientDetails/${item.clientId}?orderId=${item.id}`)
        }
      }
      const actions = [
        {
          label:
            tableType === TableType.WITH_INVOICE
              ? SHOW_INVOICE_BUTTON_LABEL
              : GENERATE_INVOICE_BUTTON_LABEL,
          labelColor: 'white',
          typographyVariant: 'medium',
          backgroundColor: '#0970E6',
          desktopIcon:
            tableType === TableType.WITH_INVOICE ? <ViewActionIcon /> : <InvoiceActionIcon />,
          onClick: (e, rowId) => selectRow(rowId, tableType)
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
          message: `Eroare la preluarea datelor de optiuni pentru livrare. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      let filters: Filter[] = []
      if (selectedDeliveryOption) {
        filters = [
          {
            name: 'deliveryType',
            value: selectedDeliveryOption.value
          }
        ]
      }

      const response = (await makeCoreGetRequest(
        toTableGETUrl({
          url: urlResource,
          tableFilters,
          extraCustomUrlParams: [{ name: 'myOrders', value: String(withMyOrders) }],
          filters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )) as BillsResponseModel
      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      showNotification({
        message: `Eroare la preluarea datelor pentru tabel. ${formatErrorMessage(error)}`,
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
          <Grid sx={isXs ? {} : { position: 'absolute', width: '55%', zIndex: 3 }} container>
            <Grid xs={12} sm={6} md={6} lg={6} item>
              <FormControlLabel
                name="my_orders"
                label="Comenzile mele"
                sx={{ color: '#052351' }}
                control={
                  <Switch
                    checked={withMyOrders}
                    onChange={event => handleWithMyOrdersFilterChange(event.target.checked)}
                  />
                }
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={6} item>
              <FilterDataSelect
                name="deliveryTypes"
                label="Tip livrare"
                showCounter
                showSearch
                counterLabel="Selecteaza tip livrare"
                noDataFoundLabel="Nici un rezultat"
                options={deliveryTypeOptions}
                onSelect={handleDeliveryOptionFilterChange}
                // clearable
              />
            </Grid>
          </Grid>
        )}
        <Table
          hideCheckbox
          order="desc"
          showCounter={isXs}
          counterLabel={isXs ? 'Total comenzi' : undefined}
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
