import { Grid } from '../../../../Common/Grid'
import { TitleHeader } from '../../../Common/TitleHeader'
import React, { useState } from 'react'
import { Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { columns } from './helpers'
import { Table } from '../../../../../core-ui/Table'

const MetiFileDetail = () => {
  const [tableItems, setTableItems] = useState<MetiFile[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  return (
    <Grid
      items={[
        <TitleHeader title={` Fişier Meti pentru BL 60787, magazin ORADEA2`} />,
        <Grid
          items={[
            <>
              <Typography variant='mono'>
                Depozit sursă:
              </Typography>
              <Typography variant='medium'>
                DEPOZIT DEVA APLS
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Magazin destinatie:
              </Typography>
              <Typography variant='medium'>
                ORADEA2
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Bon livrare:
              </Typography>
              <Typography variant='medium'>
                60787
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Status fişier:
              </Typography>
              <Typography variant='medium'>
                Trimis
              </Typography>
            </>
          ]}
          itemsPerRow={4}
        />,
        <Grid
          items={[
            <Input
              type='text'
              onChange={event => null}
              label='Cod produs'
              variant='outlined'
              style={{ width: '100%' }}
              value={null}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Nume produs'
              variant='outlined'
              style={{ width: '100%' }}
              value={null}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Comandă de origine'
              variant='outlined'
              style={{ width: '100%' }}
              value={null}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Cod cursă'
              variant='outlined'
              style={{ width: '100%' }}
              value={null}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Comandă METI'
              variant='outlined'
              style={{ width: '100%' }}
              value={null}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Status comandă METI'
              variant='outlined'
              style={{ width: '100%' }}
              value={null}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează cu erori'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează cu erori',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează cu erori'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează cu erori',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează cu diferenţe Meti'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează cu diferenţe Meti',
                  value: 'none'
                }
              ]}
              value={'none'}
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
          fetchData={() => {
          }}
          isLoading={isLoading}
          totalCount={totalCount}
          newButton={null}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default MetiFileDetail