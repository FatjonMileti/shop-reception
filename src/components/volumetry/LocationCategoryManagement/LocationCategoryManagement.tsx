import { useState } from 'react'
import { Table } from 'components/core-ui/Table'
import s from './LocationCategoryManagement.modules.scss'
import { columns } from './helpers'
import {
  CRUDAction,
  LocationCategoryManagementTableItem,
  LocationManagementTableItem
} from '../interfaces'
import { AddActionIcon, DeleteActionIcon, EditActionIcon } from 'icons'
import { useNotification } from 'hooks'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { handleQueryError } from 'utils/helpers'
import { toTableLocations } from './serializers'
import { CreateEditLocationCategory } from './CreateEditLocationCategory'
import { DeleteLocationCategory } from './DeleteLocationCategory'

const LocationCategoryManagement = () => {
  const [tableItems, setTableItems] = useState<LocationCategoryManagementTableItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<LocationCategoryManagementTableItem>(null)
  const [modal, setModal] = useState<CRUDAction>(null)

  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      // const response = await makeCoreGetRequest(
      //   toTableGETUrl({
      //     url: '/volumetry/regions',
      //     tableFilters,
      //     page,
      //     rowsPerPage,
      //     order,
      //     orderBy
      //   })
      // )
      const response = {
        list: [
          {
            id: 1,
            name: 'HYPER MAXI',
            description: 'Lorem ipsum 1'
          },
          {
            id: 2,
            name: 'HYPER',
            description: 'Lorem ipsum 2'
          }
        ],
        page: {
          totalCount: 2
        }
      }
      setTableItems(toTableLocations(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      handleQueryError(error, 'Error while fetching table data', showNotification)
    }
  }

  const openModal = (action: CRUDAction) => setModal(action)

  const closeModal = () => setModal(null)

  const selectRow = (id: number, action: CRUDAction) => {
    const row = tableItems.find(item => item.id === id)
    setSelectedRow(row)
    openModal(action)
  }

  return (
    <div className={s.mainContainer}>
      <CreateEditLocationCategory
        isModalOpen={modal === 'create'}
        closeModal={closeModal}
        setShouldRefreshData={setShouldRefreshData}
      />
      <CreateEditLocationCategory
        isModalOpen={modal === 'edit'}
        closeModal={closeModal}
        editItem={selectedRow}
        setShouldRefreshData={setShouldRefreshData}
        isEdit
      />
      <DeleteLocationCategory
        isModalOpen={modal === 'delete'}
        closeModal={closeModal}
        itemId={selectedRow?.id}
        setShouldRefreshData={setShouldRefreshData}
      />
      <Table
        hideCheckbox
        orderBy="name"
        order="desc"
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        rowActionsWidth="130px"
        toolbarActions={[
          {
            label: 'Adauga',
            icon: <AddActionIcon />,
            onClick: () => openModal('create')
          }
        ]}
        rowActions={[
          {
            label: 'Editeaza',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <EditActionIcon />,
            onClick: (_e, rowId: number) => selectRow(rowId, 'edit')
          },
          {
            label: 'Delete',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#d9534f',
            desktopIcon: <DeleteActionIcon />,
            onClick: (_e, rowId: number) => selectRow(rowId, 'delete')
          }
        ]}
      />
    </div>
  )
}
export default LocationCategoryManagement
