import React, { useState } from 'react'
import s from '../../commonStyles.modules.scss'
import { useQuery } from 'react-query'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Divider, Grid } from '@mui/material'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns } from './helpers'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { Autocomplete, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DownloadOutlined, PrintOutlined } from '@mui/icons-material'
import { formatAndDownloadResponse, getCurrentDate } from 'utils/helpers'
import { GroupTable } from 'components/core-ui/GroupTable'
import { SubfamilyItem, TableItem, TableState } from './interfaces'
import { FamilyItem } from '../interfaces'
import { EditProduction } from './EditProduction'
import { URLS } from '../../constants'
import { EditActionIcon } from 'icons'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'
import { MetiModal } from './MetiModal'
dayjs.extend(customParseFormat)

const ProductionManagementStore = () => {
  const { showNotification } = useNotification()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isMetiModalOpen, setIsMetiModalOpen] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)
  const [metiProduct, setMetiProduct] = useState(null);

  const [tableState, setTableState] = useState<TableState>({
    order: null,
    orderBy: null,
    tableFilters: null
  })

  const [liveTableFilters, setLiveTableFilters] = React.useState<Filter[]>([])

  const familiesQuery = useQuery(
    [
      'cadentier-families-store',
      liveTableFilters.find(filter => filter.name === 'subfamily')?.value
    ],
    async () => {
      const subfamilyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'subfamily')
        ?.value || []) as AutoCompleteValue[]

      const result = await makeCoreGetRequest(`/bakery/store/cadentier/families`, {
        params: {
          subfamily: subfamilyLiveFilterValue.map(({ value }) => value)
        },
        paramsSerializer: { indexes: null }
      })

      const resultOptions = result?.map(
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
    [
      'cadentier-subfamilies-store',
      liveTableFilters.find(filter => filter.name === 'family')?.value
    ],
    async () => {
      const familyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'family')
        ?.value || []) as AutoCompleteValue[]
      const result = await makeCoreGetRequest('/bakery/store/cadentier/families/subfamilies', {
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
          orderBy,
          searchText,
          searchFields: [
            'productName',
            'productMetiCode',
            'average',
            'calculation',
            'quantityToProduce'
          ]
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

  const reportFileQuery = useQuery(
    ['report-download-store'],
    async () => {
      const url = toTableGETUrl({
        url: '/bakery/report/download/cadentier',
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

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)
  const openMetiModal = (product): void => {
    setIsMetiModalOpen(true)
    setMetiProduct(product)
  }
  const closeMetiModal = (): void => setIsMetiModalOpen(false)

  const selectRow = (rowId: number) => {
    setSelectedRowId(rowId)
    openEditModal()
  }

  const currentDate = getCurrentDate()

  const drawerFilters = [
    {
      name: 'date',
      value: currentDate,
      filter: (
        <DatePicker
          label="Planificare pentru"
          variant="outlined"
          value={currentDate}
          onChange={() => {}}
          required
        />
      ),
      type: 'date',
      label: 'Planificare pentru'
    },
    {
      name: 'family',
      value: undefined,
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
      label: 'Familie'
    },
    {
      name: 'subfamily',
      value: undefined,
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
        <Grid xs={12} item paddingTop={2}>
          <Divider />
        </Grid>
        <EditProduction
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editProductionId={selectedRowId}
          setShouldRefreshData={setShouldRefreshData}
        />
        <MetiModal
          isModalOpen={isMetiModalOpen}
          closeModal={closeMetiModal}
          metiProduct={metiProduct}
        />
        <GroupTable
          hideCheckbox
          columns={columns(openMetiModal)}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          stickyRatio={0.2}
          groupCount={3}
          frequency="day"
          hasStickyHeader
          maxHeight={'600px'}
          hasSearchInput
          toolbarActions={[
            {
              label: 'Descarca',
              icon: <DownloadOutlined />,
              onClick: () => reportFileQuery.refetch()
            },
            {
              label: 'Printeaza',
              icon: <PrintOutlined />
            }
          ]}
          showAbbrev
          hasPrintAction
          printUrl={URLS.AUTH_PRODUCTION_MANAGEMENT_STORE_PRINT}
          order={tableState.order}
          orderBy={tableState.orderBy}
          tableFilters={tableState.tableFilters}
          rowActions={[
            {
              label: 'Editeaza',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              onClick: (e, rowId) => selectRow(rowId),
              desktopIcon: <EditActionIcon />
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

export default ProductionManagementStore
