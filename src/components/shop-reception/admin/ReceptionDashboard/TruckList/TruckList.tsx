import { Grid } from '../../Common/Grid'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'

const TruckList = () => {
  const [tableItems, setTableItems] = useState<TruckItem[]>([
    {
      id: 2341,
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
    <Grid
      items={[
        <TitleHeader title='Listă camioane marfă' />,
        <Grid
          items={[
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
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează hub'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează hub',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
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
            />,
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
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează locaţie camion'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează locaţie camion',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează documente conforme'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează documente conforme',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează conformitate termodiagrama'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează conformitate termodiagrama',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează recepţie în interval orar'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează recepţie în interval orar',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează conformitate sigilii'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează conformitate sigilii',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='text'
              onChange={event => null
              }
              label='Cod cursă'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='text'
              onChange={event => null
              }
              label='Număr înmatriculare'
              variant='outlined'
              style={{ width: '100%' }}
            />
          ]}
          itemsPerRow={4}
        />,
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
                navigate(URLS.AUTH_TRUCK_DETAIL.replace(':id', rowId))
              }
            }
          ]}
          rowActionsWidth='130px'
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default TruckList
