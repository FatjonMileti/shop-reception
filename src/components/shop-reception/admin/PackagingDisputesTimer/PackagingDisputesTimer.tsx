import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../../core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../utils/api'
import { toTableGETUrl } from '../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { TitleHeader } from '../TitleHeader'
import { URLS } from '../constants'

const PackagingDisputesTimer = () => {
  const navigate = useNavigate()
  const [tableItems, setTableItems] = useState<PackagingDisputeTimer[]>([
    {
      id: 1,
      timerType: 'CRAIOVA (3054)',
      timerValue: '3095940',
      timerDescription: 'Inexistent Inexistent Inexistent Inexistent Inexistent Inexistent Inexistent Inexistent Inexistent'
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
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <TitleHeader title='Litigii ambalaje - Administrare timer' />
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
                navigate(URLS.AUTH_PACKAGING_DISPUTES_OF_TIMER_DETAIL.replace(":id", rowId))
              }
            }
          ]}
          rowActionsWidth='130px'
        />
      </Grid>
    </Grid>
  )
}

export default PackagingDisputesTimer
