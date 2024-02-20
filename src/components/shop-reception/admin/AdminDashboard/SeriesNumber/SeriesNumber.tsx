import { Grid } from '../../../Common/Grid'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { Add as AddIcon } from '@mui/icons-material'
import { useState } from 'react'
import { TitleHeader } from '../../Common/TitleHeader'
import { EditActionIcon } from 'icons'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { SeriesNumberForm } from './SeriesNumberForm'

const SeriesNumber = () => {
  const [tableItems, setTableItems] = useState<SeriesNumber[]>([
    {
      id: 1,
      series: "CRF32",
      startInterval: 20000,
      currentNumber: 1088,
      year: 2024,
      society: "Carrefour"
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<SeriesNumber>()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

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

  return (
    <Grid
      items={[
        <TitleHeader title='Administrare serie numar aviz' />,
        <Grid
          hasPaper={true}
          items={[
            <Input
              type='text'
              onChange={event => null}
              label='Serie Aviz'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Societatea'
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
            <Input
              type='number'
              onChange={event => null}
              label='An'
              variant='outlined'
              style={{ width: '100%' }}
            />,
          ]}
          itemsPerRow={4}
        />,
        <>
          <SeriesNumberForm
            isModalOpen={isNewModalOpen}
            closeModal={closeNewModal}
            setShouldRefreshData={setShouldRefreshData}
          />
          <SeriesNumberForm
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
            fetchData={() => {}}
            isLoading={isLoading}
            totalCount={totalCount}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
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
            rowActionsWidth='130px'
            toolbarActions={[
              {
                label: 'Serie',
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

export default SeriesNumber
