import { Autocomplete, DatePicker, ListTable } from '@fullscreendigital/carrefour-dex-fe'
import s from './FrozenTraceability.modules.scss'
import React, { useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { handleQueryError } from 'components/volumetry/utils'
import { useNotification } from 'hooks'
import { debounce } from '@mui/material'
import { EditActionIcon } from 'icons'
import FrozenTraceabilityDescription from './FrozenTraceabilityDescription'
import { TableFiltersType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table'
import { useQuery } from 'react-query'
import { FamilyItem, SubfamilyItem } from '../ReceivedProducts/interfaces'
import { ValueLabelInterface } from '../../interfaces'
import { formatErrorMessage } from '../../../../utils/formatting'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'
import { getCurrentDate } from '../../../../utils/helpers'

export const ReportFrozenTraceability = () => {
  const { showNotification } = useNotification()

  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rows, setRows] = useState([])

  const [liveTableFilters, setLiveTableFilters] = React.useState<Filter[]>([])

  const handleRemoteDetails = async (rowId: string | number) => {
    const response = await makeCoreGetRequest(`/bakery/traceability/frozen/${rowId}`)
    const data = await response
    return <FrozenTraceabilityDescription item={data} />
  }

  const fetchData = async (page, rowsPerPage, tableFilters, searchText) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/traceability/frozen',
          tableFilters,
          page,
          rowsPerPage,
          searchText,
          searchFields: [
            'productName',
          ]
        })
      )

      setRows(toListTableRows(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      handleQueryError(
        error,
        'A aparut o eroare la obtinerea datelor pentru tabel.',
        showNotification
      )
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

  const currentDate = getCurrentDate()

  const drawerFilters: TableFiltersType[] = [
    {
      name: 'product',
      value: undefined,
      filter: (
        <Autocomplete
          variant="outlined"
          label="Produs"
          disableClearable
          options={[]}
          multiple
        />
      ),
      type: 'autocomplete',
      label: 'Produs'
    },
    {
      name: 'dateFrom',
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
      name: 'dateTo',
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
      label: 'Familie produse',
      clearFiltersOnChange: ['subfamily']
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
      <>
        <ListTable
          rows={rows}
          handleRemoteData={debounce(fetchData, 500)}
          handleRemoteDetails={handleRemoteDetails}
          isLoading={isLoading}
          totalCount={totalCount}
          filters={drawerFilters}
          hasSearchInput
          toolbarActions={
            [
              // {
              //   label: 'Add',
              //   onClick: () => {
              //     setIsModalOpen(true)
              //     setIsEdit(false)
              //   },
              //   icon: <AddActionIcon />
              // }
            ]
          }
          rowActions={[
            {
              label: 'Editeaza',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#0970E6',
              onClick: async (e, rowId) => {},
              desktopIcon: <EditActionIcon />
            }
          ]}
          rowActionsWidth="90px"
        />
      </>
    </div>
  )
}
