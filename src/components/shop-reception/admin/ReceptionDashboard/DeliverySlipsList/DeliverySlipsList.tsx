import { Paper, Grid } from '@mui/material'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../Common/CommonStyles.modules.scss'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../constants'

const DeliverySlipsList = () => {
  const [tableItems, setTableItems] = useState<DeliverySlip[]>([
    {
      id: 2341,
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
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()
  const navigate = useNavigate()

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
        <Paper className={s.filterPaper}>
          <TitleHeader title='Bonuri de livrare' />
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
                label='Selectează depozit'
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
                label='Selectează status'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează status',
                    value: 'none'
                  }
                ]}
                value={'none'}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null
                }
                label='Cod cursă'
                variant='outlined'
                style={{ width: '100%' }}
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
          rowActions={[
            {
              label: 'Show',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              onClick: (e, rowId) => {
                navigate(URLS.AUTH_DELIVERY_SLIP.replace(':id', rowId))
              }
            }
          ]}
          rowActionsWidth='130px'
        />
      </Grid>
    </Grid>
  )
}

export default DeliverySlipsList
