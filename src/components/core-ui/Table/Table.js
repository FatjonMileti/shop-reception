import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useImmer } from 'use-immer'
import dayjs from 'dayjs'
import { Box } from '@mui/material'
import { Table as GeneralTable } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { renderComponent } from 'utils/dynamicRenderingService'
import { TableActions } from './TableActions'
import { ModalWithForm } from 'components/core-ui/ModalWithForm'
import { getInitialTableFilters, getRenderedColumns } from './helpers'
import { toTableGETUrl, toTablePOSTPayload, toTableRowItems } from './serializers'
import s from './Table.scss'

// import { mockedRows } from 'utils/mockedData/teamTimeOffData'
import { mockedRows } from 'utils/mockedData/effortMatrixData'
// import { mockedRows } from 'utils/mockedData/teamAssignmentData'
// import { mockedRows } from 'utils/mockedData/capacityOverviewData'
// import { mockedRows } from 'utils/mockedData/personCapacityData'

const Table = props => {
  const { action, columns, tableActions, tableRowActions, ...rest } = props
  let [searchParams] = useSearchParams()

  const initialTableFilters = useMemo(
    () =>
      tableActions?.filters ? getInitialTableFilters(searchParams, tableActions?.filters) : null,
    [searchParams, tableActions?.filters]
  )

  const [items, setItems] = useState([])
  const [totalCount, setTotalCount] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rest.rowsPerPage || 10)
  const [currentOrder, setCurrentOrder] = useState(rest.order || 'asc')
  const [currentOrderBy, setCurrentOrderBy] = useState(rest.orderBy || '')
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [tableFilters, setTableFilters] = useImmer(initialTableFilters)

  useEffect(() => {
    ;(async () => {
      handleRemoteData(0, rest.rowsPerPage || 10, rest.order || 'asc', rest.orderBy || '')
    })()
  }, [tableFilters])

  const renderedColumns = useMemo(
    () => getRenderedColumns(columns, tableFilters),
    [columns, tableFilters]
  )

  const handleRemoteData = async (page, rowsPerPage, order, orderBy, searchText) => {
    setCurrentPage(page)
    setCurrentRowsPerPage(rowsPerPage)
    setCurrentOrder(order)
    setCurrentOrderBy(orderBy)
    setSearchValue(searchText)

    const url = action.url

    try {
      let response
      if (action.type === 'GET') {
        response = await makeCoreGetRequest(
          toTableGETUrl({
            url,
            searchText,
            tableActions,
            tableFilters,
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
            tableFilters
          })
        )
      }
      setItems(toTableRowItems(response.list, columns))
      setTotalCount(response.page.totalCount)
    } catch (error) {
      console.log(error)
      setItems(toTableRowItems(mockedRows, columns))
      setTotalCount(mockedRows.length)
    }
  }

  const openNewModal = () => setIsNewModalOpen(true)

  const closeNewModal = () => setIsNewModalOpen(false)

  const handleFilterChange = (value, name) => {
    setTableFilters(draft => {
      draft[name] = value
    })
  }

  return (
    <Box className={s.tableContainer}>
      {tableActions?.newAction && (
        <ModalWithForm
          {...tableActions.newAction}
          additionalAction={() =>
            handleRemoteData(
              currentPage,
              currentRowsPerPage,
              currentOrder,
              currentOrderBy,
              searchValue
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
                        currentPage,
                        currentRowsPerPage,
                        currentOrder,
                        currentOrderBy,
                        searchValue
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
      />
    </Box>
  )
}

export default Table
