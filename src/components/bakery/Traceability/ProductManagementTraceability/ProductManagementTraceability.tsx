import React from 'react'
import {
  AccordionDetailsWrapper,
  AccordionSummaryWrapper,
  BodyItem,
  Column,
  HeaderItem
} from './AccordionTable'
import { debounce, Grid, Typography } from '@mui/material'
import { FamilyItem, ProductManagementItem, SubfamilyItem } from '../../StoreManagerRole/interfaces'
import { makeCoreGetRequest } from '../../../../utils/api'
import { toTableGETUrl } from '../../../core-ui/Table/serializers'
import { toTableRowItems } from '../../StoreManagerRole/ProductManagementStore/serializers'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { ValueLabelInterface } from '../../interfaces'
import { BooleanIcon } from '../../../core-ui/BooleanIcon'
import { DescriptionText } from '../../../core-ui/DescriptionText'
import { Autocomplete, ListTable } from '@fullscreendigital/carrefour-dex-fe'
import { useQuery } from 'react-query'
import s from '../../commonStyles.modules.scss'
import { TableFiltersType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'

const columns: Column[] = [
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
    field: 'suppliers'
  },
  {
    title: 'Lot',
    field: 'batch',
    render: row => (
      <BodyItem
        name="Lot"
        value={
          <BooleanIcon value={row.batch} icon="Flag" onFailure="#FFFFFF" onSuccess="#33691E" />
        }
      />
    )
  },
  {
    title: 'Metoda fabricatie',
    field: 'fabricationMethod',
    render: row => (
      <BodyItem
        name="Metoda fabricatie"
        value={<DescriptionText value={row.fabricationMethod} />}
      />
    )
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

const headerItems: Column[] = [
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
  }
]

export const ProductManagementTraceability = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [totalCount, setTotalCount] = React.useState<number>(0)
  const [tableItems, setTableItems] = React.useState<ProductManagementItem[]>([])
  const [liveTableFilters, setLiveTableFilters] = React.useState<Filter[]>([])
  const { showNotification } = useNotification()

  const fetchData = async (page, rowsPerPage, tableFilters, searchText) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/product',
          searchFields: ['name', 'metiCode', 'pluCode', 'familyName'],
          tableFilters,
          page,
          rowsPerPage,
          searchText
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

  const drawerFilters: TableFiltersType[] = [
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
      label: 'Subfamilie'
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
    }
  ]

  return (
    <div className={s.mainContainer}>
      <ListTable
        totalCount={totalCount}
        isLoading={isLoading}
        filters={drawerFilters}
        hasSearchInput
        handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
        rows={tableItems.map(item => ({
          id: item.id,
          summary: (
            <AccordionSummaryWrapper>
              <img src={'images/default-product-image.svg'} />
              <div className="title-and-content-wrapper">
                <Typography variant="medium" className="title">
                  {item.productName}
                </Typography>
                <div className="content-wrapper">
                  {headerItems.map((hc, cIndex) => (
                    <React.Fragment key={cIndex}>
                      {hc.render ? (
                        hc.render(item)
                      ) : (
                        <HeaderItem name={hc.title} value={item[hc.field]} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </AccordionSummaryWrapper>
          ),
          details: (
            <AccordionDetailsWrapper>
              <Grid container spacing={2} columns={12}>
                {columns.map((c, cIndex) => (
                  <React.Fragment key={cIndex}>
                    {c.render ? c.render(item) : <BodyItem name={c.title} value={item[c.field]} />}
                  </React.Fragment>
                ))}
              </Grid>
            </AccordionDetailsWrapper>
          ),
          borderLeftColor: '#0970E6'
        }))}
        handleRemoteData={ debounce(fetchData, 500) }
        rowActionsWidth="200px"
      />
    </div>
  )
}
