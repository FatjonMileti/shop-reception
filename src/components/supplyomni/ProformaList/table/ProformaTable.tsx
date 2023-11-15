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
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'
import { useNavigate } from 'react-router-dom'

export const ProformaTable: React.FC<ProformaTableProps> = props => {
  const { proformaType } = props

  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const [tableState, setTableState] = useState({
    order: null,
    orderBy: null,
    tableFilters: null
  })
  const [tableItems, setTableItems] = useState<TableRowModel[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedRow, setSelectedRow] = useState<TableRowModel>()
  const [tableFilters, setTableFilters] = useState<TableFilters>(defaultTableFilters)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const columnsWithActions = useMemo(() => tableColumns, [])
  const tableFilterInputs = useMemo(() => buildTableFilterInputs(tableFilters, setTableFilters), [])

  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const navigateToPrint = () => {
    navigate(`/supplyOmni/proformaPrint`)
  }

  const rowActions = useMemo(() => {
    const selectRow = (rowId: number, action: string) => {
      const item = tableItems.find(item => item.id === rowId)
      setSelectedRow(item)
      action === 'print' ? navigateToPrint() : openDeleteModal()
    }

    const actions = [
      proformaType === 'active' && {
        label: 'Sterge',
        labelColor: 'white',
        typographyVariant: 'medium',
        backgroundColor: '#CC4010',
        onClick: (e, rowId) => selectRow(rowId, 'delete')
      },
      {
        label: 'Printare',
        labelColor: 'white',
        typographyVariant: 'medium',
        backgroundColor: '#0970E6',
        onClick: (e, rowId) => selectRow(rowId, 'edit')
      }
    ]

    return actions
  }, [tableColumns, tableItems])

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      tableFilters
      const response = (await makeCoreGetRequest(
        toTableGETUrl({
          url: `/supply-omni/order${proformaType === 'active' ? '/active' : ''}`,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )) as ProformaListResponseModel
      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
      setTableState({ order, orderBy, tableFilters })
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
        <DeleteConfirmationModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          actionUrl="/supply-omni/order/:id"
          itemId={`${selectedRow?.proformaId}`}
          content={<Typography>Are you sure you want to delete this entry?</Typography>}
          setShouldRefreshData={setShouldRefreshData}
        />
        <Table
          hideCheckbox
          order="desc"
          orderBy="orderCreationDate"
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
