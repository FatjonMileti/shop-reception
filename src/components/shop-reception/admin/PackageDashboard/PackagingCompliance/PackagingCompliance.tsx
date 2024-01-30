import { Grid } from '../../../Common/Grid'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { Download as DownloadIcon } from '@mui/icons-material'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'

const PackagingCompliance = () => {
  const [tableItems, setTableItems] = useState<PackagingCompliance[]>([
    {
      id: 1,
      store: 'CRAIOVA (3054)',
      warehouse: 'DEPOZIT BRAZI NON FOOD',
      deliverySlip: 'PH01DEP',
      supportType: 'DEPOZITBRA',
      supportCode: '3095940',
      supportCompliance: '256822',
      receptionDate: '25-10-2023',
      downloadImages: 'Inexistent'
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

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
        <TitleHeader title='Conformitate ambalaje' />,
        <Grid
          hasPaper={true}
          items={[
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
            />,
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
            />,
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
            />,
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
            />,
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
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Cod suport'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Bon livrare'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Datǎ din'
              variant='outlined'
              style={{ width: '100%' }}
              value={'28/11/2023'}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Datǎ la'
              variant='outlined'
              style={{ width: '100%' }}
              value={'28/11/2023'}
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
      ]}
      itemsPerRow={1}
    />
  )
}

export default PackagingCompliance
