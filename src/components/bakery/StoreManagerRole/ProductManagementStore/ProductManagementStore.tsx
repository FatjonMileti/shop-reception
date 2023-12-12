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
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { columns } from './helpers'
import { FamilyItem, SubfamilyItem } from '../interfaces'
import { StaticAutocomplete } from '../../../core-ui/StaticAutocomplete'
import { EditProduct } from './EditProduct'

const ProductManagementStore = () => {
  const [tableItems, setTableItems] = useState<ProductManagementItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [subfamiliesFilterValue, setSubfamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [productFilterValue, setProductFilterValue] = useState<ValueLabelInterface>()

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)

  const { showNotification } = useNotification()

  const filters = React.useMemo(() => {
    return [
      { name: 'family', value: familiesFilterValue?.map(val => val.value) },
      { name: 'subfamily', value: subfamiliesFilterValue?.map(val => val.value) },
      { name: 'scheduleProduct', value: productFilterValue?.value }
    ].filter(
      f => (Array.isArray(f.value) && f.value.length) > 0 || (!Array.isArray(f.value) && f.value)
    )
  }, [familiesFilterValue, subfamiliesFilterValue, productFilterValue])

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters, searchText }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/product',
          filters,
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
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const subfamilies = useQuery(
    ['subfamilies-store', familiesFilterValue.map(({ value }) => value)],
    async () => {
      const result = await makeCoreGetRequest(`/bakery/store/families/subfamilies`, {
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

  const handleProductChange = (value: ValueLabelInterface): void => {
    setProductFilterValue(value)
    setShouldRefreshData(true)
  }

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = (rowId: number) => {
    setSelectedRowId(rowId)
    openEditModal()
  }

  return (
    <div className={s.mainContainer}>
      <Box>
        {subfamilies.isFetching || families.isFetching ? (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        ) : (
          <Grid xs={12} md={12} container justifyContent={'space-between'}>
            <Grid xs={12} md={3} item>
              <AsyncAutocomplete
                variant="outlined"
                name="family"
                label="Familie"
                value={familiesFilterValue}
                options={families.data || []}
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
                options={subfamilies.data || []}
                onChange={handleSubfamiliesChange}
                multiple
              />
            </Grid>
            <Grid xs={12} md={3} item>
              <StaticAutocomplete
                applyCustomStyle
                variant="outlined"
                name="scheduleProduct"
                label="Produs cadentier"
                value={productFilterValue}
                options={[
                  { value: true, label: 'Da' },
                  { value: false, label: 'Nu' }
                ]}
                onChange={handleProductChange}
              />
            </Grid>
          </Grid>
        )}

        <Grid xs={12} item paddingTop={2}>
          <Divider />
        </Grid>
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
              onClick: (e, rowId) => selectRow(rowId)
            }
          ]}
          rowActionsWidth="130px"
        />
      </Box>
    </div>
  )
}

export default ProductManagementStore
