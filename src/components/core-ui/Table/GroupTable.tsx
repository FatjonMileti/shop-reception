import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { useImmer } from 'use-immer'
import { Box } from '@mui/material'
import { Table as GeneralTable } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { TableActions } from './TableActions'
import { ModalWithForm } from 'components/core-ui/ModalWithForm'
import { getRenderedColumns, convertFilterSchemaToFilterConfig, renderTableFooter } from './helpers'
import { toTableGETUrl, toTablePOSTPayload } from './serializers'
import { toTableRowItems } from 'utils/serializers'
import { useNotification, usePermissions } from 'hooks'
import debounce from 'lodash.debounce'
import s from './Table.modules.scss'
import { isEmpty } from 'lodash'
import { downloadFile } from 'utils/helpers'
import { DownloadModal } from '../DownloadModal'

const GroupTable = props => {
  const {
    action,
    columns,
    groupCount,
    tableActions,
    tableRowActions,
    tableFooter,
    hasGeneralSearch,
    isUserModal,
    hasInitialFilters,
    extraUrlParams,
    ...rest
  } = props

  let [searchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isDownloadModalOpen, setIsDowloadModalOpen] = useState(false)
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

  const { canCreate, canView, canEdit, canDelete, canCancel } = usePermissions({
    createRoles: tableActions?.newAction?.allowedRoles,
    viewRoles: tableRowActions?.viewAction?.allowedRoles,
    editRoles: tableRowActions?.editAction?.allowedRoles,
    deleteRoles: tableRowActions?.deleteAction?.allowedRoles,
    cancelRoles: tableRowActions?.cancelAction?.allowedRoles
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

  useEffect(() => {
    handleRemoteData(
      tableState.page,
      tableState.rowsPerPage,
      tableState.order,
      tableState.orderBy,
      tableState.searchText,
      tableState.filters
    )
  }, [table.filters])

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
            generalSearchText: table.searchText
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
            generalSearchText: table.searchText
          })
        )
      }

      const newColumns = createDynamicColumns(columns, response.list)
      setDynamicColumns(newColumns)
      setItems(toTableRowItems(response.list, newColumns))
      setTotalCount(response.page.totalCount)
      setSummary(response.summary)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${error.message}`,
        type: 'error'
      })
    }
    setIsLoading(false)
  }

  const createDynamicColumns = (initialColumns, data) => {
    if (!data.length) {
      return initialColumns
    }

    const staticColumns = initialColumns.slice()?.filter(col => !col.isDynamic)
    const groupColumns = initialColumns.slice()?.filter(col => col.isGroup)

    const newColumns = data[0]?.productSlotsSalesDto.flatMap((group, index) =>
      groupColumns.map(column => {
        const { field, title } = column
        return {
          ...column,
          sticky: false,
          collapsible: true,
          minWidth: '200px',
          title: `${group.start} - ${group.end} ${title}`,
          field: `productSlotsSalesDto.[${index}].${field}`
        }
      })
    )

    const dynamicCols = staticColumns.concat(newColumns)
    return dynamicCols
  }

  const debouncedHandleRemoteData = debounce(handleRemoteData, 500)

  const openNewModal = () => setIsNewModalOpen(true)

  const closeNewModal = () => setIsNewModalOpen(false)

  const openDownloadModal = () => setIsDowloadModalOpen(true)

  const closeDownloadModal = () => setIsDowloadModalOpen(false)

  const handleDownload = () => {
    if (tableActions?.downloadAction) {
      const { action, selectColumns } = tableActions.downloadAction
      const { searchText, filters, order, orderBy } = tableState

      const url = toTableGETUrl({
        url: action.url,
        searchText,
        searchFields: tableActions?.searchAction?.searchFields,
        filters,
        tableFilters,
        order,
        orderBy,
        hasGeneralSearch,
        generalSearchText: table.searchText
      })

      downloadFile(url)
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
      {tableActions?.downloadAction?.selectColumns && (
        <DownloadModal
          {...tableActions.downloadAction}
          isModalOpen={isDownloadModalOpen}
          closeModal={closeDownloadModal}
          columns={tableActions.downloadAction.columns}
          extraUrlParams={extraUrlParams}
        />
      )}
      <GeneralTable
        {...rest}
        columns={
          tableRowActions && (canEdit || canDelete || canView || canCancel)
            ? renderedColumns.concat({
                title: '',
                field: 'actions',
                align: 'right',
                width: '112px',
                collapsible: 'true',
                render: row => (
                  <TableActions
                    itemId={row.id}
                    viewAction={tableRowActions.viewAction}
                    editAction={tableRowActions.editAction}
                    deleteAction={tableRowActions.deleteAction}
                    cancelAction={tableRowActions.cancelAction}
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
                    isUserModal={isUserModal}
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
        downloadButton={
          tableActions?.downloadAction?.selectColumns
            ? { onClick: openDownloadModal }
            : tableActions?.downloadAction
            ? { onClick: handleDownload }
            : null
        }
        hasSearchInput={!!tableActions?.searchAction}
        handleRemoteData={debouncedHandleRemoteData}
        filters={filtersConfig}
      />
      {tableFooter && <div style={{ textAlign: 'right' }}>{tableFooterComponent}</div>}
    </Box>
  )
}

export default GroupTable
