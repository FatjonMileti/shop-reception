import { Box, Grid } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import dayjs from 'dayjs'
import { useNotification } from 'hooks'
import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import s from '../TeamDayOffManagement/TeamDayOffManagement.modules.scss'
import { IndividualCapacityTableFilter, TeamAssignmentItem } from '../interfaces'
import { columns } from './constants'
import { buildTableFilterInputs } from './utils'

const IndividualCapacity = () => {
  const [tableItems, setTableItems] = useState<TeamAssignmentItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const [searchParams, setSearchParams] = useSearchParams()
  const { id } = useParams()

  const [tableFilters, setTableFilters] = useState<IndividualCapacityTableFilter>({
    teamMemberId: null,
    startDate: searchParams.get('startDate') || dayjs().format('YYYY-MM-DD'),
    endDate: searchParams.get('endDate') || dayjs().format('YYYY-MM-DD')
  })

  const tableFilterFields = useMemo(() => {
    setSearchParams({
      startDate: tableFilters.startDate as string,
      endDate: tableFilters.endDate as string
    })
    return buildTableFilterInputs(tableFilters, setTableFilters)
  }, [])

  const fetchData = async ({ tableFilters, rowsPerPage, order, orderBy }) => {
    setIsLoading(true)
    setSearchParams({
      startDate: tableFilters[0].value,
      endDate: tableFilters[1].value
    })
    try {
      const getTableFilters = tableFilters.map((filter, index) => {
        if (!filter.value && !!searchParams.get(filter.name)) {
          return { name: filter.name, value: searchParams.get(filter.name) }
        }
        return filter
      })
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/individualCapacity',
          filters: [{ name: 'teamMember.id', value: id }],
          tableFilters: getTableFilters,
          orderBy,
          rowsPerPage,
          order
        })
      )

      setTableItems(response.list)
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
      <Grid container spacing={4}>
        <Grid xs={12} md={2} item style={{ padding: 0 }}></Grid>
      </Grid>
      <Box>
        <Table
          hideCheckbox
          stickyRatio={0.5}
          orderBy="teamMemberName"
          order="asc"
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          columns={columns}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          filters={tableFilterFields}
        />
      </Box>
    </div>
  )
}

export default IndividualCapacity
