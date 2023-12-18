import s from '../../commonStyles.modules.scss'
import { CircularProgress, Divider, Grid } from '@mui/material'
import { useQuery } from 'react-query'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { FamilyItem } from '../interfaces'
import { ValueLabelInterface } from '../../interfaces'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { SubfamilyItem, TableItem, TableState } from '../ProductionManagementStore/interfaces'
import React, { useState } from 'react'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { GroupTable } from 'components/core-ui/GroupTable'
import { DownloadOutlined } from '@mui/icons-material'
import { columns } from './helpers'
import { formatAndDownloadResponse, formatPayloadDate, getPreviousDay } from 'utils/helpers'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'

const ReportAndSalesStore = () => {
  const { showNotification } = useNotification()

  const [planningDate, setPlanningDate] = useState(getPreviousDay())
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [subfamiliesFilterValue, setSubfamiliesFilterValue] = useState<ValueLabelInterface[]>([])

  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableState, setTableState] = useState<TableState>({
    order: null,
    orderBy: null,
    tableFilters: null
  })

  const familiesQuery = useQuery(
    ['cadentier-families-store'],
    async () => {
      const result = await makeCoreGetRequest(`/bakery/store/families`)

      const resultOptions = result.map(
        (item: FamilyItem): ValueLabelInterface => ({
          label: item.name,
          value: item.id
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching families dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const subfamiliesQuery = useQuery(
    ['subfamilies', familiesFilterValue.map(({ value }) => value)],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/families/subfamilies', {
        params: {
          family: familiesFilterValue.map(({ value }) => value)
        },
        paramsSerializer: { indexes: null }
      })

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
          message: `Error while fetching subfamilies dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const reportFileQuery = useQuery(
    ['report-sale-download-store'],
    async () => {
      const url = toTableGETUrl({
        url: '/bakery/report/download/sale',
        filters: [
          { name: 'date', value: formatPayloadDate(planningDate) },
          { name: 'family', value: familiesFilterValue?.map(val => val.value) },
          { name: 'subfamily', value: subfamiliesFilterValue?.map(val => val.value) }
        ].filter(
          f =>
            (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
        )
      })

      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      return formatAndDownloadResponse(response)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching file. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters, searchText }) => {
    setIsLoading(true)
    try {
      const filters = [
        { name: 'date', value: formatPayloadDate(planningDate) },
        { name: 'family', value: familiesFilterValue?.map(val => val.value) },
        { name: 'subfamily', value: subfamiliesFilterValue?.map(val => val.value) }
      ].filter(
        f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
      )
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/store/cadentier',
          filters: filters,
          page,
          rowsPerPage: 25,
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
        tableFilters: filters
      })

      window.history.replaceState(
        {
          ...window.history.state,
          tableState: {
            page,
            rowsPerPage: 25,
            order,
            orderBy,
            searchText,
            filters
          }
        },
        document.title
      )

      return response
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const handleFamiliesChange = (value: ValueLabelInterface[]): void => {
    setFamiliesFilterValue(value)
    setShouldRefreshData(true)
  }

  const handleSubfamiliesChange = (value: ValueLabelInterface[]): void => {
    setSubfamiliesFilterValue(value)
    setShouldRefreshData(true)
  }

  return (
    <div className={s.mainContainer}>
      <Grid container>
        {familiesQuery.isLoading || subfamiliesQuery.isLoading || reportFileQuery.isLoading ? (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        ) : (
          <>
            <Grid xs={12} md={12} container spacing={5}>
              <Grid xs={12} md={3} item>
                <DatePicker
                  label="Planificare pentru"
                  value={planningDate}
                  variant="outlined"
                  required
                  onChange={value => {
                    setPlanningDate(dayjs(value))
                    setShouldRefreshData(true)
                  }}
                />
              </Grid>

              <Grid xs={12} md={3} item>
                <AsyncAutocomplete
                  variant="outlined"
                  name="family"
                  label="Familie"
                  value={familiesFilterValue}
                  options={familiesQuery.data || []}
                  onChange={handleFamiliesChange}
                  multiple
                />
              </Grid>

              <Grid xs={12} md={3} item>
                <AsyncAutocomplete
                  variant="outlined"
                  name="subfamily"
                  label="Subfamilie"
                  value={subfamiliesFilterValue}
                  options={subfamiliesQuery.data || []}
                  onChange={handleSubfamiliesChange}
                  multiple
                />
              </Grid>
            </Grid>

            <Grid xs={12} item paddingTop={2}>
              <Divider />
            </Grid>

            <GroupTable
              columns={columns}
              items={tableItems}
              fetchData={fetchData}
              isLoading={isLoading}
              totalCount={totalCount}
              shouldRefreshData={shouldRefreshData}
              setShouldRefreshData={setShouldRefreshData}
              stickyRatio={0.2}
              frequency="day"
              width="100%"
              hasStickyHeader
              maxHeight="600px"
              hideCheckbox
              toolbarActions={[
                {
                  label: 'Descarca',
                  icon: <DownloadOutlined />,
                  onClick: () => reportFileQuery.refetch()
                }
              ]}
              rowActionsWidth="130px"
            />
          </>
        )}
      </Grid>
    </div>
  )
}

export default ReportAndSalesStore
