import { Grid, Paper, Typography } from '@mui/material'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { Add as AddIcon } from '@mui/icons-material'
import { useState } from 'react'
import { TitleHeader } from '../../TitleHeader'
import s from '../../CommonStyles.modules.scss'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { SGRProductsForm } from './SGRProductsForm'
import { ImportProductsForm } from './ImportProductsForm'
import DeleteConfirmationModal from '../../../../core-ui/DeleteConfirmationModal/DeleteConfirmationModal'

const SGRProducts = () => {
  const [tableItems, setTableItems] = useState<SGRProducts[]>([
    {
      id: 1,
      storeType: 'CRAIOVA (3054)',
      storeCode: '',
      storeName: 'DEPOZIT BRAZI NON FOOD',
      district: 'PH01DEP',
      family: 'DEPOZITBRA',
      subfamily: '3095940',
      UbCode: '256822',
      productCode: 'Inexistent'
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isImportProductsModalOpen, setIsImportProductsModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<SGRProducts>()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openImportProductsModal = (): void => setIsImportProductsModalOpen(true)
  const closeImportProductsModal = (): void => setIsImportProductsModalOpen(false)

  const openEditModal = (rowId: number | string): void => {
    selectRow(rowId)
    setIsEditModalOpen(true)
  }
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)
  const openDeleteModal = (rowId: number | string): void => {
    selectRow(rowId)
    setIsDeleteModalOpen(true)
  }

  const selectRow = (rowId: number | string) => {
    const row = tableItems.find(item => item.id === rowId)
    if (row) {
      setSelectedRow(row)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TitleHeader title='Administrare produse SGR' />
      </Grid>
      <Grid item xs={12}>
        <Paper className={s.filterPaper}>
          <Grid container spacing={4}>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Magazin'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează magazin',
                    value: 'none'
                  }
                ]}
                value={'none'}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Raion'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează raion',
                    value: 'none'
                  }
                ]}
                value={'none'}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Familie'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează familie',
                    value: 'none'
                  }
                ]}
                value={'none'}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Subfamilie'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează Subfamilie',
                    value: 'none'
                  }
                ]}
                value={'none'}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Cod UB'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează cod UB',
                    value: 'none'
                  }
                ]}
                value={'none'}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Cod produs'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ margin: '8px' }}>
        <SGRProductsForm
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <ImportProductsForm
          isModalOpen={isImportProductsModalOpen}
          closeModal={closeImportProductsModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <SGRProductsForm
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          setShouldRefreshData={setShouldRefreshData}
          editItem={selectedRow}
          isEdit
        />
        <DeleteConfirmationModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          actionUrl='/shop-reception/products/sgr/:id'
          itemId={`${selectedRow?.id}`}
          cancelLabel='Nu'
          deleteLabel='Da'
          content={<Typography>Eşti sigur că doreşti să ştergi această regulă?</Typography>}
          setShouldRefreshData={setShouldRefreshData}
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
              onClick: (e, rowId) => openEditModal(rowId)
            },
            {
              label: 'Delete',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#e15656',
              onClick: (e, rowId) => openDeleteModal(rowId)
            }
          ]}
          rowActionsWidth='130px'
          toolbarActions={[
            {
              label: 'Importǎ produse SGR',
              icon: <AddIcon />,
              onClick: openImportProductsModal
            },
            {
              label: 'Produse SGR',
              icon: <AddIcon />,
              onClick: openNewModal
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default SGRProducts
