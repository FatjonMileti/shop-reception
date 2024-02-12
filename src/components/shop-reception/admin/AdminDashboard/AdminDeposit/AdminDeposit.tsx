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
import { AdminDepositModal } from './AdminDepositModal'
import { Grid } from '../../../Common/Grid'
import { EditActionIcon } from 'icons'
import { Box } from '@mui/material'
import s from './AdminDeposit.modules.scss'

const AdminDeposit = () => {
  const [tableItems, setTableItems] = useState<AdminDeposit[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<AdminDeposit>()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openEditModal = () => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = (rowId: number | string) => {
    setSelectedRow(tableItems.find(item => item.id === rowId))
    openEditModal()
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy }) => {
    setIsLoading(true)
    try {
      // const response = await makeCoreGetRequest(
      //   toTableGETUrl({
      //     url: '/shop-reception/deposits',
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
            code: 'BDU',
            name: 'DEPOZIT CONGELATE',
            type: 'Frozen',
            validityPercentage: 75,
            active: true,
            address: 'strada florilor',
            emails: ['abc', 'cdf'],
            depositUsers: ['user01']
          },
          {
            id: 2,
            code: 'BDU',
            name: 'DEPOZIT CONGELATE',
            type: 'Ambient',
            validityPercentage: null,
            active: false,
            address: 'strada agnita',
            emails: ['abc', 'cdf'],
            depositUsers: ['paula']
          }
        ],
        page: { totalCount: 2 }
      }

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

  return (
    <div className={s.mainContainer}>
      <Box>
        <AdminDepositModal
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <AdminDepositModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          setShouldRefreshData={setShouldRefreshData}
          editItem={selectedRow}
          isEdit
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
          newButton={{
            onClick: (): void => {
              openNewModal()
            }
          }}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActionsWidth="130px"
          toolbarActions={[
            {
              label: 'Adauga',
              icon: <AddIcon />,
              onClick: () => openNewModal()
            }
          ]}
          rowActions={[
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (_e, rowId: number) => selectRow(rowId)
            }
          ]}
        />
      </Box>
    </div>
  )
}

export default AdminDeposit
