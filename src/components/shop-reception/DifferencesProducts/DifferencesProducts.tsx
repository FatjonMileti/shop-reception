import { Paper, Box, Grid } from '@mui/material'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from './DifferencesProducts.modules.scss'
import { URLS } from '../constants'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../core-ui/Table'
import { columns } from './helpers'
import { Add as AddIcon } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { makeCoreGetRequest } from '../../../utils/api'
import { toTableGETUrl } from '../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../utils/formatting'
import { useNotification } from '../../../hooks'
import { FormInfoItems } from '../../core-ui/FormInfoItems'
import { EffortMatrix } from '../../governance/interfaces'
import { AsyncAutocomplete } from '../../core-ui/AsyncAutocomplete'
import TitleHeader from '../TitleHeader/TitleHeader'

const DifferencesProducts = () => {
  const navigate = useNavigate()
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

  const getTitle = () => {
    return 'Nu'
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={s.paper}>
          <TitleHeader title='Produse cu diferenţe' />
          <Grid container spacing={4}>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null
                }
                label='Bon livrare'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
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
                type='text'
                onChange={event => null
                }
                label='Cod produs'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null
                }
                label='Nume produs'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null
                }
                label='Comandă de origine'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null
                }
                label='Comandă Meti'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null
                }
                label='Cod cursâ'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null
                }
                label='Selecteazã datâ'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null
                }
                label='Cu poze'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selecteazâ cu poze',
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
          columns={columns}
          items={tableItems}
          fetchData={() => null}
          isLoading={isLoading}
          totalCount={totalCount}
          newButton={null}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActions={[]}
          rowActionsWidth='130px'
          toolbarActions={[
            // {
            //   label: "Adauga",
            //   icon: <AddIcon />,
            //   onClick: null
            // }
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default DifferencesProducts
