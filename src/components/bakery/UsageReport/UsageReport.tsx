import { Box } from '@mui/material'
import s from './UsageReport.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { UsageReportTableFilter, ValueLabelInterface, ZoneItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { columns } from './helpers'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { useQuery } from 'react-query'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { toAsyncSelectOptions } from './serializers'

const UsageReport = () => {
  const [tableItems, setTableItems] = useState<ZoneItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()
  
  const [tableFilter, setTableFilter] = useState<UsageReportTableFilter>({
    store: null,
    startDate: null,
    endDate: null
  })

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/report/application',
          filters: [],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )
      setTableItems(response.list)
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { data: stores, isLoading: isStoresLoading, refetch: refetchStores } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/all')
      const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []

    //   setModuleValue(resultOptions[0])
      
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching stores dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      // enabled: false
    }
  )

  const tableFilterFields = [
    {
        name: 'startDate',
        label: 'Data inceput',
        type: 'date',
        filter: (
          <DatePicker
            value={tableFilter.startDate}
            onChange={value => setTableFilter({ ...tableFilter, startDate: value })}
            label="Data inceput"
            variant="standard"
            required
          />
        )
      },
      {
        name: 'endDate',
        label: 'Data sfarsit',
        type: 'date',
        filter: (
          <DatePicker
            value={tableFilter.endDate}
            onChange={value => setTableFilter({ ...tableFilter, endDate: value })}
            label="Data sfarsit"
            variant="standard"
          />
        )
      },
      // {
      //   name: 'store',
      //   label: 'Magazin',
      //   type: 'autocomplete',
      //   filter: <>
      //       { isStoresLoading ? ( 
      //       <div style={{ display: 'flex' }}>
      //           Te rog asteapta pana vor fi afisate toate magazinele
      //       </div>
      //       ) : (
      //       <AsyncAutocomplete
      //           variant="outlined"
      //           name="store"
      //           label="Sursa volum de lucru"
      //           // loadInfoMessage="Te rog asteapta pana vor fi afisate toate magazinele"
      //           value={tableFilter.store}
      //           options={stores}
      //           onChange={value => setTableFilter({ ...tableFilter, store: tableFilter.store.push(String(value))})}
      //           multiple
      //       />
      //       )
      //       }
      //   </>
      // }
  ]

  return (
    <div className={s.mainContainer}>
      <Box>
        {/* <Table
          hideCheckbox
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
        /> */}
      </Box>
    </div>
  )
}

export default UsageReport
