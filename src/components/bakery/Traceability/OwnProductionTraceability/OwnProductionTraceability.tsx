import { ListTable } from '@fullscreendigital/carrefour-dex-fe'
import s from './OwnProductionTraceability.modules.scss'
import { useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toListTableRows } from './serializers'
import { handleQueryError } from 'components/volumetry/utils'
import { useNotification } from 'hooks'
import { debounce } from '@mui/material'
import { AddActionIcon, EditActionIcon } from 'icons'
import OwnProductionTraceabilityDescription from './OwnProductionTraceabilityDescription'
import { OwnProductionTraceabilityModal } from './OwnProductionTraceabilityModal/OwnProductionTraceabilityModal'
import { EditOwnProductionTraceabilityModal } from './EditOwnProductionTraceabilityModal/EditOwnProductionTraceabilityModal'

export const OwnProductionTraceability = () => {
  const { showNotification } = useNotification()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableData, setTableData] = useState(null)
  const [rows, setRows] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [verifyItem, setVerifyItem] = useState(null)

  const fetchData = async (page, rowsPerPage, tableFilters, searchText) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/traceability/production',
          searchText,
          searchFields: ['productName'],
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
    const response = await makeCoreGetRequest(`/bakery/traceability/production/${rowId}`)
    const data = await response
    setEditItem(data)

    return <OwnProductionTraceabilityDescription item={data} chargeItem={tableData} />
  }

  return (
    <div className={s.mainContainer}>
      <>
        <OwnProductionTraceabilityModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          editItem={editItem}
          setEditItem={setEditItem}
          isEdit={isEdit}
        />
        <EditOwnProductionTraceabilityModal
          isModalOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          item={verifyItem}
        />
        <ListTable
          rows={rows}
          handleRemoteData={debounce(fetchData, 500)}
          handleRemoteDetails={handleRemoteDetails}
          isLoading={isLoading}
          totalCount={totalCount}
          hasSearchInput
          filters={[]} // Empty string must be provided in order to show toolbarActions. This line can be removed after fixing this in the UI Library
          toolbarActions={[
            {
              label: 'Adauga',
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
        />
      </>
    </div>
  )
}
