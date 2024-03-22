import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { SubFamilyValidityThresholdForm } from './SubFamilyValidityThresholdForm'
import { EditActionIcon } from 'icons'
import s from '../../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { Table } from 'components/core-ui/Table'
import { useQuery } from 'react-query'

const SubFamilyValidityThreshold = () => {
  const { showNotification } = useNotification()

  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [tableItems, setTableItems] = useState<SubFamilyValidityThreshold[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)

  const [selectedRow, setSelectedRow] = useState<SubFamilyValidityThreshold>()
  const selectRow = (rowId: number | string) => {
    const row = tableItems.find(item => item.id === rowId)
    row && setSelectedRow(row)
  }
  const openEditModal = (rowId: number | string) => {
    selectRow(rowId)
    setIsOpenEditModal(true)
  }
  const closeEditForm = () => setIsOpenEditModal(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/validity-limit',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
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

  const { data: metiFamilies } = useQuery(
    ['meti-families'],
    async () => {
      const data = await makeCoreGetRequest(`/products/meti-families`)
      return data.map(item => ({
        label: item.displayValue,
        value: item.code
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea familiilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: metiSubfamilies } = useQuery(
    ['meti-subfamilies'],
    async () => {
      const data = await makeCoreGetRequest(`/products/meti-sub-families`)
      return data.map(item => ({
        label: item.displayValue,
        value: item.code
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea subfamiliilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: metiRayons } = useQuery(
    ['meti-rayons'],
    async () => {
      const data = await makeCoreGetRequest(`/products/meti-rayons`)
      return data.map(item => ({
        label: item.displayValue,
        value: item.code
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea raioanelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )
  
  return (
    <div className={s.mainContainer}>
      <SubFamilyValidityThresholdForm
        isModalOpen={isOpenEditModal}
        closeModal={closeEditForm}
        setShouldRefreshData={setShouldRefreshData}
        editItem={selectedRow}
      />
      <Table
        hideCheckbox
        orderBy="role"
        order="asc"
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        filters={drawerFilters(metiFamilies, metiSubfamilies, metiRayons)}
        rowActions={[
          {
            label: 'Edit',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#16a085',
            desktopIcon: <EditActionIcon />,
            onClick: (e, rowId) => openEditModal(rowId)
          }
        ]}
        rowActionsWidth="130px"
      />
    </div>
  )
}

export default SubFamilyValidityThreshold
