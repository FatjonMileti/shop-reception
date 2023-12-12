import s from '../../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { Box } from '@mui/material'

import { columns, getInitialValues } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { EditGrowthIndex } from './EditGrowthIndex'
import { GrowthIndex } from './interfaces'
import { EditActionHome } from 'icons'

const GrowthIndexStore = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [tableItems, setTableItems] = useState<GrowthIndex[]>([])
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)

  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/bakery/store/growth`,
          filters: [],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )
      setTableItems(response.list.map(getInitialValues))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = (rowId: number) => {
    setSelectedRowId(rowId)
    openEditModal()
  }

  return (
    <div className={s.mainContainer}>
      <Box>
        <Table
          columns={columns}
          width="100%"
          hideCheckbox
          isLoading={isLoading}
          items={tableItems}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          fetchData={fetchData}
          rowActions={[
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              onClick: (e, rowId) => selectRow(rowId),
              desktopIcon: <EditActionHome />
            }
          ]}
        />
      </Box>
      <EditGrowthIndex
        isModalOpen={isEditModalOpen}
        closeModal={closeEditModal}
        editGrowthIndexId={selectedRowId}
        setShouldRefreshData={setShouldRefreshData}
      />

    </div>
  )
}

export default GrowthIndexStore