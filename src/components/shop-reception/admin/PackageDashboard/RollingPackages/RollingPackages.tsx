import { Paper, Grid } from '@mui/material'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../Common/CommonStyles.modules.scss'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { Download as DownloadIcon } from '@mui/icons-material'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'

const RollingPackages = () => {
  const [tableItems, setTableItems] = useState<RollingPackages[]>([
    {
      id: 1,
      warehouse: 'DEPOZIT BRAZI NON FOOD',
      store: 'CRAIOVA (3054)',
      hub: '',
      society: '',
      expectedSupportType: '',
      confirmedSupportType: '',
      truckLocation: '',
      registrationNumber: 'PH01DEP',
      supportCode: 'DEPOZITBRA',
      deliverySlip: '3095940',
      noticeNumber: '',
      entry: '256822',
      lesire: '',
      finalStockAfterInventory: '',
      date: '25-10-2023',
      image: 'Înregistrat'
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

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
      <Grid xs={12} item>
        <TitleHeader title='Rulaj ambalaje' />
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
                label='Hub'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează hub',
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
                label='Locație camion'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează locație camion',
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
                label='Traseu confirmat'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează traseu confirmat',
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
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Cod suport'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Bon livrare'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Numǎr aviz'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Conformitate support'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Conformitate support',
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
                label='Datǎ inregistrare'
                variant='outlined'
                style={{ width: '100%' }}
                value={'28/11/2023'}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Datǎ expeditie'
                variant='outlined'
                style={{ width: '100%' }}
                value={'28/11/2023'}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ margin: '8px' }}>
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
          rowActions={[]}
          rowActionsWidth='130px'
          toolbarActions={[
            {
              label: 'Export',
              icon: <DownloadIcon />,
              onClick: null
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default RollingPackages
