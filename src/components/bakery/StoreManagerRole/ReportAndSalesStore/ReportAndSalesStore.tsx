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
import { Autocomplete, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { GroupTable } from 'components/core-ui/GroupTable'
import { DownloadOutlined } from '@mui/icons-material'
import { columns } from './helpers'
import { formatAndDownloadResponse, getPreviousDay } from 'utils/helpers'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'

const ReportAndSalesStore = () => {
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [tableState, setTableState] = useState<TableState>({
    order: null,
    orderBy: null,
    tableFilters: null
  })

  const [liveTableFilters, setLiveTableFilters] = React.useState<Filter[]>([])

  const { showNotification } = useNotification()

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
    ['subfamilies', liveTableFilters.find(filter => filter.name === 'family')?.value],
    async () => {
      const familyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'family')
        ?.value || []) as AutoCompleteValue[]
      const result = await makeCoreGetRequest('/bakery/store/families/subfamilies', {
        params: {
          family: familyLiveFilterValue.map(({ value }) => value)
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
        tableFilters: tableState.tableFilters
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
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/store/cadentier',
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
        tableFilters
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
            tableFilters
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

  const prevDay = getPreviousDay()

  const drawerFilters = [
    {
      name: 'date',
      value: prevDay,
      filter: (
        <DatePicker
          label="Planificare pentru"
          variant="outlined"
          value={prevDay}
          onChange={() => {}}
          required
        />
      ),
      type: 'date',
      label: 'Planificare pentru'
    },
    {
      name: 'family',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Familie"
          disableClearable
          options={familiesQuery.data || []}
          multiple
        />
      ),
      type: 'autocomplete',
      label: 'Familie',
      clearFiltersOnChange: ['subfamily']
    },
    {
      name: 'subfamily',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Subfamilie"
          disableClearable
          options={subfamiliesQuery.data || []}
          multiple
        />
      ),
      type: 'autocomplete',
      label: 'Subfamilie'
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Grid container>
        {familiesQuery.isLoading ||
          subfamiliesQuery.isLoading ||
          (reportFileQuery.isLoading && (
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          ))}

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
          filters={drawerFilters}
          handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
          rowsPerPage={25}
          rowsPerPageOptions={[25, 50, 100]}
          filtersLabel="Filtreaza"
          filtersButtonLabel="Filtreaza"
          appliedFiltersLabel="Filtre"
          cancelFiltersButtonLabel="Anuleaza"
          applyFiltersButtonLabel="Aplica"
        />
      </Grid>
    </div>
  )
}

export default ReportAndSalesStore
