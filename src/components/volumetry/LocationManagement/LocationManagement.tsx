import { useMemo, useState } from 'react'
import { Table } from 'components/core-ui/Table'
import s from './LocationManagement.modules.scss'
import { columns, getFilters } from './helpers'
import { CRUDAction, LocationManagementTableItem } from '../interfaces'
import { AddActionIcon, DeleteActionIcon, EditActionIcon } from 'icons'
import { useNotification } from 'hooks'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { handleQueryError } from 'utils/helpers'
import { toTableLocations } from './serializers'
import { EditLocation } from './EditLocation'
import { getCategoriesOptions, getRegionsOptions } from '../api'

const LocationManagement = () => {
  const [tableItems, setTableItems] = useState<LocationManagementTableItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const { data: regionsOptions } = getRegionsOptions(showNotification)
  const { data: categoryOptions } = getCategoriesOptions(showNotification)
  const locationTypeOptions = [
    { value: 'HYPER', label: 'Hyper' },
    { value: 'SUPER', label: 'Super' }
  ]

  const filters = useMemo(
    () => getFilters(regionsOptions || [], categoryOptions || [], locationTypeOptions || []),
    [regionsOptions, categoryOptions, locationTypeOptions]
  )

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      // const response = await makeCoreGetRequest(
      //   toTableGETUrl({
      //     url: '/volumetry/locations',
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
            name: 'Orhideea',
            region: 'Bucuresti',
            category: 'HYPER MAXI',
            locationType: 'HYPER'
          },
          {
            id: 2,
            name: 'Iulius',
            region: 'Cluj',
            category: 'HYPER',
            locationType: 'HYPER'
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

  const openModal = () => setIsEditModalOpen(true)

  const closeModal = () => setIsEditModalOpen(false)

  const selectRowId = (id: number) => {
    setSelectedRowId(id)
    openModal()
  }

  return (
    <div className={s.mainContainer}>
      <EditLocation
        isModalOpen={isEditModalOpen}
        closeModal={closeModal}
        editItemId={selectedRowId}
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
        filters={filters}
        rowActionsWidth="130px"
        rowActions={[
          {
            label: 'Editeaza',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <EditActionIcon />,
            onClick: (_e, rowId: number) => selectRowId(rowId)
          }
        ]}
      />
    </div>
  )
}
export default LocationManagement
