import { Paper, Grid, Typography } from '@mui/material'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../CommonStyles.modules.scss'
import { Table } from '../../../core-ui/Table'
import { modifyColumns } from './helpers'
import { useEffect, useState } from 'react'
import { useNotification } from '../../../../hooks'
import { useParams } from 'react-router-dom'

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
          <Grid container spacing={4}>
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
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ margin: '8px' }}>
        <Table
          hideCheckbox
          orderBy='role'
          order='asc'
          columns={modifyColumns}
          items={tableItems}
          fetchData={() => null}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
        />
      </Grid>
    </Grid>
  )
}

export default Tab1
