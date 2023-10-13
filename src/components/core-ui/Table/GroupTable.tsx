import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { useImmer } from 'use-immer'
import { Box } from '@mui/material'
import { Table as GeneralTable } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetFileRequest, makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { TableActions } from '../Table/TableActions'
import { ModalWithForm } from 'components/core-ui/ModalWithForm'
import {
  getRenderedColumns,
  convertFilterSchemaToFilterConfig,
  renderTableFooter
} from '../Table/helpers'
import { toTableGETUrl, toTablePOSTPayload } from '../Table/serializers'
import { toDynamicTableItems, toTableRowItems } from 'utils/serializers'
import { useNotification, usePermissions } from 'hooks'
import debounce from 'lodash.debounce'
import s from '../Table/Table.modules.scss'
import { isEmpty } from 'lodash'
import { formatAndDownloadResponse } from 'utils/helpers'
import PrintModal from '../PrintModal/PrintModal'
import { formatErrorMessage } from 'utils/formatting'

const GroupTable = props => {
  const {
    action,
    columns,
    tableActions,
    tableRowActions,
    tableFooter,
    hasGeneralSearch,
    hasInitialFilters,
    extraUrlParams,
    extraCustomUrlParams,
    userModal,
    ...rest
  } = props

  let [searchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)
  const [summary, setSummary] = useState({})
  const [dynamicColumns, setDynamicColumns] = useState([])

  const [tableState, setTableState] = useImmer({
    page: 0,
    rowsPerPage: rest.rowsPerPage ?? 10,
    order: rest.order ?? 'asc',
    orderBy: rest.orderBy ?? '',
    searchText: '',
    filters: []
  })

  const table = useSelector((state: RootState) => state.table)

  const { showNotification } = useNotification()

  const { canCreate, canView, canEdit, canDelete, canCancel, canSeeCustomAction } = usePermissions({
    createRoles: tableActions?.newAction?.allowedRoles,
    viewRoles: tableRowActions?.viewAction?.allowedRoles,
    editRoles: tableRowActions?.editAction?.allowedRoles,
    deleteRoles: tableRowActions?.deleteAction?.allowedRoles,
    cancelRoles: tableRowActions?.cancelAction?.allowedRoles,
    customActionRoles: tableRowActions?.customAction?.allowedRoles
  })

  const filtersConfig = useMemo(() => {
    if (!tableActions?.filters) return []

    let params = {}

    for (let entry of searchParams.entries()) {
      const [name, value] = entry
      params[name] = value
    }
    return (
      tableActions?.filters.map(filter => convertFilterSchemaToFilterConfig(filter, params)) ?? []
    )
  }, [tableActions?.filters])

  const renderedColumns = useMemo(
    () => getRenderedColumns(dynamicColumns.length ? dynamicColumns : columns, tableState.filters),
    [columns, dynamicColumns, tableState.filters]
  )

  const tableFooterComponent = useMemo(
    () => tableFooter && renderTableFooter(tableFooter, summary),
    [tableFooter, summary]
  )

  const [isTableLoaded, setIsTableLoaded] = useState(false)

  useEffect(() => {
    if (isTableLoaded) {
      handleRemoteData(
        tableState.page,
        tableState.rowsPerPage,
        tableState.order,
        tableState.orderBy,
        tableState.searchText,
        tableState.filters
      )
    }
  }, [extraUrlParams, extraCustomUrlParams])

  const tableFilters = useMemo(
    () =>
      Object.keys(table.filters).map(key => ({
        name: key,
        value: table.filters[key]?.value ?? table.filters[key]
      })) || [],
    [table.filters]
  )

  const handleRemoteData = async (page, rowsPerPage, order, orderBy, searchText, filters) => {
    setTableState({
      page,
      rowsPerPage,
      order,
      orderBy,
      searchText,
      filters
    })

    if (hasInitialFilters && isEmpty(table.filters)) {
      return null
    }

    const url = action.url

    setIsLoading(true)
    try {
      let response
      if (action.type === 'GET') {
        response = await makeCoreGetRequest(
          toTableGETUrl({
            url,
            searchText,
            searchFields: tableActions?.searchAction?.searchFields,
            filters,
            tableFilters,
            page,
            rowsPerPage,
            order,
            orderBy,
            hasGeneralSearch,
            generalSearchText: table.searchText,
            extraUrlParams,
            extraCustomUrlParams
          })
        )
      }
      if (action.type === 'POST') {
        response = await makeCorePostRequest(
          url,
          toTablePOSTPayload({
            page,
            rowsPerPage,
            order,
            orderBy,
            searchText,
            searchFields: tableActions.searchAction?.searchFields,
            filters,
            tableFilters,
            hasGeneralSearch,
            generalSearchText: table.searchText,
            extraUrlParams,
            extraCustomUrlParams
          })
        )
      }

      const newColumns = createDynamicColumns(columns, response.list)
      setDynamicColumns(newColumns)
      setItems(toTableRowItems(toDynamicTableItems(response.list), newColumns))
      setTotalCount(response.page.totalCount)
      setSummary(response.summary)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }

    setIsTableLoaded(true)
    setIsLoading(false)
  }

  const createDynamicColumns = (initialColumns, data) => {
    if (!data.length) {
      return initialColumns
    }

    const staticColumns = initialColumns.filter(col => !col.isGroup)
    const groupCols = initialColumns.filter(col => col.isGroup)
    const groupIndex = initialColumns.findIndex(col => col.isGroup)

    if(!groupCols.length){
      return staticColumns
    }

    const populated = data.find(item => item.list.length)

    if(!populated){
      return initialColumns
    }

    const newColumns = populated.list?.flatMap((interval, index) =>
      groupCols.map(col => {
        const additionalName = groupCols?.length === 1 ? '' : col.title

        return (
          {
            ...col,
            start: interval.start.slice(0, -3),
            end: interval.end.slice(0, -3),
            title: `${interval.start.slice(0, -3)} - ${interval.end.slice(
              0,
              -3
            )} ${additionalName}`,
            field: `list.${interval.name}.${col.field}`,
            disableSorting: true
          } || []
        )
      })
    )

    const orderdCols = newColumns.sort((col1, col2) =>
      col1.start.localeCompare(col2.start, undefined, { numeric: true })
    )

    let dynamicCols = staticColumns
    dynamicCols.splice(groupIndex, 0, ...orderdCols)

    return dynamicCols
  }

  const debouncedHandleRemoteData = debounce(handleRemoteData, 500)

  const openNewModal = () => setIsNewModalOpen(true)

  const closeNewModal = () => setIsNewModalOpen(false)

  const openPrintModal = () => setIsPrintModalOpen(true)

  const closePrintModal = () => setIsPrintModalOpen(false)

  const handleDownload = async () => {
    if (tableActions?.downloadAction) {
      const { action } = tableActions?.downloadAction
      const { searchText, filters, order, orderBy } = tableState

      try {
        const url = toTableGETUrl({
          url: action.url,
          searchText,
          searchFields: tableActions?.searchAction?.searchFields,
          filters,
          tableFilters,
          order,
          orderBy,
          hasGeneralSearch,
          generalSearchText: table.searchText,
          extraUrlParams,
          extraCustomUrlParams
        })

        const response = await makeCoreGetFileRequest(url, {
          responseType: 'blob'
        })

        formatAndDownloadResponse(response)
      } catch (error) {
        showNotification({
          message: `Error while fetching table data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  }

  return hasGeneralSearch && !table.searchText.length ? null : (
    <Box className={s.tableContainer}>
      {tableActions?.newAction && canCreate && (
        <ModalWithForm
          {...tableActions.newAction}
          additionalAction={() =>
            handleRemoteData(
              tableState.page,
              tableState.rowsPerPage,
              tableState.order,
              tableState.orderBy,
              tableState.searchText,
              tableState.filters
            )
          }
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
        />
      )}
      {tableActions?.printAction?.selectColumns && (
        <PrintModal
          {...tableActions.printAction}
          {...tableState}
          tableFilters={tableFilters}
          url={tableActions.printAction.action.url}
          dynamicColumns={dynamicColumns}
          isModalOpen={isPrintModalOpen}
          closeModal={closePrintModal}
          extraUrlParams={extraUrlParams}
        />
      )}
      <GeneralTable
        {...rest}
        columns={
          tableRowActions && (canEdit || canDelete || canView || canCancel || canSeeCustomAction)
            ? renderedColumns.concat({
                title: '',
                field: 'actions',
                align: 'right',
                width: '112px',
                collapsible: 'true',
                render: row => (
                  <TableActions
                    itemId={row.id}
                    row={row}
                    viewAction={tableRowActions.viewAction}
                    editAction={tableRowActions.editAction}
                    deleteAction={tableRowActions.deleteAction}
                    cancelAction={tableRowActions.cancelAction}
                    customAction={tableRowActions.customAction}
                    additionalAction={() =>
                      handleRemoteData(
                        tableState.page,
                        tableState.rowsPerPage,
                        tableState.order,
                        tableState.orderBy,
                        tableState.searchText,
                        tableState.filters
                      )
                    }
                    canView={canView}
                    canEdit={canEdit}
                    canDelete={canDelete}
                    canCancel={canCancel}
                    canSeeCustomAction={canSeeCustomAction}
                    userModal={userModal}
                  />
                )
              })
            : renderedColumns
        }
        rows={items}
        isLoading={isLoading}
        totalCount={totalCount}
        rowsPerPage={rest.rowsPerPage || 10}
        isRemote
        newButton={
          tableActions?.newAction && canCreate
            ? { isFloatingButton: tableActions.newAction.isFloatingButton, onClick: openNewModal }
            : null
        }
        downloadButton={tableActions?.downloadAction && { onClick: handleDownload }}
        printButton={tableActions?.printAction && { onClick: openPrintModal }}
        hasSearchInput={!!tableActions?.searchAction}
        handleRemoteData={debouncedHandleRemoteData}
        filters={filtersConfig}
        classes={{ headerClass: s.printPreviewHeader, rowClass: s.printPreviewRow }}
      />
      {tableFooter && <div style={{ textAlign: 'right' }}>{tableFooterComponent}</div>}
    </Box>
  )
}

export default GroupTable
