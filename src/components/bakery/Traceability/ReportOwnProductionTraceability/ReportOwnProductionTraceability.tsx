import {
  Autocomplete,
  DatePicker,
  FilterDataSelect,
  ListTable
} from '@fullscreendigital/carrefour-dex-fe'
import s from './OwnProductionTraceability.modules.scss'
import React, { useState } from 'react'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { formatAndDownloadResponse, handleQueryError } from 'utils/helpers'
import { useNotification } from 'hooks'
import { Divider, Grid, debounce } from '@mui/material'
import { TableFiltersType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table'
import { useQuery } from 'react-query'
import { FamilyItem, SubfamilyItem } from '../ReceivedProducts/interfaces'
import { IdNameInterface, ValueLabelInterface } from '../../interfaces'
import { formatErrorMessage } from '../../../../utils/formatting'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'
import { getCurrentDate } from '../../../../utils/helpers'
import { DownloadOutlined, PrintOutlined } from '@mui/icons-material'
import { useProductsFilter } from './useProductsFilter'
import { PrintModal } from '../../../core-ui/PrintModal'
import { URLS } from '../../constants'
import { useImmer } from 'use-immer'
import OwnProductionTraceabilityDescription from '../OwnProductionTraceability/OwnProductionTraceabilityDescription'
import { batchPrintColumns, productPrintColumns, chargePrintColumns } from './helpers'
import { useLocation } from 'react-router'

export const ReportOwnProductionTraceability = () => {
  const { showNotification } = useNotification()
  const { pathname } = useLocation()

  const isFormator = pathname.includes('/formator')

  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rows, setRows] = useState([])
  const [tableData, setTableData] = useState(null)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false)
  const [liveTableFilters, setLiveTableFilters] = useState<Filter[]>([])
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface>(null)

  const productsFilter = useProductsFilter()

  const [tableState, setTableState] = useImmer(
    window.history.state.tableState || {
      page: 0,
      rowsPerPage: 25,
      order: '',
      orderBy: '',
      searchText: '',
      filters: []
    }
  )

  const { data: filterOptions } = useQuery(
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
          message: `Error while fetching store dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const handleStoreFilterChange = (value: ValueLabelInterface): void => {
    setStoreFilterValue(value)
  }

  const handleRemoteDetails = async (rowId: string | number) => {
    const response = await makeCoreGetRequest(`/bakery/traceability/production/${rowId}`)
    const data = await response

    return <OwnProductionTraceabilityDescription item={data} chargeItem={tableData} />
  }

  const fetchData = async (page, rowsPerPage, tableFilters, searchText) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/traceability/production',
          filters: [{ name: 'store', value: storeFilterValue?.value }],
          tableFilters,
          page,
          searchText,
          searchFields: ['productName'],
          rowsPerPage
        })
      )
      setRows(toListTableRows(response.list))
      setTotalCount(response.page.totalCount)
      setTableData(response.list)
      setIsLoading(false)

      setTableState(tableState => ({
        ...tableState,
        tableFilters: [...tableFilters, { name: 'store', value: storeFilterValue?.value }]
      }))
    } catch (error) {
      handleQueryError(
        error,
        'A aparut o eroare la obtinerea datelor pentru tabel.',
        showNotification
      )
    }
  }

  const downloadFileQuery = useQuery(
    ['download'],
    async () => {
      const url = toTableGETUrl({
        url: '/bakery/traceability/production/download',
        filters: tableState.tableFilters
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

  const families = useQuery(
    ['families-store', liveTableFilters.find(filter => filter.name === 'subfamily')?.value],
    async () => {
      const subfamilyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'subfamily')
        ?.value || []) as AutoCompleteValue[]

      const result = await makeCoreGetRequest(`/bakery/store/families`, {
        params: {
          subfamily: subfamilyLiveFilterValue.map(({ value }) => value)
        },
        paramsSerializer: { indexes: null }
      })
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

  const subfamilies = useQuery(
    ['subfamilies-store', liveTableFilters.find(filter => filter.name === 'family')?.value],
    async () => {
      const familyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'family')
        ?.value || []) as AutoCompleteValue[]
      const result = await makeCoreGetRequest(`/bakery/store/families/subfamilies`, {
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

  const currentDate = getCurrentDate()

  const drawerFilters: TableFiltersType[] = [
    {
      name: 'product',
      value: undefined,
      filter: (
        <Autocomplete
          {...productsFilter}
          variant="outlined"
          label="Produs"
          disableClearable
          multiple={true}
          autoComplete={false}
          filterOptions={x => x}
        />
      ),
      type: 'autocomplete',
      label: 'Produs'
    },
    {
      name: 'startDate',
      value: currentDate,
      filter: (
        <DatePicker
          label="Data inceput productie"
          variant="outlined"
          value={currentDate}
          onChange={() => {}}
        />
      ),
      type: 'date',
      label: 'Data inceput productie'
    },
    {
      name: 'endDate',
      value: currentDate,
      filter: (
        <DatePicker
          label="Data sfarsit productie"
          variant="outlined"
          value={currentDate}
          onChange={() => {}}
        />
      ),
      type: 'date',
      label: 'Data sfarsit productie'
    },
    {
      name: 'family',
      value: undefined,
      filter: (
        <Autocomplete
          variant="outlined"
          label="Familie produse"
          disableClearable
          options={families.data || []}
          multiple
        />
      ),
      type: 'autocomplete',
      label: 'Familie produse'
    },
    {
      name: 'subfamily',
      value: undefined,
      filter: (
        <Autocomplete
          variant="outlined"
          label="Subfamilie produse"
          disableClearable
          options={subfamilies.data || []}
          multiple
        />
      ),
      type: 'autocomplete',
      label: 'Subfamilie produse'
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Grid container>
        {isFormator && (
          <>
            <Grid xs={12} md={12} container spacing={5}>
              <Grid xs={12} md={3} item>
                <FilterDataSelect
                  name="store"
                  defaultSelectedData={storeFilterValue}
                  label="Magazin"
                  options={filterOptions}
                  onSelect={handleStoreFilterChange}
                  placeholderButton="Selecteaza"
                  showSearch
                />
              </Grid>
            </Grid>

            <Grid xs={12} item py={2}>
              <Divider />
            </Grid>
          </>
        )}
      </Grid>

        {((isFormator && storeFilterValue) || !isFormator) && (
          <>
            <PrintModal
              {...tableState}
              tableFilters={tableState.tableFilters}
              url={isFormator ? URLS.AUTH_REPORT_OWN_PRODUCTION_TRACEABILITY_PRINT_FORMATOR : URLS.AUTH_REPORT_OWN_PRODUCTION_TRACEABILITY_PRINT}
              dynamicColumns={[...productPrintColumns, ...batchPrintColumns, ...chargePrintColumns]}
              isModalOpen={isPrintModalOpen}
              closeModal={() => setIsPrintModalOpen(false)}
              toolbarActions={[]}
            />
            <ListTable
              rows={rows}
              handleRemoteData={debounce(fetchData, 500)}
              handleRemoteDetails={handleRemoteDetails}
              isLoading={isLoading}
              totalCount={totalCount}
              filters={drawerFilters}
              hasSearchInput
              handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
              toolbarActions={[
                {
                  label: 'Descarca',
                  icon: <DownloadOutlined />,
                  onClick: () => {
                    downloadFileQuery.refetch()
                  }
                },
                {
                  label: 'Printeaza',
                  icon: <PrintOutlined />,
                  onClick: () => {
                    setIsPrintModalOpen(true)
                  }
                }
              ]}
              rowActionsWidth="90px"
              rowsPerPage={25}
              rowsPerPageOptions={[25, 50, 100]}
            />
          </>
        )}
    </div>
  )
}
