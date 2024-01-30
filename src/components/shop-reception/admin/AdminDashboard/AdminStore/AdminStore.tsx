import { Grid } from '../../../Common/Grid'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { Add as AddIcon } from '@mui/icons-material'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import { AdminStoreForm } from './AdminStoreForm'

const AdminStore = () => {
  const navigate = useNavigate()
  const [tableItems, setTableItems] = useState<AdminStore[]>([
    {
      id: 1,
      storeCode: '10',
      name: 'CLUJ',
      storeType: 'HYPER',
      METIVersion: 'V9',
      adCode: '9',
      grams: 100,
      region: '',
      ip: '10.191.47.22',
      way: '/default/',
      quantities: 'Nu',
      active: false,
      hourlyIntervals: 43
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<AdminStore>()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openEditModal = (rowId: number | string): void => {
    selectRow(rowId)
    setIsEditModalOpen(true)
  }
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = (rowId: number | string) => {
    const row = tableItems.find(item => item.id === rowId)
    if (row) {
      setSelectedRow(row)
    }
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/reception-mobile-api/rm-api/truck/list',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const responseList = response.list

      setTableItems(toTableRowItems(responseList))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Grid
      items={[
        <TitleHeader title='Administrare magazine' />,
        <>
          <AdminStoreForm
            isModalOpen={isNewModalOpen}
            closeModal={closeNewModal}
            setShouldRefreshData={setShouldRefreshData}
          />
          <AdminStoreForm
            isModalOpen={isEditModalOpen}
            closeModal={closeEditModal}
            setShouldRefreshData={setShouldRefreshData}
            editItem={selectedRow}
            isEdit
          />
          <Table
            hideCheckbox
            orderBy='role'
            order='asc'
            columns={columns}
            items={tableItems}
            fetchData={() => {
            }}
            isLoading={isLoading}
            totalCount={totalCount}
            newButton={{
              onClick: (): void => {
                openNewModal()
              }
            }}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
            rowActions={[
              {
                label: 'Edit',
                labelColor: 'white',
                typographyVariant: 'medium',
                backgroundColor: '#16a085',
                onClick: (e, rowId) => openEditModal(rowId)
              }
            ]}
            rowActionsWidth='130px'
            toolbarActions={[
              {
                label: 'Magazin',
                icon: <AddIcon />,
                onClick: openNewModal
              }
            ]}
          />
        </>
      ]}
      itemsPerRow={1}
    />
  )
}

export default AdminStore
