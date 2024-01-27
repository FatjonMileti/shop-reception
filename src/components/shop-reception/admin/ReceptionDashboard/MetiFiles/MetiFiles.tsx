import { Grid } from '../../Common/Grid'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../../constants'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import { useNavigate } from 'react-router-dom'

const MetiFiles = () => {
  const [tableItems, setTableItems] = useState<MetiFile[]>([
    {
      id: 1,
      deliverySlip: 'DEPOZIT BACAU',
      store: 'ORHIDEEA (3)',
      warehouse: '675381',
      integrationOperator: '11111111',
      status: 'În procesare',
      sentFile: '23675467',
      receivedFile: 'ABO2PEK AALTATESCU',
      sentToMeti: '1',
      receivedFromMeti: '1',
      productsDifferences: '1',
      metiProductDifferences: '1',
      exportNonIntegratedProducts: '1',
      error: false,
      forgot: false,
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
        <TitleHeader title='Fișiere Meti' />,
        <Grid
          hasPaper={true}
          items={[
            <Input
              type='text'
              onChange={event => null
              }
              label='Bon livrare'
              variant='outlined'
              style={{ width: '100%' }}
            />,
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
              label='Status'
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
              label='Erori'
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
              label='Diferente'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează cu diferente',
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
                navigate(URLS.AUTH_METI_FILE_DETAIL.replace(":id", rowId))
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

export default MetiFiles
