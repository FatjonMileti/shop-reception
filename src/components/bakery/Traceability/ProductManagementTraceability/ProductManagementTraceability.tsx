import React from 'react'
import {
  AccordionDetailsWrapper,
  AccordionSummaryWrapper,
  BodyItem,
  HeaderItem
} from './AccordionTable'
import { Grid, Typography, useMediaQuery, debounce } from '@mui/material'
import { FamilyItem, ProductManagementItem, SubfamilyItem } from '../../StoreManagerRole/interfaces'
import { makeCoreGetRequest } from '../../../../utils/api'
import { toTableGETUrl } from '../../../core-ui/Table/serializers'
import { toTableRowItems } from '../../StoreManagerRole/ProductManagementStore/serializers'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { ValueLabelInterface } from '../../interfaces'
import { Autocomplete, ListTable } from '@fullscreendigital/carrefour-dex-fe'
import { useQuery } from 'react-query'
import s from '../../commonStyles.modules.scss'
import { TableFiltersType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'
import { ImageCell } from '../../../core-ui/ImageCell'
import { columns, headerItems } from './helpers'

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
          url: '/bakery/product/traceability',
          searchFields: [],
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
      const result = await makeCoreGetRequest(`/bakery/store/traceability/families`, {
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
      const result = await makeCoreGetRequest(`/bakery/store/traceability/families/subfamilies`, {
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

  const isXs = useMediaQuery('(max-width:624px)')

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
              <ImageCell value={''} imageUrl={item.imageUrl} />
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
        handleRemoteData={debounce(fetchData, 500)}
        rowActionsWidth="200px"
        rowsPerPage={isXs ? 5 : 25}
        rowsPerPageOptions={isXs ? [5, 10, 15] : [25, 50, 100]}
      />
    </div>
  )
}
