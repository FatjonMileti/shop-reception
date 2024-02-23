import { Grid } from '../../../Common/Grid'
import { useNavigate } from 'react-router-dom'
import { Table } from 'components/core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import { URLS } from '../../constants'
import { EditActionIcon, FileMenu, DownloadIcon } from 'icons'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { PackagingInventoryUpdateModal} from './PackagingInventoryUpdateModal'

const PackagingInventory = () => {
  const navigate = useNavigate()
  const [tableItems, setTableItems] = useState<PackagingInventory[]>([
    {
      id: 1,
      store: "Oradea2",
      hub: "Carrefour",
      society: "Palet Chep",
      supportType: "100",
      inventoryQualitative: "100",
      theoreticalBalanceQualitative: "100",
      defectiveInventory: "5",
      difference: "-5",
      finalStockAfterInventory: "105",
      inventoryManager: "oradea_rec",
      inventoryDate: "07/02/2024",
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<PackagingInventory>()
  const { showNotification } = useNotification()

  const openEditModal = (rowId: number|string): void => {
    selectRow(rowId)
    setIsEditModalOpen(true)
  }
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = (rowId: number|string) => {
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
          url: '/packagingIntory',
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
        <TitleHeader title='Inventar Ambalaje' />,
        <Grid
          hasPaper={true}
          items={[
            <Input
              type='select'
              onChange={event => null}
              label='Selectează magazin'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează magazin',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează hub'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează hub',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează suport'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează suport',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează societatea'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează societatea',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
          ]}
          itemsPerRow={4}
        />,
        <PackagingInventoryUpdateModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          setShouldRefreshData={setShouldRefreshData}
          editItem={selectedRow}
        />,
        <Table
          hideCheckbox
          orderBy='role'
          order='asc'
          columns={columns}
          items={tableItems}
          fetchData={() => {}}
          isLoading={isLoading}
          totalCount={totalCount}
          newButton={null}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          toolbarActions={[
            {
              label: 'Export',
              icon: <DownloadIcon />,
              onClick: () => null
            }
          ]}
          rowActions={[
            {
              label: 'Show',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <FileMenu />,
              onClick: (e, rowId) => {
                navigate(URLS.AUTH_PACKING_INVENTORY_HISTORY.replace(":id", rowId))
              }
            },
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (e, rowId) => {
                openEditModal(rowId)
              }
            }
          ]}
          rowActionsWidth='130px'
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default PackagingInventory
