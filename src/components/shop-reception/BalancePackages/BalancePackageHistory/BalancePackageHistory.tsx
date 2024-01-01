import { Grid } from '@mui/material'
import { TitleHeader } from '../../TitleHeader'
import { Table } from '../../../core-ui/Table'
import { columns } from './helpers'
import { useEffect, useState } from 'react'

const BalancePackageHistory = () => {
  const [tableItems, setTableItems] = useState<BalancePackage[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  useEffect(() => {
    setTableItems([
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
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <TitleHeader title='Istoric inventar' />
      </Grid>
      <Grid item xs={12} style={{ margin: '8px' }}>
        <Table
          hideCheckbox
          orderBy='role'
          order='asc'
          columns={columns}
          items={tableItems}
          fetchData={null}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
        />
      </Grid>
    </Grid>
  )
}

export default BalancePackageHistory