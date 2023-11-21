import { Table as GeneralTable } from '@fullscreendigital/carrefour-dex-fe'
import { debounce } from '@mui/material'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

const Table = props => {
  const {
    columns,
    items,
    isLoading,
    fetchData,
    totalCount,
    shouldRefreshData,
    setShouldRefreshData,
    rowsPerPage,
    ...rest
  } = props

  const [tableState, setTableState] = useImmer(
    window.history.state.tableState || {
      page: 0,
      rowsPerPage: rest.rowsPerPage ?? 10,
      order: rest.order ?? '',
      orderBy: rest.orderBy ?? '',
      searchText: '',
      filters: []
    }
  )

  useEffect(() => {
    ;(async () => {
      if (shouldRefreshData) {
        const { page, rowsPerPage, order, orderBy, searchText, filters } = tableState
        await handleRemoteData(page, rowsPerPage, order, orderBy, searchText, filters)
        setShouldRefreshData(false)
      }
    })()
  }, [shouldRefreshData])

  const handleRemoteData = async (page, rowsPerPage, order, orderBy, searchText, filters) => {
    setTableState({
      page,
      rowsPerPage,
      order,
      orderBy,
      searchText,
      filters
    })

    window.history.replaceState(
      {
        ...window.history.state,
        tableState: {
          page,
          rowsPerPage,
          order,
          orderBy,
          searchText,
          filters
        }
      },
      document.title
    )

    await fetchData({ page, rowsPerPage, order, orderBy, tableFilters: filters, searchText })
  }

  return (
    <GeneralTable
      {...rest}
      columns={columns}
      rows={items}
      isLoading={isLoading}
      handleRemoteData={debounce(handleRemoteData, 500)}
      totalCount={totalCount}
      isRemote
      rowsPerPage={props.rowsPerPage || 10}
    />
  )
}

export default Table
