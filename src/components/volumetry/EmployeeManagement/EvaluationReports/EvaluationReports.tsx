import { FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns } from 'components/volumetry/EmployeeManagement/EvaluationReports/helpers'
import { useNotification } from 'hooks'
import { useState } from 'react'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import s from './EvaluationReports.modules.scss'
import { toTableRowItems } from 'components/volumetry/EmployeeManagement/EvaluationReports/serializers'
import { EvaluationReportSummary, ValueLabelInterface } from 'components/volumetry/interfaces'
import { getDepartmentsOptions } from 'components/volumetry/api'
import { DownloadIcon } from 'icons'
import { formatAndDownloadResponse } from 'utils/helpers'
import { formatErrorMessage } from 'utils/formatting'

const EvaluationReports = () => {
  const [departmentFilterValue, setDepartmentFilterValue] = useState<ValueLabelInterface>(null)
  const [tableItems, setTableItems] = useState([]) // TODO: To add interface when db schema is defined
  const [tableSummary, setTableSummary] = useState<EvaluationReportSummary | null>(null) // TODO: To add interface when db schema is defined
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const { data: departments, isLoading: isDepartmentsLoading } = getDepartmentsOptions(
    showNotification,
    setDepartmentFilterValue
  )

  const handleDepartmentFilterChange = value => {
    setDepartmentFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async ({ order, orderBy }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/evaluationReports',
          filters: [{ name: 'department', value: departmentFilterValue?.value }],
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.list))
      setTableSummary(response.summary)
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: 'A aparut o eroare la obtinerea datelor raportului.',
        type: 'error'
      })
    }
  }

  const handleDownload = async (tableState, e) => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: '/volumetry/employee/evaluationReports/export/csv',
      tableFilters: filters,
      filters: [{ name: 'department', value: departmentFilterValue?.value }],
      order,
      orderBy
    })

    try {
      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `Error while download file. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const toolbarActions = [
    {
      label: 'Exporta',
      icon: <DownloadIcon />,
      onClick: handleDownload
    },
  ]

  return (
    <div className={s.mainContainer}>
      <Grid container spacing={4}>
        {isDepartmentsLoading ? (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        ) : (
          <Grid xs={4} md={3} item style={{ padding: 0 }}>
            <FilterDataSelect
              name="department"
              defaultSelectedData={departmentFilterValue}
              label=""
              showCounter={true}
              showSearch={true}
              counterLabel="Select department"
              noDataFoundLabel="No results!"
              options={departments}
              onSelect={handleDepartmentFilterChange}
            />
          </Grid>
        )}
      </Grid>
      {departmentFilterValue && (
        <Table
          hideCheckbox
          orderBy="department"
          order="desc"
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          toolbarActions={toolbarActions}
          disablePagination
        />
      )}
      <Grid container direction="row" justifyContent="flex-end" alignItems="center" padding={1}>
        <Grid item xs={1} style={{ maxWidth: '50%' }}>
          <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography style={{ textWrap: 'nowrap' }}>
              Total nr. zilnic task-uri executate:
            </Typography>
            <Typography style={{ color: 'black', marginLeft: '4px' }}>
              {tableSummary?.departmentTotalExcutedTasks}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography style={{ textWrap: 'nowrap' }}>
              Total % aplicare proces volumetrie:
            </Typography>
            <Typography style={{ color: 'black', marginLeft: '4px' }}>
              {tableSummary?.departmentAppliedVolumetryProcessPercentage}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography style={{ textWrap: 'nowrap' }}>
              Total Utilizat vs Standard (nr. ore):
            </Typography>
            <Typography style={{ color: 'black', marginLeft: '4px' }}>
              {tableSummary?.departmentUtilizedVsStandardHours}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography style={{ textWrap: 'nowrap' }}>
              Total Utilizat vs Standard (FTE):
            </Typography>
            <Typography style={{ color: 'black', marginLeft: '4px' }}>
              {tableSummary?.departmentUtilizedVsStandardFTE}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default EvaluationReports
