import { Typography } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { CRUDAction } from 'components/volumetry/interfaces'
import { columns } from './helpers'
import { CreateEditResponsible } from './CreateEditResponsible'
import { AddActionIcon, DeleteActionIcon, EditActionIcon } from 'icons'
import { handleQueryError } from 'utils/helpers'
import { DeleteConfirmationModal } from 'components/core-ui/DeleteConfirmationModal'
import s from '../../../commonStyles.modules.scss'

const TransportResponsible = () => {
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<TransportResponsible[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedRow, setSelectedRow] = useState<TransportResponsible>(null)
  const [modal, setModal] = useState<CRUDAction>(null)

  const openModal = (action: CRUDAction) => setModal(action)
  const closeModal = () => setModal(null)

  const selectRow = (rowId: number, action: CRUDAction) => {
    setSelectedRow(tableItems.find(item => item.id === rowId))
    openModal(action)
  }

  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/return-truck-carrier-responsible',
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
      handleQueryError(error, 'A aparut o eroare la obtinerea responsabililor.', showNotification)
    }
  }

  return (
    <div className={s.mainContainer}>
      <CreateEditResponsible
        isModalOpen={modal === 'create'}
        closeModal={closeModal}
        setShouldRefreshData={setShouldRefreshData}
      />
      <DeleteConfirmationModal
        isModalOpen={modal === 'delete'}
        closeModal={closeModal}
        actionUrl={`/shop-reception/return-truck-carrier-responsible/:id`}
        itemId={selectedRow?.id}
        content={<Typography>Sunteti sigur ca vreti sa stergeti acest responsabil?</Typography>}
        setShouldRefreshData={setShouldRefreshData}
        title="Sterge resposabil"
        deleteLabel="Sterge"
      />
      <CreateEditResponsible
        isModalOpen={modal === 'edit'}
        closeModal={closeModal}
        setShouldRefreshData={setShouldRefreshData}
        editItem={selectedRow}
      />
      <Table
        hideCheckbox
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
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
            label: 'Sterge',
            labelColor: 'white',
            typographyVariant: 'medium',
            backgroundColor: '#d9534f',
            desktopIcon: <DeleteActionIcon />,
            onClick: (_e, rowId: number) => selectRow(rowId, 'delete')
          }
        ]}
        rowActionsWidth="130px"
        toolbarActions={[
          {
            label: 'Adauga',
            icon: <AddActionIcon />,
            onClick: () => setModal('create')
          }
        ]}
      />
    </div>
  )
}

export default TransportResponsible
