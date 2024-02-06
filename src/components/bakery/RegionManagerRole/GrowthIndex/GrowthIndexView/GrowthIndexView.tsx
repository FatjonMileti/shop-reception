import { Box } from '@mui/material'
import s from '../../../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { GrowthIndexItem } from '../../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { toTableRowItems } from '../serializers'
import { columns } from './helpers'

const GrowthIndexView = () => {
  const [tableItems, setTableItems] = useState<GrowthIndexItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()
  
  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/region/store/growth',
          filters: [],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )
      setTableItems(toTableRowItems(response.list))
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
    <div className={s.mainContainer}>
      <Box>
        <Table
          hideCheckbox
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowsPerPage={25}
          rowsPerPageOptions={[25, 50, 100]}
        />
      </Box>
    </div>
  )
}

export default GrowthIndexView
