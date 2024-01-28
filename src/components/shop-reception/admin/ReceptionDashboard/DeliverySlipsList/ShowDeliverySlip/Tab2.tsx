import { Grid } from '../../../Common/Grid'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { Table } from '../../../../../core-ui/Table'
import { modifyColumns } from './helpers'
import { useState } from 'react'
import { useNotification } from '../../../../../../hooks'
import { useParams } from 'react-router-dom'

const Tab1 = () => {
  const { id } = useParams()
  const [tableItems, setTableItems] = useState<DeliverySlip[]>([
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
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  return (
    <Grid
      items={[
        <Grid
          items={[
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
            />,
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
          ]}
          itemsPerRow={2}
        />,
        <Table
          hideCheckbox
          orderBy='role'
          order='asc'
          columns={modifyColumns}
          items={tableItems}
          fetchData={() => {
          }}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Tab1
