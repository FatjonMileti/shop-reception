import { Autocomplete, ListTable } from '@fullscreendigital/carrefour-dex-fe'
import s from './FrozenTraceability.modules.scss'
import React, { useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { handleQueryError } from 'utils/helpers'
import { useNotification } from 'hooks'
import { debounce, useMediaQuery } from '@mui/material'
import { AddActionIcon, EditActionIcon } from 'icons'
import FrozenTraceabilityDescription from './FrozenTraceabilityDescription'
import { AddFrozenTraceabilityModal } from './AddFrozenTraceabilityModal/AddFrozenTraceabilityModal'
import { EditFrozenTraceabilityModal } from './EditFrozenTraceabilityModal/EditFrozenTraceabilityModal'
import { TableFiltersType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table'
import { useQuery } from 'react-query'
import { FamilyItem, SubfamilyItem } from '../ReceivedProducts/interfaces'
import { ValueLabelInterface } from '../../interfaces'
import { formatErrorMessage } from '../../../../utils/formatting'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'
import { CorrectFrozenTraceabilityModal } from './CorrectFrozenTraceabilityModal/CorrectFrozenTraceabilityModal'

const orderBy = 'createdDate'
const order = 'desc'

export const FrozenTraceability = () => {
  const { showNotification } = useNotification()

  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableData, setTableData] = useState(null)
  const [rows, setRows] = useState([])
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [verifyItem, setVerifyItem] = useState(null)
  const [liveTableFilters, setLiveTableFilters] = React.useState<Filter[]>([])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [itemIdToCorrect, setItemIdToCorrect] = useState(null)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const fetchData = async (page, rowsPerPage, tableFilters, searchText) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/traceability/frozen',
          tableFilters,
          page,
          rowsPerPage,
          orderBy,
          order,
          searchText,
          searchFields: ['product.metiCode', 'product.name']
        })
      )
      setRows(toListTableRows(response.list))
      setTotalCount(response.page.totalCount)
      setTableData(response.list)
      setIsLoading(false)
    } catch (error) {
      handleQueryError(
        error,
        'A aparut o eroare la obtinerea datelor pentru tabel.',
        showNotification
      )
    }
  }

  const fetchFrozenItem = async (rowId: string | number) => {
    return await makeCoreGetRequest(`/bakery/traceability/frozen/${rowId}`)
  }

  const itemToCorrectQuery = useQuery(
    ['traceability-item-frozen', itemIdToCorrect],
    async () => {
      return await fetchFrozenItem(itemIdToCorrect)
    },
    {
      enabled: !!itemIdToCorrect,
    }
  )


  const handleRemoteDetails = async (rowId: string | number) => {
    const data = await fetchFrozenItem(rowId)
    return (
      <FrozenTraceabilityDescription
        chargeItem={tableData?.find(d => d.id === rowId)}
        item={data}
      />
    )
  }

  const families = useQuery(
    ['families-store', liveTableFilters.find(filter => filter.name === 'product.subfamily')?.value],
    async () => {
      const subfamilyLiveFilterValue = (liveTableFilters.find(
        filter => filter.name === 'product.subfamily'
      )?.value || []) as AutoCompleteValue[]

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
    ['subfamilies-store', liveTableFilters.find(filter => filter.name === 'product.family')?.value],
    async () => {
      const familyLiveFilterValue = (liveTableFilters.find(
        filter => filter.name === 'product.family'
      )?.value || []) as AutoCompleteValue[]
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
      name: 'product.family',
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
      name: 'product.subfamily',
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
    }
  ]

  const isXs = useMediaQuery('(max-width:624px)')

  return (
    <div className={s.mainContainer}>
      <>
        <AddFrozenTraceabilityModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          setShouldRefreshData={setShouldRefreshData}
        />
        <CorrectFrozenTraceabilityModal
          isModalOpen={!!itemIdToCorrect}
          closeModal={() => {
            setItemIdToCorrect(null)
          }}
          itemToCorrectQuery={itemToCorrectQuery}
        />
        <EditFrozenTraceabilityModal
          isModalOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          item={verifyItem}
        />
        <ListTable
          rows={rows}
          handleRemoteData={debounce(fetchData, 500)}
          handleRemoteDetails={handleRemoteDetails}
          hasSearchInput
          isLoading={isLoading}
          totalCount={totalCount}
          handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
          filters={drawerFilters}
          toolbarActions={[
            {
              label: 'Add',
              onClick: () => {
                setIsModalOpen(true)
              },
              icon: <AddActionIcon />
            }
          ]}
          rowActions={[
            {
              label: 'Corectie',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#CC4010',
              onClick: async (e, rowId) => {
                setItemIdToCorrect(rowId)
              },
              desktopIcon: <EditActionIcon />
            },
            {
              label: 'Editeaza',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#0970E6',
              onClick: async (e, rowId) => {
                setIsEditModalOpen(true)
                setVerifyItem(tableData.find(data => data.id === rowId))
              },
              desktopIcon: <EditActionIcon />
            }
          ]}
          rowActionsWidth="200px"
          rowsPerPage={isXs ? 5 : 25}
          rowsPerPageOptions={isXs ? [5, 10, 15] : [25, 50, 100]}
          setShouldRefreshData={setShouldRefreshData}
          shouldRefreshData={shouldRefreshData}
        />
      </>
    </div>
  )
}
