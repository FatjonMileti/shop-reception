import React, {  useState } from 'react'
import { AccordionTable, AccordionTableProps, BodyItem } from './AccordionTable'
import { CircularProgress, Divider, Grid } from '@mui/material'
import { FamilyItem, ProductManagementItem, SubfamilyItem } from '../../StoreManagerRole/interfaces'
import { makeCoreGetRequest } from '../../../../utils/api'
import { toTableGETUrl } from '../../../core-ui/Table/serializers'
import { toTableRowItems } from '../../StoreManagerRole/ProductManagementStore/serializers'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { ValueLabelInterface } from '../../interfaces'
import { BooleanIcon } from '../../../core-ui/BooleanIcon'
import { DescriptionText } from '../../../core-ui/DescriptionText'
import { Pagination } from '@fullscreendigital/carrefour-dex-fe'
import { useQuery } from 'react-query'
import { AsyncAutocomplete } from '../../../core-ui/AsyncAutocomplete'
import { StaticAutocomplete } from '../../../core-ui/StaticAutocomplete'
import s from '../../commonStyles.modules.scss'

const columns: AccordionTableProps['columns'] = [
  {
    title: 'Cod EAN',
    field: 'eanCodes'
  },
  {
    title: 'Cod PLU',
    field: 'pluCode'
  },
  {
    title: 'Cod APPEL PRIX',
    field: 'appelCodes'
  },
  {
    title: 'Raion',
    field: 'familyModuleName'
  },
  {
    title: 'UB',
    field: 'unitBusiness'
  },
  {
    title: 'Status',
    field: 'status'
  },
  {
    title: 'Furnizor',
    field: 'provider'
  },
  {
    title: 'Metoda fabricatie',
    field: 'fabricationMethod',
    render: row => <DescriptionText value={row.fabricationMethod} />
  },
  {
    field: 'clusterName',
    render: data => <BodyItem name="Cluster" value={data.clusterName} />
  },
  {
    field: 'clusterMandatory',
    render: data => (
      <BodyItem
        name="Obligatoriu"
        value={
          <BooleanIcon
            value={data.clusterMandatory}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    field: 'scheduleProduct',
    render: data => (
      <BodyItem
        name="Produs cadentier"
        value={
          <BooleanIcon
            value={data.scheduleProduct}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    field: 'minStock',
    title: 'Stoc minim prezentare'
  },
  {
    render: data => (
      <BodyItem
        name="Produs nou"
        value={
          <BooleanIcon
            value={data.newProduct}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    ),
    field: 'newProduct'
  }
]

const headerItems: AccordionTableProps['headerItems'] = [
  {
    title: 'Cod METI',
    field: 'metiCode'
  },
  {
    title: 'Familie',
    field: 'familyName'
  },
  {
    title: 'Subfamilie',
    field: 'subfamily'
  },
]

export const ProductManagementTraceability = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [totalCount, setTotalCount] = React.useState<number>(0)
  const [tableItems, setTableItems] = React.useState<ProductManagementItem[]>([])
  const [pageCount, setPageCount] = React.useState(0)
  const [page, setPage] = React.useState(0)

  const [subfamiliesFilterValue, setSubfamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [familiesFilterValue, setFamiliesFilterValue] = useState<ValueLabelInterface[]>([])
  const [productFilterValue, setProductFilterValue] = useState<ValueLabelInterface>()

  const { showNotification } = useNotification()

  React.useEffect(() => {
    fetchData({
      page: page,
      rowsPerPage: 10,
      order: undefined,
      orderBy: undefined,
      tableFilters: [],
      searchText: ''
    })
  }, [page, familiesFilterValue, subfamiliesFilterValue, productFilterValue])

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
          filters: filters,
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
      setPageCount(response.page.pageCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const onPageChange = (e, p) => {
    setPage(p - 1)
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
          message: `Error while fetching subfamilies dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const handleSubfamiliesChange = (value: ValueLabelInterface[]): void => {
    setSubfamiliesFilterValue(value)
  }

  const handleProductChange = (value: ValueLabelInterface): void => {
    setProductFilterValue(value)
  }

  const handleFamiliesChange = (value: ValueLabelInterface[]): void => {
    setFamiliesFilterValue(value)
    setSubfamiliesFilterValue([])
  }

  return (
    <div className={s.mainContainer}>
      {isLoading || subfamilies.isFetching || families.isFetching ? (
        <div style={{ display: 'flex' }}>
          <CircularProgress color='primary' style={{ margin: '40px auto' }} disableShrink />
        </div>
      ) : (
        <>
          <Grid xs={12} md={12} container gap={2}>
            <Grid xs={12} md={3} item>
              <AsyncAutocomplete
                variant='outlined'
                name='family'
                label='Familie'
                value={familiesFilterValue}
                options={families.data || []}
                onChange={handleFamiliesChange}
                multiple
              />
            </Grid>
            <Grid xs={12} md={3} item>
              <AsyncAutocomplete
                variant='outlined'
                name='subfamily'
                label='Subfamilie'
                value={subfamiliesFilterValue}
                options={subfamilies.data || []}
                onChange={handleSubfamiliesChange}
                multiple
              />
            </Grid>
            <Grid xs={12} md={3} item>
              <StaticAutocomplete
                variant='outlined'
                name='scheduleProduct'
                label='Produs cadentier'
                value={productFilterValue}
                options={[
                  { value: true, label: 'Da' },
                  { value: false, label: 'Nu' }
                ]}
                onChange={handleProductChange}
              />
            </Grid>
          </Grid>

          <Grid xs={12} item paddingTop={2}>
            <Divider />
          </Grid>

          <div style={{ display: 'grid', rowGap: '24px' }}>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <AccordionTable
                headerItems={headerItems}
                columns={columns}
                tableItems={tableItems}
              />
            </div>

            <Pagination
              count={pageCount}
              onChange={onPageChange}
              shape='rounded'
              variant='outlined'
              showFirstButton
              showLastButton
            />
          </div>
        </>
      )}
    </div>
  )
}
