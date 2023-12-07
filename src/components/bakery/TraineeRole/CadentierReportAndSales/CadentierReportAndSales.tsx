import s from '../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { CircularProgress, Divider, Grid } from '@mui/material'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { TableItem } from './interfaces'
import { DownloadOutlined } from '@mui/icons-material'
import { useQuery } from 'react-query'
import { toStoreFilterItems } from 'components/bakery/commonSerializers'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import dayjs from 'dayjs'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { formatAndDownloadResponse } from 'components/bakery/UsageReport/helpers'
import { formatBakeryPayloadDate } from 'utils/helpers'
import { columns } from './helpers'
import { GroupTable } from 'components/core-ui/GroupTable'
import { toTableRowItems } from './serializers'

const CadentierReportAndSales = () => {
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)
  const [planningDateFilterValue, setPlanningDateFilterValue] = useState<dayjs.Dayjs>(dayjs())

  const { data: storesFilterOptions, isLoading: isStoresFilterOptionsLoading } = useQuery(
    ['store'],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/all')

      return toStoreFilterItems(result) || []
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

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/report/product/sale/cadentier',
          filters: [
            { name: 'store', value: storeFilterValue.value },
            { name: 'date', value: formatBakeryPayloadDate(planningDateFilterValue) }
          ],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )
      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)

      return response
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const handleStoreFilterChange = (value: ValueLabelInterface): void => {
    setStoreFilterValue(value)
    if (storeFilterValue === null) return
    setShouldRefreshData(true)
  }

  const handlePlanningDateFilterChange = (value: string): void => {
    setPlanningDateFilterValue(dayjs(value))
    if (storeFilterValue === null) return
    setShouldRefreshData(true)
  }

  const handleDownload = async () => {
    const url = toTableGETUrl({
      url: '/bakery/report/download/sale',
      filters: [
        { name: 'store', value: storeFilterValue?.value },
        { name: 'startDate', value: formatBakeryPayloadDate(planningDateFilterValue) }
      ]
    })
    try {
      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `Error while downloading file. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <div className={s.mainContainer}>
      <Grid container>
        <>
          <Grid xs={12} md={12} container justifyContent={'space-between'}>
            <Grid xs={12} md={3} item>
              <DatePicker
                label="Planificare pentru"
                value={planningDateFilterValue}
                variant="outlined"
                required
                onChange={handlePlanningDateFilterChange}
              />
            </Grid>

            {isStoresFilterOptionsLoading ? (
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            ) : (
              <Grid xs={12} md={3} item>
                <AsyncAutocomplete
                  variant="outlined"
                  applyCustomStyle
                  name="store.id"
                  label="Selecteaza magazin"
                  disableClearable
                  value={storeFilterValue}
                  options={storesFilterOptions}
                  onChange={handleStoreFilterChange}
                />
              </Grid>
            )}
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
              groupCount={2}
              hasStickyHeader
              frequency="day"
              maxHeight={'600px'}
              toolbarActions={[
                {
                  label: 'Descarca',
                  icon: <DownloadOutlined />,
                  onClick: () => handleDownload()
                }
              ]}
            />
          )}
        </>
      </Grid>
    </div>
  )
}

export default CadentierReportAndSales
