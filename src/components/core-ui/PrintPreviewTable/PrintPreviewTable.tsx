import { useState, useEffect, useMemo, useRef } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { Box } from '@mui/material'
import { Table as GeneralTable, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { convertFilterSchemaToFilterConfig } from '../Table/helpers'
import { toDynamicTableItems, toTableRowItems } from 'utils/serializers'
import { useNotification } from 'hooks'
import debounce from 'lodash.debounce'
import s from '../Table/Table.modules.scss'
import { isEmpty } from 'lodash'
import { formatErrorMessage } from 'utils/formatting'
import { useReactToPrint } from 'react-to-print'
import { PrintOutlined } from '@mui/icons-material'
import { createDynamicPrintColumns } from './helpers'

const PrintPreviewTable = props => {
  const {
    action,
    columns,
    tableActions,
    tableRowActions,
    tableFooter,
    hasInitialFilters,
    extraUrlParams,
    extraCustomUrlParams,
    userModal,
    showAbbrev,
    ...rest
  } = props

  let [searchParams] = useSearchParams()
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const printColumns = search.get('columns').split(',')
  const filterBy = search.get('filterBy')
  const order = search.get('order')
  const orderBy = search.get('orderBy')
  const filterValue = search.get('filterValue')
  const [isLoading, setIsLoading] = useState(true)
  const [dynamicColumns, setDynamicColumns] = useState([])
  const [dynamicItems, setDynamicItems] = useState([])

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const table = useSelector((state: RootState) => state.table)

  const { showNotification } = useNotification()

  const filterDate = useMemo(() => {
    if (!filterBy || !filterValue) {
      return null
    }

    let filters = filterBy.split('|')
    if (filters.includes('date') == false) {
      return null
    } else {
      return filterValue.split('|')[filters.indexOf('date')]
    }
  }, [filterBy, filterValue])

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

  const [isTableLoaded, setIsTableLoaded] = useState(false)

  useEffect(() => {
    if (isTableLoaded) {
      handleRemoteData()
    }
  }, [extraUrlParams, extraCustomUrlParams])

  const handleRemoteData = async () => {
    if (hasInitialFilters && isEmpty(table.filters)) {
      return null
    }

    const url = action.url

    setIsLoading(true)
    try {
      let response
      if (action.type === 'GET') {
        const encodedFilterBy = encodeURIComponent(filterBy)
        const encodedFilterValue = encodeURIComponent(filterValue)
        const builtUrl = `
          ${url}?page=0&size=1000
          ${order ? '&order=${order}':''}
          ${orderBy ? '&orderBy=${orderBy}':''}
          &filterBy=${encodedFilterBy}&filterValue=${encodedFilterValue}`
        response = await makeCoreGetRequest(builtUrl
          // order && orderBy
          //   ? `${url}?page=0&size=1000&order=${order}&orderBy=${orderBy}&filterBy=${encodedFilterBy}&filterValue=${encodedFilterValue}`
          //   : `${url}?page=0&size=1000&filterBy=${encodedFilterBy}&filterValue=${encodedFilterValue}`
        )
      }

      const newDynamicColumns = createDynamicPrintColumns(columns, response.list, printColumns)
      setDynamicColumns(newDynamicColumns)

      setDynamicItems(toTableRowItems(toDynamicTableItems(response.list), newDynamicColumns))
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }

    setIsTableLoaded(true)
    setIsLoading(false)
  }

  const debouncedHandleRemoteData = debounce(handleRemoteData, 500)

  const handleDownload = () => {
    handlePrint()
  }

  return (
    <Box ref={componentRef}>
      {filterDate && (
        <Box className={s.tableContainer}>
          <Typography variant="regular" style={{ color: 'black', fontSize: '18px' }}>
            {filterDate}
          </Typography>
        </Box>
      )}
      {showAbbrev && (
        <Box className={s.tableContainer}>
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
      <Box className={s.tableContainer}>
        <GeneralTable
          {...rest}
          columns={dynamicColumns}
          rows={dynamicItems}
          isLoading={isLoading}
          isRemote
          disablePagination
          handleRemoteData={debouncedHandleRemoteData}
          filters={filtersConfig}
          hasCustomPagination
          toolbarActions={[
            {
              label: 'Printeaza',
              icon: <PrintOutlined />,
              onClick: handleDownload
            }
          ]}
        />
      </Box>
    </Box>
  )
}

export default PrintPreviewTable
