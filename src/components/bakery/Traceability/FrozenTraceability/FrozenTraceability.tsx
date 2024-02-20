import { Autocomplete, ListTable } from '@fullscreendigital/carrefour-dex-fe'
import s from './FrozenTraceability.modules.scss'
import React, { useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { handleQueryError } from 'utils/helpers'
import { useNotification } from 'hooks'
import { debounce } from '@mui/material'
import { AddActionIcon, EditActionIcon } from 'icons'
import FrozenTraceabilityDescription from './FrozenTraceabilityDescription'
import { FrozenTraceabilityModal } from './FrozenTraceabilityModal/FrozenTraceabilityModal'
import { EditFrozenTraceabilityModal } from './EditFrozenTraceabilityModal/EditFrozenTraceabilityModal'
import { TableFiltersType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table'
import { useQuery } from 'react-query'
import { FamilyItem, SubfamilyItem } from '../ReceivedProducts/interfaces'
import { ValueLabelInterface } from '../../interfaces'
import { formatErrorMessage } from '../../../../utils/formatting'
import { AutoCompleteValue, Filter } from '../../../core-ui/Table/TableDefinitions'

const orderBy = 'createdDate'
const order = 'desc'

export const FrozenTraceability = () => {
  const { showNotification } = useNotification()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableData, setTableData] = useState(null)
  const [rows, setRows] = useState([])
  const [editItem, setEditItem] = useState<any>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [verifyItem, setVerifyItem] = useState(null)
  const [liveTableFilters, setLiveTableFilters] = React.useState<Filter[]>([])

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
          searchFields: [
            'product.metiCode',
            'product.name',
          ]
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
    const response = await makeCoreGetRequest(`/bakery/traceability/frozen/${rowId}`)
    const data = await response
    setEditItem(data)
    

    return <FrozenTraceabilityDescription chargeItem={tableData} item={data} />
  }

  const families = useQuery(
    ['families-store', liveTableFilters.find(filter => filter.name === 'product.subfamily')?.value],
    async () => {
      const subfamilyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'product.subfamily')
        ?.value || []) as AutoCompleteValue[]

      const result = await makeCoreGetRequest(
        `/bakery/store/families`,
        {
          params: {
            subfamily: subfamilyLiveFilterValue.map(({ value }) => value)
          },
          paramsSerializer: { indexes: null }
        }
      )
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
      const familyLiveFilterValue = (liveTableFilters.find(filter => filter.name === 'product.family')
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
      label: 'Familie',
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


  return (
    <div className={s.mainContainer}>
      <>
        <FrozenTraceabilityModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          editItem={editItem}
          setEditItem={setEditItem}
          isEdit={isEdit}
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
                setIsEdit(false)
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
                setIsEdit(true)
                setIsModalOpen(true)
                await handleRemoteDetails(rowId)
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
          rowActionsWidth="90px"
          rowsPerPage={25}
          rowsPerPageOptions={[25, 50, 100]}
        />
      </>
    </div>
  )
}
