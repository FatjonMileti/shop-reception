import { Grid } from '../../../Common/Grid'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { TitleHeader } from '../../Common/TitleHeader'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { useNotification } from '../../../../../hooks'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { Table } from '../../../../core-ui/Table'

const MetiProducts = () => {
  const [tableItems, setTableItems] = useState<MetiProduct[]>([
    {
      id: 1,
      productCode: 'CRAIOVA (3054)',
      productName: 'DEPOZIT BRAZI NON FOOD',
      measurementUnit: 'PH01DEP',
      validDays: 'DEPOZITBRA',
      district: '3095940',
      family: '256822',
      subfamily: 'Înregistrat',
      subfamilyValidityThreshold: 'Inexistent'
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
        <TitleHeader title='Lista produse METI' />,
        <Grid
          hasPaper={true}
          items={[
            <Input
              type='text'
              onChange={event => null}
              label='Cod produs'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Nume produs'
              variant='outlined'
              style={{ width: '100%' }}
            />,
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
            />,
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
            />,
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
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Cu prag de valabilitate'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează cu prag de valabilitate',
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
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActions={[]}
          rowActionsWidth='130px'
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default MetiProducts
