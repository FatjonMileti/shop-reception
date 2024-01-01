import { Grid, Paper } from '@mui/material'
import { Table } from '../../core-ui/Table'
import { columns } from './helpers'
import { Add as AddIcon } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { makeCoreGetRequest } from '../../../utils/api'
import { toTableGETUrl } from '../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../utils/formatting'
import { useNotification } from '../../../hooks'
import { TitleHeader } from '../TitleHeader'
import s from '../CommonStyles.modules.scss'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { DLCProductsForm } from './DLCProductsForm'
import { ImportProductsForm } from './ImportProductsForm'

const DLCProducts = () => {
  const [tableItems, setTableItems] = useState<DLCProducts[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isImportProductsModalOpen, setIsImportProductsModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<DLCProducts>()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

  const openImportProductsModal = (): void => setIsImportProductsModalOpen(true)
  const closeImportProductsModal = (): void => setIsImportProductsModalOpen(false)

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

  useEffect(() => {
    setTableItems([
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
  }, [])

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TitleHeader title='Administrare produse cu DLC scurt' />
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
        <DLCProductsForm
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <ImportProductsForm
          isModalOpen={isImportProductsModalOpen}
          closeModal={closeImportProductsModal}
          setShouldRefreshData={setShouldRefreshData}
        />
        <DLCProductsForm
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
          fetchData={null}
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
            }
          ]}
          rowActionsWidth='130px'
          toolbarActions={[
            {
              label: 'Importǎ produse DLC scurt',
              icon: <AddIcon />,
              onClick: openImportProductsModal
            },
            {
              label: 'Produse DLC scurt',
              icon: <AddIcon />,
              onClick: openNewModal
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default DLCProducts
