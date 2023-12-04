import { Grid, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../core-ui/Table'
import { columns } from './helpers'
import { Add as AddIcon, CloudDownload as CloudDownloadIcon } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { makeCoreGetRequest } from '../../../utils/api'
import { toTableGETUrl } from '../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../utils/formatting'
import { useNotification } from '../../../hooks'
import TitleHeader from '../TitleHeader/TitleHeader'
import s from '../CommonStyles.modules.scss'
import { Input } from '@fullscreendigital/carrefour-dex-fe'

const PackingTypes = () => {
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
      <Grid item xs={12}>
        <TitleHeader title='Administrare tipuri de ambalaje' />
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
        <Table
          hideCheckbox
          orderBy='role'
          order='asc'
          columns={columns}
          items={tableItems}
          fetchData={() => null}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActions={[]}
          rowActionsWidth='130px'
          toolbarActions={[
            {
              label: 'Export',
              icon: <CloudDownloadIcon />,
              onClick: null
            },
            {
              label: 'Tip ambalaj',
              icon: <AddIcon />,
              onClick: null
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default PackingTypes
