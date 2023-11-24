import { Table as GeneralTable, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Box, debounce } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useImmer } from 'use-immer'
import { toDynamicTableItems, toTableRowItems } from 'utils/serializers'
import { PrintModal } from '../PrintModal'
import { createDynamicColumns } from './helpers'
const GroupTable = props => {
  const {
    columns,
    items,
    isLoading,
    fetchData,
    totalCount,
    shouldRefreshData,
    setShouldRefreshData,
    showAbbrev,
    printUrl,
    ...rest
  } = props
  const [tableState, setTableState] = useImmer(
    window.history.state.tableState || {
      page: 0,
      rowsPerPage: rest.rowsPerPage ?? 25,
      order: rest.order ?? '',
      orderBy: rest.orderBy ?? '',
      searchText: '',
      filters: rest.tableFilters || []
    }
  )
    console.log('tableState',tableState);
    console.log('rest',rest);
    console.log('window histoy',window.history.state);
  const [dynamicColumns, setDynamicColumns] = useState([])
  const [dynamicItems, setDynamicItems] = useState([])
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false)
  const openPrintModal = (): void => setIsPrintModalOpen(true)
  const closePrintModal = (): void => setIsPrintModalOpen(false)
  useEffect(() => {
    ;(async () => {
      if (shouldRefreshData) {
        const { page, rowsPerPage, order, orderBy, searchText, filters } = tableState
        await handleRemoteData(page, rowsPerPage, order, orderBy, searchText, filters)
        setShouldRefreshData(false)
      }
    })()
  }, [shouldRefreshData, window.history.state.tableState])
  const handleRemoteData = async (page, rowsPerPage, order, orderBy, searchText, filters) => {
    const response = await fetchData({
      page,
      rowsPerPage,
      order,
      orderBy,
      tableFilters: filters,
      searchText
    })
    const newDynamicColumns = createDynamicColumns(columns, response.list)
    setDynamicColumns(newDynamicColumns)
    setDynamicItems(toTableRowItems(toDynamicTableItems(response.list), newDynamicColumns))
  }
  const filters = rest.tableFilters || window.history.state?.tableState?.filters || []

  const tableFilters = useMemo(
    () =>
      Object.keys(filters).map(key => ({
        name: filters[key].name,
        value: filters[key]?.value ?? filters
      })) || [],
    [filters]
  )
  const toolbarActions = !props.hasPrintAction
    ? props.toolbarActions
    : props.toolbarActions.map(action =>
        action.label === 'Printeaza' ? { ...action, onClick: () => openPrintModal() } : action
      )
  return (
    <>
      {showAbbrev && (
        <Box>
          <Typography variant="regular" style={{ color: 'black', fontSize: '12px' }}>
            <pre>
              CP = cantitati propuse
              <br />
              MV = medie vanzari
              <br />
              CM = cantitati modificate
            </pre>
          </Typography>
        </Box>
      )}
      <GeneralTable
        {...rest}
        columns={dynamicColumns}
        rows={dynamicItems}
        isLoading={isLoading}
        handleRemoteData={debounce(handleRemoteData, 500)}
        totalCount={totalCount}
        isRemote
        toolbarActions={toolbarActions}
        hasCustomPagination
      />
      <PrintModal
        {...tableState}
        tableFilters={tableFilters}
        url={printUrl}
        dynamicColumns={dynamicColumns}
        isModalOpen={isPrintModalOpen}
        closeModal={closePrintModal}
        toolbarActions={toolbarActions}
      />
    </>
  )
}
export default GroupTable














