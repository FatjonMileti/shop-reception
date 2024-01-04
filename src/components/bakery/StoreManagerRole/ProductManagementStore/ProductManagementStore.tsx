import { Box, CircularProgress, Divider, Grid } from '@mui/material'
import s from '../../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import React, { useState } from 'react'
import { useNotification } from 'hooks'
import { ProductManagementItem } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useQuery } from 'react-query'
import { toTableRowItems } from './serializers'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { columns } from './helpers'
import { FamilyItem, SubfamilyItem } from '../interfaces'
import { EditProduct } from './EditProduct'
import { EditActionIcon } from 'icons'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'

const ProductManagementStore = () => {
  const [tableItems, setTableItems] = useState<ProductManagementItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)
  const [liveTableFilters, setLiveTableFilters] = React.useState<Filter[]>([])

  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters, searchText }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/product',
          searchText,
          searchFields: ['name', 'metiCode', 'pluCode', 'familyName'],
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
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const families = useQuery(
    ['families-store'],
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

  const subfamilies = useQuery(
    ['subfamilies-store',
      liveTableFilters.find(filter => filter.name === 'family')?.value
    ],
    async () => {
      const familyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'family')?.value || []) as AutoCompleteValue[];
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

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = (rowId: number) => {
    setSelectedRowId(rowId)
    openEditModal()
  }

  const drawerFilters = [
    {
      name: 'family',
      value: undefined,
      filter: (
        <Autocomplete
          variant="outlined"
          label="Familie"
          disableClearable
          options={families.data || []}
          multiple
        />
      ),
      type: 'autocomplete',
      label: 'Familie',
      clearFiltersOnChange: ['subfamily']
    },
     {
      name: 'subfamily',
      value: undefined,
      filter: (
        <Autocomplete
          variant="outlined"
          label="Subfamilie"
          disableClearable
          options={subfamilies.data || []}
          multiple
        />
      ),
      type: 'autocomplete',
      label: 'Subfamilie',
    },
    {
      name: 'scheduleProduct',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Produs cadentier"
          disableClearable
          options={[
            { value: 'true', label: 'Da' },
            { value: 'false', label: 'Nu' }
          ]}
        />
      ),
      type: 'autocomplete',
      label: 'Produs cadentier'
    },
  ]

  return (
    <div className={s.mainContainer}>
      <Box>
        {/*{subfamilies.isFetching || families.isFetching && (*/}
        {/*  <div style={{ display: 'flex' }}>*/}
        {/*    <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />*/}
        {/*  </div>*/}
        {/*)}*/}
        <Grid xs={12} item paddingTop={2}><Divider /></Grid>
        <EditProduct
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          editProductId={selectedRowId}
          setShouldRefreshData={setShouldRefreshData}
        />
        <Table
          hideCheckbox
          hasStickyHeader
          hasSearchInput
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          maxHeight="600px"
          stickyRatio={0.3}
          setShouldRefreshData={setShouldRefreshData}
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
          filters={drawerFilters}
          handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
          rowsPerPage={25}
          rowsPerPageOptions={[25, 50, 100]}
        />
      </Box>
    </div>
  )
}

export default ProductManagementStore
