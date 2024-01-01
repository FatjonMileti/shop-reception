import { Paper, Grid, Typography } from '@mui/material'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../CommonStyles.modules.scss'
import { Table } from '../../../core-ui/Table'
import { detailsColumns } from './helpers'
import { useEffect, useState } from 'react'
import { useNotification } from '../../../../hooks'
import { TitleHeader } from '../../TitleHeader'
import { useParams } from 'react-router-dom'
import { Download as DownloadIcon } from '@mui/icons-material'

const Tab1 = () => {
  const { id } = useParams()
  const [tableItems, setTableItems] = useState<DeliverySlip[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  useEffect(() => {
    setTableItems([
      {
        id: 1,
        store: 'ORHIDEEA (3)',
        warehouseName: 'DEPOZIT BACAU',
        deliverySlip: '675381',
        status: 'În procesare',
        raceCode: '11111111',
        seal: '23675467',
        registrationNumber: 'ABO2PEK AALTATESCU',
        expectedSupports: '1',
        destinationReachedSupports: '1',
        registrationDate: '24-11-2023 / 14:59'
      }
    ])
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={s.filterPaper}>
          <TitleHeader title={`Bonuri de livrare ${id}`} />
          <Grid container spacing={4}>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Depozit sursǎ:
              </Typography>
              <Typography variant='body1' display='inline'>
                DEPOZIT CONGELATE
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Datǎ estimatǎ de livrare:
              </Typography>
              <Typography variant='body1' display='inline'>
                15/11/2023
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Cod cursǎ:
              </Typography>
              <Typography variant='body1' display='inline'>
                00053548
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Numǎrul de suporți așteptați:
              </Typography>
              <Typography variant='body1' display='inline'>
                33
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Numǎrul de suporți ajunși la
                destinațic:
              </Typography>
              <Typography variant='body1' display='inline'>
                0
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={s.filterPaper}>
          <Grid container spacing={4}>
            <Grid xs={12} md={4} item>
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
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Selectează cod suport'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează cod suport',
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
                label='Selectează comandǎ'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează comandǎ',
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
                label='Selectează comandǎ originalǎ'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează comanda originala',
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
                label='Selectează produs'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează produs',
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
                label='Selectează sensibil'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează sensibil',
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
                label='Selectează produs lipsǎ'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează produs lipsǎ',
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
                label='Selectează produs verificat'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează produs verificat',
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
                label='Selectează DLC scurt'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează DLC scurt',
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
                label='Selectează prioritar vǎnzare'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează prioritar vǎnzare',
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
                label='Selectează procentul de valabilitate'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează procentul de valabilitate',
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
                label='Selectează SGR'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează SGR',
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
        <Table
          hideCheckbox
          orderBy='role'
          order='asc'
          columns={detailsColumns}
          items={tableItems}
          fetchData={null}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
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

export default Tab1
