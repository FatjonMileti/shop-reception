import { Paper, Grid } from '@mui/material'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import s from '../CommonStyles.modules.scss'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../core-ui/Table'
import { columns } from './helpers'
import { Download as DownloadIcon } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { makeCoreGetRequest } from '../../../utils/api'
import { toTableGETUrl } from '../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../utils/formatting'
import { useNotification } from '../../../hooks'
import TitleHeader from '../TitleHeader/TitleHeader'

const PackagingCompliance = () => {
  const navigate = useNavigate()
  const [tableItems, setTableItems] = useState<TruckItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  useEffect(() => {
    setTableItems([
      {
        id: 1,
        store: 'CRAIOVA (3054)',
        hub: '',
        warehouseName: 'DEPOZIT BRAZI NON FOOD',
        truckLocation: '',
        registrationNumber: 'PH01DEP',
        driverCode: 'DEPOZITBRA',
        raceCode: '3095940',
        seals: '',
        deliveryReceipts: '256822',
        complianceDocuments: '',
        thermodiagramConformity: '',
        receptionWithinHours: '',
        sealCompliance: '',
        status: 'Înregistrat',
        registrationDate: '25-10-2023',
        registrationOperator: '',
        eTransportStatus: 'Inexistent'
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
      <Grid xs={12} item>
        <TitleHeader title='Conformitate ambalaje' />
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
                type='select'
                onChange={event => null}
                label='Tip suport'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează Tip suport',
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
                label='Conformitate suport'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează Conformitate suport',
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
                label='Datǎ din'
                variant='outlined'
                style={{ width: '100%' }}
                value={'28/11/2023'}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Datǎ la'
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
          fetchData={() => null}
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

export default PackagingCompliance
