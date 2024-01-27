import { Grid } from '../../Common/Grid'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import { Input } from '@fullscreendigital/carrefour-dex-fe'

const ReceptionFiles = () => {
  const [tableItems, setTableItems] = useState<ReceptionFile[]>([
    {
      id: 1,
      deliverySlip: 'PH01DEP',
      warehouse: 'DEPOZIT BRAZI NON FOOD',
      store: 'CRAIOVA (3054)',
      date: '25-10-2023',
      success: 'DEPOZITBRA',
      failureReason: '3095940',
      fileDownloaded: '256822',
      reProcessing: 'Inexistent'
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
        <TitleHeader title='Fișiere recepție Infolog' />,
        <Grid
          hasPaper={true}
          items={[
            <Input
              type='text'
              onChange={event => null}
              label='Bon livrare'
              variant='outlined'
              style={{ width: '100%' }}
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
              type='text'
              onChange={event => null}
              label='Selectează dată'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Succes'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează succes',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Motiv eșuare'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează motiv eșuare',
                  value: 'none'
                }
              ]}
              value={'none'}
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

export default ReceptionFiles
