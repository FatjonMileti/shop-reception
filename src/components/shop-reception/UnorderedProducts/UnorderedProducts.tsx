import { Paper, Grid } from '@mui/material'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import s from '../CommonStyles.modules.scss'
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

const UnorderedProducts = () => {
  const [tableItems, setTableItems] = useState<UnorderedProducts[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  useEffect(() => {
    setTableItems([
      {
        id: 1,
        warehouse: 'DEPOZIT BACAU',
        store: 'ORHIDEEA (3)',
        deliverySlip: '675381',
        productCode: '675381',
        productName: '',
        productEan: '',
        qualitativeQuantity: '',
        defectiveQuantity: '',
        failureReason: '',
        supportCode: '',
        receptionDate: '',
        receptionOperator: '',
        resolved: 'În procesare',
        resolvedDate: '24-11-2023 / 14:59',
        resolvedOperator: ''
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
        <Paper className={s.filterPaper}>
          <TitleHeader title='Produse necomandate' />
          <Grid container spacing={4}>
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
                label='Cod suport'
                variant='outlined'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Rezolvat'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează Rezolvat',
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
                label='Bon livrare'
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
          fetchData={null}
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

export default UnorderedProducts
