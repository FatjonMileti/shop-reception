import s from '../../commonStyles.modules.scss'
import { Autocomplete, ListTable } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { TableFiltersType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../utils/api'
import { FamilyItem, ProductManagementItem, SubfamilyItem } from '../../StoreManagerRole/interfaces'
import { ValueLabelInterface } from '../../interfaces'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'
import { toTableGETUrl } from '../../../core-ui/Table/serializers'
import { toTableRowItems } from './helper'
import {
  AccordionDetailsWrapper,
  AccordionSummaryWrapper,
  BodyItem,
  HeaderItem
} from '../ProductManagementTraceability/AccordionTable'
import { Grid, Typography } from '@mui/material'
import AddActionIcon from '../../../../icons/AddActionIcon'
import { AddReceivedProduct } from './AddReceivedProduct/AddReceivedProduct'

import {columns, headerItems} from './helper'


export const ReceivedProducts = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [totalCount, setTotalCount] = React.useState<number>(0)
  const [tableItems, setTableItems] = React.useState<ProductManagementItem[]>([])
  const [liveTableFilters, setLiveTableFilters] = React.useState<Filter[]>([])

  const [isAddModalOpen, setAddModalOpen] = React.useState<boolean>(false)
  const { showNotification } = useNotification()

  const fetchData = async (page, rowsPerPage, tableFilters) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/product',
          // searchFields: ['name', 'metiCode', 'pluCode', 'familyName'],
          tableFilters,
          page,
          rowsPerPage
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
      <AddReceivedProduct
        isModalOpen={isAddModalOpen}
        closeModal={() => setAddModalOpen(false)}
      />
      <ListTable
        totalCount={totalCount}
        isLoading={isLoading}
        filters={drawerFilters}
        handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
        handleRemoteData={fetchData}
        rows={tableItems.map(item => ({
          id: item.id,
          summary: (
            <AccordionSummaryWrapper>
              <img src={'images/default-product-image.svg'} />
              <div className="title-and-content-wrapper">
                <Typography variant="medium" className="title">
                  Paine 7 seminte
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
        toolbarActions={[
          {
            label: 'Add',
            onClick: () => {
              setAddModalOpen(true)
            },
            icon: <AddActionIcon />
          }
        ]}

        rowActionsWidth="200px"
      />
    </div>
  )
}
