import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { useImmer } from 'use-immer'
import { Box } from '@mui/material'
import { Table as GeneralTable } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { TableActions } from './TableActions'
import { ModalWithForm } from 'components/core-ui/ModalWithForm'
import {
  getRenderedColumns,
  convertFilterSchemaToFilterConfig,
  download,
  renderTableFooter
} from './helpers'
import { toTableGETUrl, toTablePOSTPayload } from './serializers'
import { toTableRowItems } from 'utils/serializers'
import { useNotification, usePermissions } from 'hooks'
import debounce from 'lodash.debounce'
import s from './Table.modules.scss'
import { isEmpty } from 'lodash'
import { ConfirmationModal } from 'components/core-ui/ConfirmationModal'
import cn from 'classnames'

const Table = props => {
  const {
    action,
    columns,
    tableActions,
    tableRowActions,
    tableFooter,
    generalSearch,
    isUserModal,
    hasInitialFilters,
    ...rest
  } = props

  let [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [summary, setSummary] = useState({})
  const [isNoGeneralSearchConfirmModalOpen, setIsNoGeneralSearchConfirmModalOpen] = useState(false)

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

  const navigate = useNavigate()

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
    () => getRenderedColumns(columns, tableState.filters),
    [columns, tableState.filters]
  )

  const tableFooterComponent = useMemo(
    () => tableFooter && renderTableFooter(tableFooter, summary),
    [tableFooter, summary]
  )

  useEffect(() => {
    if (!isEmpty(table.filters) || table.searchText) {
      handleRemoteData(
        tableState.page,
        tableState.rowsPerPage,
        tableState.order,
        tableState.orderBy,
        tableState.searchText,
        tableState.filters
      )
    }
  }, [table.filters, table.searchText])

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

    if (generalSearch?.hasGeneralSearch && !table.searchText.length) {
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
            hasGeneralSearch: generalSearch?.hasGeneralSearch,
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
            hasGeneralSearch: generalSearch?.hasGeneralSearch,
            generalSearchText: table.searchText
          })
        )
      }
      setItems(toTableRowItems(response.list, columns))
      setTotalCount(response.page.totalCount)
      setSummary(response.summary)

      if (generalSearch?.noResults && table.searchText && !response.list.length) {
        openNoGeneralSearchConfirmModal()
      }
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${error.message}`,
        type: 'error'
      })
    }
    setIsLoading(false)
  }

  const debouncedHandleRemoteData = debounce(handleRemoteData, 500)

  const openNewModal = () => setIsNewModalOpen(true)

  const closeNewModal = () => setIsNewModalOpen(false)

  const handleDownload = () => {
    if (tableActions?.downloadAction) {
      const { action } = tableActions?.downloadAction
      download(action.url, tableState.filters)
    }
  }

  const openNoGeneralSearchConfirmModal = () => setIsNoGeneralSearchConfirmModalOpen(true)

  const closeNoGeneralSearchConfirmModal = () => setIsNoGeneralSearchConfirmModalOpen(false)

  const noGeneralSearchConfirm = () => {
    closeNoGeneralSearchConfirmModal()

    const param = searchParams.get('tab')

    if (param) {
      searchParams.delete('tab')
    }

    navigate(`${generalSearch.noResults.action.href}&${searchParams}`)
  }

  return (
    <Box
      className={cn(s.tableContainer, {
        [s.hidden]: generalSearch?.hasGeneralSearch && !table.searchText.length
      })}
    >
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
      {generalSearch?.noResults && (
        <ConfirmationModal
          isModalOpen={isNoGeneralSearchConfirmModalOpen}
          closeModal={closeNoGeneralSearchConfirmModal}
          modalTitle=""
          modalMessage={generalSearch.noResults.message}
          buttons={generalSearch.noResults.buttons}
          confirm={noGeneralSearchConfirm}
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
        downloadButton={tableActions?.downloadAction ? { onClick: handleDownload } : null}
        hasSearchInput={!!tableActions?.searchAction}
        handleRemoteData={debouncedHandleRemoteData}
        filters={filtersConfig}
      />
      {tableFooter && <div style={{ textAlign: 'right' }}>{tableFooterComponent}</div>}
    </Box>
  )
}

export default Table
