import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useImmer } from 'use-immer'
import { Box } from '@mui/material'
import { Table as GeneralTable } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { TableActions } from './TableActions'
import { ModalWithForm } from 'components/core-ui/ModalWithForm'
import { getRenderedColumns, convertFilterSchemaToFilterConfig } from './helpers'
import { toTableGETUrl, toTablePOSTPayload, toTableRowItems } from './serializers'

// import { mockedRows } from 'utils/mockedData/teamTimeOffData'
// import { mockedRows } from 'utils/mockedData/effortMatrixData'
// import { mockedRows } from 'utils/mockedData/teamAssignmentData'
import { mockedRows } from 'utils/mockedData/capacityOverviewData'
// import { mockedRows } from 'utils/mockedData/personCapacityData'

const Table = props => {
  const { action, columns, tableActions, tableRowActions, ...rest } = props

  let [searchParams] = useSearchParams()

  const [items, setItems] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)

  const [tableState, setTableState] = useImmer({
    page: 0,
    rowsPerPage: rest.rowsPerPage ?? 10,
    order: rest.order ?? 'asc',
    orderBy: rest.orderBy ?? '',
    searchText: '',
    filters: []
  })

  const filtersConfig = useMemo(() => {
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

  const handleRemoteData = async (page, rowsPerPage, order, orderBy, searchText, filters) => {
    setTableState({ page, rowsPerPage, order, orderBy, searchText, filters })

    const url = action.url

    try {
      let response
      if (action.type === 'GET') {
        response = await makeCoreGetRequest(
          toTableGETUrl({
            url,
            searchText,
            searchFields: tableActions?.searchAction?.searchFields,
            filters,
            page,
            rowsPerPage,
            order,
            orderBy
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
            filters
          })
        )
      }
      // setItems(toTableRowItems(response.list, columns))
      // setTotalCount(response.page.totalCount)
      setItems(toTableRowItems(mockedRows, columns))
      setTotalCount(mockedRows.length)
    } catch (error) {
      console.log(error)
      setItems(toTableRowItems(mockedRows, columns))
      setTotalCount(mockedRows.length)
    }
  }

  const openNewModal = () => setIsNewModalOpen(true)

  const closeNewModal = () => setIsNewModalOpen(false)

  return (
    <Box>
      {tableActions?.newAction && (
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
      <GeneralTable
        {...rest}
        columns={
          tableRowActions
            ? renderedColumns.concat({
                title: '',
                field: 'actions',
                align: 'right',
                render: row => (
                  <TableActions
                    itemId={row.id}
                    editAction={tableRowActions.editAction}
                    deleteAction={tableRowActions.deleteAction}
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
                  />
                )
              })
            : renderedColumns
        }
        rows={items}
        totalCount={totalCount}
        rowsPerPage={rest.rowsPerPage || 10}
        isRemote
        newButton={
          tableActions?.newAction
            ? { isFloatingButton: tableActions.newAction.isFloatingButton, onClick: openNewModal }
            : null
        }
        hasSearchInput={!!tableActions?.searchAction}
        handleRemoteData={handleRemoteData}
        filters={filtersConfig}
      />
    </Box>
  )
}

export default Table
