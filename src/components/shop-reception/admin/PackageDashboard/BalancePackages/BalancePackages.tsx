import { Grid } from '../../Common/Grid'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { useNavigate } from 'react-router-dom'
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
import { URLS } from '../../constants'

const BalancePackages = () => {
  const navigate = useNavigate()
  const [tableItems, setTableItems] = useState<BalancePackage[]>([
    {
      id: 1,
      store: 'CRAIOVA (3054)',
      hub: '',
      society: 'DEPOZIT BRAZI NON FOOD',
      supportType: '',
      qualitativeInventory: 'PH01DEP',
      theoreticalStock: 'DEPOZITBRA',
      inventoryDefect: '3095940',
      difference: '',
      finalStockAfterInventory: '256822',
      inventoryManager: '',
      inventoryDate: '25-10-2023',
      inventoryUpdate: 'Inexistent',
      inventoryHistory: ''
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
        <TitleHeader title='Sold ambalaje' />,
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
              label='Hub'
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
              label='Societatea'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează tip suport',
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
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActions={[
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#4191ed',
              onClick: (e, rowId) => {
                navigate(URLS.AUTH_BALANCE_PACKAGING_FORM.replace(":id", rowId))
              }
            },
            {
              label: 'Show',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              onClick: (e, rowId) => {
                navigate(URLS.AUTH_BALANCE_PACKAGING_HISTORY.replace(":id", rowId))
              }
            }
          ]}
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

export default BalancePackages
