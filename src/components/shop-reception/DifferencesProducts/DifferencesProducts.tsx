import { Paper, Grid } from '@mui/material'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import s from '../CommonStyles.modules.scss'
import { URLS } from '../constants'
import { Table } from '../../core-ui/Table'
import { columns } from './helpers'
import { useEffect, useState } from 'react'
import { makeCoreGetRequest } from '../../../utils/api'
import { toTableGETUrl } from '../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../utils/formatting'
import { useNotification } from '../../../hooks'
import TitleHeader from '../TitleHeader/TitleHeader'

const DifferencesProducts = () => {
  const [tableItems, setTableItems] = useState<DifferencesProduct[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  useEffect(() => {
    setTableItems([
      {
        id: 1,
        deliverySlip: '675381',
        store: 'ORHIDEEA (3)',
        warehouse: 'DEPOZIT BACAU',
        productName: 'În procesare',
        homeOrder: '11111111',
        metiOrder: '23675467',
        unitOfMeasure: '1',
        expectedQuantity: '1',
        qualitativeReceivedQuantity: '1',
        defectiveReceivedQuantity: '1',
        grams: 'ABO2PEK AALTATESCU',
        inStockQuantity: 2,
        difference: '1',
        raceCode: '1',
        sentToMeti: '1',
        integrationOperator: '1',
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
        <Paper className={s.filterPaper}>
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
