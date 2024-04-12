import { Autocomplete, ListTable } from '@fullscreendigital/carrefour-dex-fe'
import s from './OwnProductionTraceability.modules.scss'
import { useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { useNotification } from 'hooks'
import { debounce, useMediaQuery } from '@mui/material'
import { AddActionIcon, EditActionIcon } from 'icons'
import OwnProductionTraceabilityDescription from './OwnProductionTraceabilityDescription'
import { AddOwnProductionTraceabilityModal } from './AddOwnProductionTraceabilityModal/AddOwnProductionTraceabilityModal'
import { EditOwnProductionTraceabilityModal } from './EditOwnProductionTraceabilityModal/EditOwnProductionTraceabilityModal'
import { handleQueryError } from 'utils/helpers'
import { TableFiltersType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table'
import { useQuery } from 'react-query'
import { ValueLabelInterface } from 'components/bakery/interfaces'
import { FamilyItem, SubfamilyItem } from '../ReceivedProducts/interfaces'
import { formatErrorMessage } from 'utils/formatting'
import { CorrectOwnProductionTraceabilityModal } from './CorrectOwnProductionTraceabilityModal/CorrectOwnProductionTraceabilityModal'
import { Filter } from '../../../core-ui/Table/TableDefinitions'
import dayjs from 'dayjs'

export const OwnProductionTraceability = () => {
  const { showNotification } = useNotification()

  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [rows, setRows] = useState([])

  const [liveTableFilters, setLiveTableFilters] = useState<Filter[]>([])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [itemIdToCorrect, setItemIdToCorrect] = useState(null)
  const [itemIdToEdit, setItemIdToEdit] = useState<number | undefined>(undefined)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const fetchData = async (page, rowsPerPage, tableFilters, searchText) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/traceability/production',
          searchText,
          searchFields: ['product.name'],
          tableFilters,
          page,
          rowsPerPage
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
  const handleRemoteDetails = async (rowId: string | number) => {
    const data = await fetchProductionItem(rowId)
    return <OwnProductionTraceabilityDescription item={data} />
  }

  const fetchProductionItem = async (rowId: string | number) => {
    return await makeCoreGetRequest(`/bakery/traceability/production/${rowId}`)
  }

  const correctItemQuery = useQuery(
    ['own-production-traceability-item', itemIdToCorrect],
    async () => {
      return await fetchProductionItem(itemIdToCorrect)
    },
    {
      enabled: !!itemIdToCorrect
    }
  )

  const families = useQuery(
    ['families-store', liveTableFilters.find(filter => filter.name === 'product.subfamily')?.value],
    async () => {
      const subfamilyLiveFilterValue = (liveTableFilters.find(
        filter => filter.name === 'product.subfamily'
      )?.value || []) as any

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
    ['subfamilies-store', liveTableFilters.find(filter => filter.name === 'product.family')?.value],
    async () => {
      const familyLiveFilterValue = (liveTableFilters.find(
        filter => filter.name === 'product.family'
      )?.value || []) as any
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
        <AddOwnProductionTraceabilityModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          setShouldRefreshData={setShouldRefreshData}
        />
        <CorrectOwnProductionTraceabilityModal
          isModalOpen={!!itemIdToCorrect}
          closeModal={() => {
            setItemIdToCorrect(null)
          }}
          correctItemQuery={correctItemQuery}
        />
        <EditOwnProductionTraceabilityModal
          closeModal={() => setItemIdToEdit(undefined)}
          itemIdToEdit={itemIdToEdit}
          setShouldRefreshData={setShouldRefreshData}
        />
        <ListTable
          rows={rows}
          handleRemoteData={debounce(fetchData, 500)}
          handleRemoteDetails={handleRemoteDetails}
          handleFilterChangeLive={liveFilters => setLiveTableFilters(liveFilters)}
          isLoading={isLoading}
          totalCount={totalCount}
          hasSearchInput
          filters={drawerFilters}
          appliedFiltersLabel="Filtre"
          applyFiltersButtonLabel="Filtrare"
          filtersLabel="Filtrare"
          filtersButtonLabel="Filtrare"
          cancelFiltersButtonLabel="Anuleaza"
          toolbarActions={[
            {
              label: 'Adauga',
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
                const createdDay = dayjs(tableData.find(row => row.id === rowId)?.createdDate)

                if (createdDay.endOf('day').isBefore(dayjs().endOf('day'))) {
                  showNotification({
                    message: 'Nu puteti edita trasabilitati mai vechi de astazi.',
                    type: 'error'
                  })
                  return
                }

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
                setItemIdToEdit(rowId as number)
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
