import { Grid, Box } from '@mui/material'
import { Button, Table } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Dispatch, useEffect, useState } from 'react'
import { columns, toBatchFormat } from './helpers'

interface SelectBatchProps {
  onContinue: () => void
  onCancel: () => void
  setSelectedRows: Dispatch<any>
}

export const SelectBatch = (props: SelectBatchProps) => {
  const { onContinue, onCancel, setSelectedRows } = props
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true) 

      try {
        const response = await makeCoreGetRequest(`/bakery/batch`)
        setTableItems(response.list)
        setTotalCount(response.page.totalCount)
        setIsLoading(false)
      } catch (error) {
        showNotification({
          message: `Error while fetching data: ${formatErrorMessage(error)}`,
          type: 'error'
        })
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <Grid container rowSpacing={3.5}>
      <Grid item xs={12} spacing={2}>
        <Box>
          <Table
            orderBy="entryDate"
            order="asc"
            rows={tableItems}
            isLoading={isLoading}
            columns={columns}
            totalCount={totalCount}
            selectRows={rows => setSelectedRows(toBatchFormat(rows))}
          />
        </Box>
      </Grid>

      <Grid item xs={12} container justifyContent="space-between">
        <Grid>
          <Button size="large" variant="outlined" label="Anuleaza" onClick={onCancel} />
        </Grid>

        <Grid>
          <Button
            size="large"
            variant="contained"
            label="Continua"
            onClick={onContinue}
            disabled={false}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
