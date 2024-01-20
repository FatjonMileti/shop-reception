import { Grid, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../TitleHeader'
import s from '../../CommonStyles.modules.scss'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { EditForm } from './EditForm'

const CentralizeStoresHub = () => {
  const navigate = useNavigate()
  const [tableItems, setTableItems] = useState<CentralizeStoresHub[]>([
    {
      id: 1,
      store: 'BANEASA (7)',
      deposit: 'DEPOZIT BRAZI NON FOOD, DEPOZIT CEFIN AMBIENT, DEPOZIT CEFIN APLS, DEPOZIT CEFIN LEGUME - FRUCTE, DEPOZIT CONGELATE, DEPOZIT PESTE\t',
      hubs: '',
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<CentralizeStoresHub>(null)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const openEditForm = (rowId: number|string) => {
    selectRow(rowId)
    setIsOpenEditModal(true)
  }
  const closeEditForm = () => setIsOpenEditModal(false)
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
        <TitleHeader title='Centralizare magazine și huburi' />
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
                label='Depozit'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează depozit',
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
                label='HUB'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează HUB',
                    value: 'none'
                  }
                ]}
                value={'none'}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ margin: '8px' }}>
        <EditForm
          isModalOpen={isOpenEditModal}
          closeModal={closeEditForm}
          setShouldRefreshData={setShouldRefreshData}
          editItem={selectedRow}
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
              onClick: (e, rowId) => openEditForm(rowId)
            }
          ]}
          rowActionsWidth='130px'
        />
      </Grid>
    </Grid>
  )
}

export default CentralizeStoresHub
