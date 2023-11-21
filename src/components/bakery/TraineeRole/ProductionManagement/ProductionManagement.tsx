import { useState } from 'react'
import s from './ProductionManagement.modules.scss'
import { useQuery } from 'react-query'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { CircularProgress, Divider, Grid } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns } from './helpers'
import { IdNameInterface, ValueLabelInterface } from 'components/bakery/interfaces'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DownloadOutlined, PrintOutlined } from '@mui/icons-material'
import { formatAndDownloadResponse } from 'utils/helpers'
import { GroupTable } from 'components/core-ui/GroupTable'
import { SubfamilyItem, TableItem, TableState } from './interfaces'
dayjs.extend(customParseFormat)

const ProductionManagement = () => {
  const { showNotification } = useNotification()
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [planningDate, setPlanningDate] = useState(dayjs())
  const [subfamiliesFilterValue, setSubfamiliesFilterValue] = useState<ValueLabelInterface>(null)

  const [tableState, setTableState] = useState<TableState>({
    order: null,
    orderBy: null,
    tableFilters: null
  })

  const { data: filterOptions, isLoading: isFilterOptionsLoading } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/trainee/all')
      const resultOptions = result.map(
        (item: IdNameInterface): ValueLabelInterface => ({ label: item.name, value: item.id })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: subfamiliesOptions, isLoading: isSubfamilierOptionsLoading } = useQuery(
    ['subfamilies'],
    async () => {
      const result = await makeCoreGetRequest(
        `/bakery/region/subfamilies?store=${storeFilterValue?.value}`
      )

      const resultOptions = result.map(
        (item: SubfamilyItem): ValueLabelInterface => ({
          label: item.subFamily,
          value: item.subFamily
        })
      )

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: storeFilterValue !== null
    }
  )

  const handleFilterChange = (value: ValueLabelInterface): void => {
    setStoreFilterValue(value)
    if (storeFilterValue === null) return
    setShouldRefreshData(true)
  }

  const handleSubfamiliesChange = (value: ValueLabelInterface): void => {
    setSubfamiliesFilterValue(value)
    if (storeFilterValue === null) return
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/region/cadentier',
          filters: [
            { name: 'date', value: planningDate.format('YYYY-MM-DD') },
            { name: 'store', value: storeFilterValue?.value },
            { name: 'subfamilies', value: subfamiliesFilterValue?.value || '' }
          ],
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

      setTableState({
        order,
        orderBy,
        tableFilters: [...tableFilters, { name: 'date', value: planningDate.format('YYYY-MM-DD') }]
      })

      return response
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { isLoading: isLoadingDownloadFile, refetch: refetchDownloadFile } = useQuery(
    ['download'],
    async () => {
      const response = await makeCoreGetFileRequest(`/bakery/report/download/cadentier`, {
        responseType: 'blob'
      })
      return formatAndDownloadResponse(response)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

  return (
    <div className={s.mainContainer}>
      <Grid container>
        {isFilterOptionsLoading || isSubfamilierOptionsLoading || isLoadingDownloadFile ? (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        ) : (
          <>
            <Grid xs={12} md={12} container justifyContent={'space-between'}>
              <Grid xs={12} md={3} item>
                <DatePicker
                  label="Planificare pentru"
                  value={planningDate}
                  variant="standard"
                  required
                  onChange={value => {
                    setPlanningDate(dayjs(value))
                    setShouldRefreshData(true)
                  }}
                />
              </Grid>
              <Grid xs={12} md={3} item>
                <AsyncAutocomplete
                  variant="standard"
                  name="store.id"
                  label="Magazin"
                  disableClearable
                  value={storeFilterValue}
                  options={filterOptions}
                  onChange={handleFilterChange}
                />
              </Grid>
              <Grid xs={12} md={3} item>
                <AsyncAutocomplete
                  variant="standard"
                  name="subfamilies"
                  label="Subfamilie"
                  disableClearable
                  value={subfamiliesFilterValue}
                  options={subfamiliesOptions || []}
                  onChange={handleSubfamiliesChange}
                />
              </Grid>
            </Grid>

            <Grid xs={12} item>
              <Divider />
            </Grid>

            {storeFilterValue && (
              <GroupTable
                hideCheckbox
                columns={columns}
                items={tableItems}
                fetchData={fetchData}
                isLoading={isLoading}
                totalCount={totalCount}
                shouldRefreshData={shouldRefreshData}
                setShouldRefreshData={setShouldRefreshData}
                stickyRatio={0.3}
                hasStickyHeader
                maxHeight={'600px'}
                hasSearchInput
                toolbarActions={[
                  {
                    label: 'Descarca',
                    icon: <DownloadOutlined />,
                    onClick: () => refetchDownloadFile()
                  },
                  {
                    label: 'Printeaza',
                    icon: <PrintOutlined />
                  }
                ]}
                showAbbrev
                hasPrintAction
                printUrl={'/bakery/formator/cadentier-formator-print'}
                order={tableState.order}
                orderBy={tableState.orderBy}
                tableFilters={tableState.tableFilters}
              />
            )}
          </>
        )}
      </Grid>
    </div>
  )
}

export default ProductionManagement
