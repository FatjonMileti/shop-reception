import { Table as GeneralTable } from '@fullscreendigital/carrefour-dex-fe'
import { useImmer } from 'use-immer'

const Table = (props) => {
  const { columns, items, isLoading, fetchData, totalCount, ...rest } = props

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

    await fetchData({page, rowsPerPage, order, orderBy, tableFilters: filters})
  }

  return (
    <GeneralTable
      {...rest}
      columns={columns}
      rows={items}
      isLoading={isLoading}
      handleRemoteData={handleRemoteData}
      totalCount={totalCount}
      isRemote
    />
  )
}

export default Table