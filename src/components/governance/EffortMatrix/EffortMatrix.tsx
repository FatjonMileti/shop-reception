import { useMemo, useState } from 'react'
import { Box, CircularProgress, Grid, Paper, debounce } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import s from './EffortMatrix.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import { useNotification, usePermissions } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { Table } from 'components/core-ui/Table'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Delete, Edit } from '@mui/icons-material'
import { toTableRowItems } from './serializers'
import { columns, roles } from './helpers'
import { TeamDayOffManagementItem, ValueLabelInterface } from '../interfaces'
import { useQuery } from 'react-query'

const EffortMatrix = () => {
  const [domainFilterValue, setDomainFilterValue] = useState<ValueLabelInterface>(null)
  const [tableItems, setTableItems] = useState<TeamDayOffManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { showNotification } = useNotification()

  const { canCreate, canEdit, canDelete } = usePermissions(roles)

  const { data: filterOptions, isLoading: isFilterOptionsLoading } = useQuery(
    ['domains'],
    async () => {
      const result = await makeCoreGetRequest('/governance/domains')
      const resultOptions = toAsyncSelectOptions(result, 'domain', 'domain') || []

      setDomainFilterValue(resultOptions[0])
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )


  const columnsWithActions = useMemo(() => {
    let result = columns

    if (canEdit || canDelete) {
      const actionsRow = {
        title: '',
        field: 'actions',
        align: 'right',
        width: '112px',
        collapsible: 'true',
        render: row => (
          <Box display="flex">
            {canEdit && (
              <Button
                onClick={() => selectRow(row, 'edit')}
                style={{ minWidth: '0.7rem', background: 'transparent' }}
                label=""
              >
                <Edit />
              </Button>
            )}

            {canDelete && (
              <Button onClick={() => selectRow(row, 'delete')} label="">
                <Delete />
              </Button>
            )}
          </Box>
        )
      } as any

      result = [...columns, actionsRow]
    }
    return result
  }, [columns, canEdit, canDelete])


  const selectRow = (row, action) => {
    alert(action);
  }

  const handleFilterChange = value => {
    setDomainFilterValue(value)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/effortMatrix',
          filters: [{ name: 'teamMember.domain', value: domainFilterValue.value }],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const responseList = response.list.map(item =>
        typeof item.numberOfHours === 'undefined' || item.numberOfHours === null
          ? { ...item, numberOfHours: '' }
          : item
      )

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
    <div className={s.mainContainer}>
      <Paper className={s.filtersContainer}>
        <Grid container spacing={4}>
          {(isFilterOptionsLoading) && (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            </div>
          )}

          <Grid xs={12} md={3} item>
            <AsyncAutocomplete
              variant="standard"
              name="teamMember.domain"
              label="Domain"
              disableClearable
              value={domainFilterValue}
              options={filterOptions}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>
      </Paper>
      {domainFilterValue && (
        <Box>
          <Table
            hideCheckbox
            orderBy="role"
            order="asc"
            columns={columnsWithActions}
            items={tableItems}
            fetchData={fetchData}
            isLoading={isLoading}
            totalCount={totalCount}
          />
        </Box>
      )}
    </div>
  )
}

export default EffortMatrix
