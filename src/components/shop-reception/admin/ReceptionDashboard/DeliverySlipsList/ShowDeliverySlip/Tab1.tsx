import { Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Table } from '../../../../../core-ui/Table'
import { detailsColumns } from './helpers'
import { useState } from 'react'
import { useNotification } from '../../../../../../hooks'
import { Grid } from '../../../../Common/Grid'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useParams } from 'react-router-dom'
import { Download as DownloadIcon } from '@mui/icons-material'

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
        <TitleHeader title={`Bonuri de livrare ${id}`} />,
        <Grid
          items={[
            <>
              <Typography variant='mono'>
                Depozit sursǎ:
              </Typography>
              <Typography variant='medium'>
                DEPOZIT CONGELATE
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Datǎ estimatǎ de livrare:
              </Typography>
              <Typography variant='medium'>
                15/11/2023
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Cod cursǎ:
              </Typography>
              <Typography variant='medium'>
                00053548
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Numǎrul de suporți așteptați:
              </Typography>
              <Typography variant='medium'>
                33
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Numǎrul de suporți ajunși la
                destinațic:
              </Typography>
              <Typography variant='medium'>
                0
              </Typography>
            </>
          ]}
          itemsPerRow={1}
        />,
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
            />,
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
            />,
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
            />,
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
            />,
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
            />,
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
            />,
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
            />,
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
            />,
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
            />,
            <Table
              hideCheckbox
              orderBy='role'
              order='asc'
              columns={detailsColumns}
              items={tableItems}
              fetchData={() => {
              }}
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
          ]}
          itemsPerRow={4}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Tab1
