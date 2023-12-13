import React, { useState } from 'react'
import s from '../../commonStyles.modules.scss'
import { useQuery } from 'react-query'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { CircularProgress, Divider, Grid } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns } from './helpers'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DownloadOutlined, PrintOutlined } from '@mui/icons-material'
import { formatAndDownloadResponse, formatPayloadDate } from 'utils/helpers'
import { GroupTable } from 'components/core-ui/GroupTable'
import { SubfamilyItem, TableItem, TableState } from './interfaces'
import { FamilyItem } from '../interfaces'
import { EditProduction } from './EditProduction'
import { URLS } from '../../constants'
dayjs.extend(customParseFormat)
import {EditActionIcon} from 'icons'
const ProductionManagementStore = () => {
  const { showNotification } = useNotification()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const [planningDate, setPlanningDate] = useState(dayjs())
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [subfamiliesFilterValue, setSubfamiliesFilterValue] = useState<ValueLabelInterface[]>([])

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)

  const [tableState, setTableState] = useState<TableState>({
    order: null,
    orderBy: null,
    tableFilters: null
  })

  const familiesQuery = useQuery(
    ['cadentier-families-store'],
    async () => {
      const result = await makeCoreGetRequest(`/bakery/store/cadentier/families`)

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
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const subfamiliesQuery = useQuery(
    ['subfamilies', familiesFilterValue.map(({ value }) => value)],
    async () => {
      const result = await makeCoreGetRequest('/bakery/store/cadentier/families/subfamilies', {
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
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const handleFamiliesChange = (value: ValueLabelInterface[]): void => {
    setFamiliesFilterValue(value)
    setSubfamiliesFilterValue([])
    setShouldRefreshData(true)
  }

  const handleSubfamiliesChange = (value: ValueLabelInterface[]): void => {
    setSubfamiliesFilterValue(value)
    setShouldRefreshData(true)
  }

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
          filters,
          page,
          rowsPerPage: 25,
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

  const reportFileQuery = useQuery(
    ['report-download-store'],
    async () => {

      const url = toTableGETUrl({
        url: '/bakery/report/download/cadentier',
        filters: [
          { name: 'date', value: formatPayloadDate(planningDate) },
          { name: 'family', value: familiesFilterValue?.map(val => val.value) },
          { name: 'subfamily', value: subfamiliesFilterValue?.map(val => val.value) }
        ].filter(
          f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
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

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = (rowId: number) => {
    setSelectedRowId(rowId)
    openEditModal()
  }

  return (
    <div className={s.mainContainer}>
      <Grid container>
        {familiesQuery.isLoading || subfamiliesQuery.isLoading || reportFileQuery.isLoading ? (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        ) : (
          <>
            <Grid xs={12} md={12} container justifyContent={'space-between'}>
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

            <EditProduction
              isModalOpen={isEditModalOpen}
              closeModal={closeEditModal}
              editProductionId={selectedRowId}
              setShouldRefreshData={setShouldRefreshData}
            />

            <GroupTable
              hideCheckbox
              columns={columns}
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
                  label: 'Edit',
                  labelColor: 'white',
                  typographyVariant: 'medium',
                  backgroundColor: '#16a085',
                  onClick: (e, rowId) => selectRow(rowId),
                  desktopIcon: <EditActionIcon />
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

export default ProductionManagementStore
