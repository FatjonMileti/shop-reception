import {
  Autocomplete,
  DatePicker,
  FilterDataSelect,
  ListTable
} from '@fullscreendigital/carrefour-dex-fe'
import s from './OwnProductionTraceability.modules.scss'
import React, { startTransition, useMemo, useState } from 'react'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { formatAndDownloadResponse, getPreviousDay, handleQueryError } from 'utils/helpers'
import { useNotification } from 'hooks'
import { Divider, Grid, debounce, useMediaQuery } from '@mui/material'
import { TableFiltersType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table'
import { useQuery } from 'react-query'
import { FamilyItem, SubfamilyItem } from '../ReceivedProducts/interfaces'
import { IdNameInterface, ValueLabelInterface } from '../../interfaces'
import { formatErrorMessage } from '../../../../utils/formatting'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'
import { DownloadOutlined, PrintOutlined } from '@mui/icons-material'
import { useProductsFilter } from './useProductsFilter'
import { PrintModal } from '../../../core-ui/PrintModal'
import { URLS } from '../../constants'
import { useImmer } from 'use-immer'
import OwnProductionTraceabilityDescription from '../OwnProductionTraceability/OwnProductionTraceabilityDescription'
import { batchPrintColumns, productPrintColumns, chargePrintColumns } from './helpers'
import { useLocation } from 'react-router'
import dayjs from 'dayjs'

export const ReportOwnProductionTraceability = () => {
  const { showNotification } = useNotification()
  const { pathname } = useLocation()

  const isFormator = pathname.includes('/formator')

  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rows, setRows] = useState([])
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false)
  const [liveTableFilters, setLiveTableFilters] = useState<Filter[]>([])
  const [storeFilterValue, setStoreFilterValue] = useState<ValueLabelInterface[]>([])

  const productsFilter = useProductsFilter()

  const previousDay = getPreviousDay()

  const [tableState, setTableState] = useImmer(
    window.history.state.tableState || {
      page: 0,
      rowsPerPage: 25,
      order: '',
      orderBy: '',
      searchText: '',
      filters: [],
      tableFilters: [
        {
          name: 'startDate',
          value: previousDay
        },
        {
          name: 'endDate',
          value: previousDay
        }
      ]
    }
  )

  React.useEffect(() => {
    if (storeFilterValue?.length > 0) {
      debouncedFetchData(0, tableState.rowsPerPage, tableState.tableFilters, tableState.searchText)
    }
  }, [storeFilterValue])

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

  const fetchData = async (page, rowsPerPage, tableFilters, searchText) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/traceability/production',
          filters: [
            ...(storeFilterValue && storeFilterValue.length > 0
              ? [{ name: 'store', value: storeFilterValue.map(val => val.value) }]
              : [])
          ],
          tableFilters,
          page,
          searchText,
          searchFields: ['product.name'],
          rowsPerPage
        })
      )
      setRows(toListTableRows(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)

      setTableState(tableState => ({
        ...tableState,
        tableFilters,
        rowsPerPage,
        searchText
      }))
    } catch (error) {
      handleQueryError(
        error,
        'A aparut o eroare la obtinerea datelor pentru tabel.',
        showNotification
      )
    }
  }

  const debouncedFetchData = debounce(fetchData, 500)

  const handleStoreFilterChange = (value: ValueLabelInterface[]): void => {
    startTransition(() => {
      setStoreFilterValue(value)
    })
  }

  const handleRemoteDetails = async (rowId: string | number) => {
    const response = await makeCoreGetRequest(`/bakery/traceability/production/${rowId}`)
    const data = await response

    return <OwnProductionTraceabilityDescription item={data} />
  }

  const downloadFileQuery = useQuery(
    ['download'],
    async () => {
      const url = toTableGETUrl({
        url: '/bakery/traceability/production/download',
        filters: [
          ...(storeFilterValue && storeFilterValue.length > 0
            ? [{ name: 'store', value: storeFilterValue.map(val => val.value) }]
            : [])
        ],
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

  const families = useQuery(
    [
      'families-store',
      liveTableFilters.find(filter => filter.name === 'product.subfamily')?.value,
      storeFilterValue
    ],
    async () => {
      const subfamilyLiveFilterValue = (liveTableFilters.find(
        filter => filter.name === 'product.subfamily'
      )?.value || []) as AutoCompleteValue[]

      const result = await makeCoreGetRequest(`/bakery/store/traceability/families`, {
        params: {
          subfamily: subfamilyLiveFilterValue.map(({ value }) => value),
          ...(isFormator ? { store: storeFilterValue.map(({ value }) => value) } : {})
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
    [
      'subfamilies-store',
      liveTableFilters.find(filter => filter.name === 'product.family')?.value,
      storeFilterValue
    ],
    async () => {
      const familyLiveFilterValue = (liveTableFilters.find(
        filter => filter.name === 'product.family'
      )?.value || []) as AutoCompleteValue[]
      const result = await makeCoreGetRequest(`/bakery/store/traceability/families/subfamilies`, {
        params: {
          family: familyLiveFilterValue.map(({ value }) => value),
          ...(isFormator ? { store: storeFilterValue.map(({ value }) => value) } : {})
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

  const liveFiltersObject: { [key: string]: string } = useMemo(() => {
    return liveTableFilters.reduce((acc, item) => {
      acc[item.name] = item.value
      return acc
    }, {})
  }, [liveTableFilters])

  const minMaxDate = useMemo(() => {
    const today = dayjs()
    const minDate = dayjs().subtract(6, 'month')
    const { startDate, endDate } = liveFiltersObject

    return {
      startDate: {
        min: endDate
          ? dayjs(endDate).subtract(1, 'month').isBefore(minDate)
            ? minDate
            : dayjs(endDate).subtract(1, 'month')
          : minDate,

        max: endDate ? dayjs(endDate) : today
      },
      endDate: {
        min: startDate ? dayjs(startDate) : minDate,
        max: startDate
          ? dayjs(startDate).isBefore(today.subtract(1, 'month'))
            ? dayjs(startDate).add(1, 'month')
            : today
          : today
      }
    }
  }, [liveFiltersObject.startDate, liveFiltersObject.endDate])

  const drawerFilters: TableFiltersType[] = [
    {
      name: 'product.id',
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
      value: previousDay,
      filter: (
        <DatePicker
          label="Data inceput productie"
          variant="outlined"
          value={previousDay}
          onChange={() => {}}
          minDate={minMaxDate.startDate.min}
          maxDate={minMaxDate.startDate.max}
        />
      ),
      type: 'date',
      label: 'Data inceput productie'
    },
    {
      name: 'endDate',
      value: previousDay,
      filter: (
        <DatePicker
          label="Data sfarsit productie"
          variant="outlined"
          value={previousDay}
          onChange={() => {}}
          minDate={minMaxDate.endDate.min}
          maxDate={minMaxDate.endDate.max}
        />
      ),
      type: 'date',
      label: 'Data sfarsit productie'
    },
    {
      name: 'product.family',
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
      name: 'product.subfamily',
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

  const isXs = useMediaQuery('(max-width:624px)')

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
                  multiSelect={true}
                />
              </Grid>
            </Grid>

            <Grid xs={12} item py={2}>
              <Divider />
            </Grid>
          </>
        )}
      </Grid>

      {((isFormator && storeFilterValue.length > 0) || !isFormator) && (
        <>
          <PrintModal
            {...tableState}
            tableFilters={tableState.tableFilters}
            url={
              isFormator
                ? URLS.AUTH_REPORT_OWN_PRODUCTION_TRACEABILITY_PRINT_FORMATOR
                : URLS.AUTH_REPORT_OWN_PRODUCTION_TRACEABILITY_PRINT
            }
            dynamicColumns={[...productPrintColumns, ...batchPrintColumns, ...chargePrintColumns]}
            isModalOpen={isPrintModalOpen}
            closeModal={() => setIsPrintModalOpen(false)}
            toolbarActions={[]}
          />
          <ListTable
            rows={rows}
            handleRemoteData={debouncedFetchData}
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
            rowsPerPage={isXs ? 5 : 25}
            rowsPerPageOptions={isXs ? [5, 10, 15] : [25, 50, 100]}
          />
        </>
      )}
    </div>
  )
}
