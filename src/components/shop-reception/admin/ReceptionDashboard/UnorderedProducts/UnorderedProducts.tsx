import { Grid } from '../../../Common/Grid'
import { Input, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import dayjs from "dayjs";

const UnorderedProducts = () => {
  const [tableItems, setTableItems] = useState<UnorderedProducts[]>([
    {
      id: 1,
      warehouse: 'DEPOZIT BACAU',
      store: 'ORHIDEEA (3)',
      deliverySlip: '675381',
      productCode: '675381',
      productName: '',
      productEan: '',
      qualitativeQuantity: '',
      defectiveQuantity: '',
      failureReason: '',
      supportCode: '',
      receptionDate: '',
      receptionOperator: '',
      resolved: 'În procesare',
      resolvedDate: '24-11-2023 / 14:59',
      resolvedOperator: ''
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
        <TitleHeader title='Produse necomandate' />,
        <Grid
          items={[
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
              type='text'
              onChange={event => null
              }
              label='Cod produs'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='text'
              onChange={event => null
              }
              label='Cod suport'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Rezolvat'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează Rezolvat',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='text'
              onChange={event => null
              }
              label='Bon livrare'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <DatePicker
              label="Selecteaza dată recepție"
              variant="outlined" value={dayjs()}
              onChange={() => {}}
            />,
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
            // {
            //   label: "Adauga",
            //   icon: <AddIcon />,
            //   onClick: null
            // }
          ]}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default UnorderedProducts
