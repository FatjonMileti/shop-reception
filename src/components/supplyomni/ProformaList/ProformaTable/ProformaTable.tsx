import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { useNotification } from 'hooks'
import { useMemo, useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import s from './ProformaTable.modules.scss'
import { defaultTableFilters, tableColumns } from './constants'
import {
  ProformaListResponseModel,
  ProformaTableProps,
  TableFilters,
  TableRowModel
} from './interfaces'
import { toTableRowItems } from './serializer'
import { buildTableFilterInputs } from './utils'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Checkbox } from '@fullscreendigital/carrefour-dex-fe'
import { Filter } from 'components/core-ui/Table/TableDefinitions'
import { CancelProformaModal } from './CancelProformaModal'

const ProformaTable: React.FC<ProformaTableProps> = props => {
  const { proformaType } = props

  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const [tableItems, setTableItems] = useState<TableRowModel[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedRow, setSelectedRow] = useState<TableRowModel>()
  const [tableFilters, setTableFilters] = useState<TableFilters>(defaultTableFilters)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [withMyProforma, setWithMyProforma] = useState(true)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false)

  const columnsWithActions = useMemo(() => tableColumns, [])
  const tableFilterInputs = useMemo(() => buildTableFilterInputs(tableFilters, setTableFilters), [])

  const openCancelModal = (): void => setIsCancelModalOpen(true)
  const closeCancelModal = (): void => setIsCancelModalOpen(false)

  const navigateToPrint = (id: number) => {
    navigate(`/supplyOmni/proformaView/${id}`)
  }

  const handleWithMyProformaFilterChange = (value): void => {
    setWithMyProforma(value)
    setShouldRefreshData(true)
  }

  const rowActions = useMemo(() => {
    const selectRow = (rowId: number, action: string) => {
      const item = tableItems.find(item => item.id === rowId)
      setSelectedRow(item)
      action === 'print' ? navigateToPrint(item.id) : openCancelModal()
    }

    const actions = [
      proformaType === 'active' && {
        label: 'Anuleaza',
        labelColor: 'white',
        typographyVariant: 'medium',
        backgroundColor: '#CC4010',
        onClick: (e, rowId) => selectRow(rowId, 'delete')
      },
      {
        label: 'Detalii',
        labelColor: 'white',
        typographyVariant: 'medium',
        backgroundColor: '#0970E6',
        onClick: (e, rowId) => selectRow(rowId, 'print')
      }
    ]

    return actions
  }, [tableColumns, tableItems])

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const extraCustomUrlParams: Filter[] = [
        ...tableFilters,
        { name: 'myProformas', value: String(withMyProforma) }
      ]

      const response = (await makeCoreGetRequest(
        toTableGETUrl({
          url: `/supply-omni/order${proformaType === 'active' ? '/active' : ''}`,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy,
          extraCustomUrlParams
        })
      )) as ProformaListResponseModel
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
        <CancelProformaModal
          isModalOpen={isCancelModalOpen}
          closeModal={closeCancelModal}
          orderId={`${selectedRow?.id}`}
          setShouldRefreshData={setShouldRefreshData}
        />
        <Checkbox
          label="Proformele mele"
          checked={withMyProforma}
          onChange={event => handleWithMyProformaFilterChange(event.target.checked)}
        />
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
          rowActionsWidth="200px"
          filters={tableFilterInputs}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
        />
      </Box>
    </div>
  )
}

export default ProformaTable
