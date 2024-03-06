import { Grid, Box, debounce } from '@mui/material'
import { Button, Table } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { useState } from 'react'
import { columns } from './helpers'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
interface SelectBatchProps {
  onContinue: (batches: any[]) => void
  onCancel: () => void
  componentMetiCode: string | number
}

export const SelectBatch = ({
  onContinue,
  onCancel,
  componentMetiCode,
}: SelectBatchProps) => {
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const fetchData = async (page, rowsPerPage) => {
    try {
      setIsLoading(true)
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/batch',
          page,
          rowsPerPage,
          filters: [
            {
              name: 'product.metiCode',
              value: componentMetiCode
            }
          ]
        })
      )
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

  return (
    <Grid container rowSpacing={3.5}>
      <Grid item xs={12} spacing={2}>
        <Box>
          <Table
            orderBy="entryDate"
            order="asc"
            rows={tableItems}
            isLoading={isLoading}
            handleRemoteData={debounce(fetchData, 500)}
            isRemote
            columns={columns}
            totalCount={totalCount}
            selectRows={setSelectedRows}
            rowsPerPage={25}
            rowsPerPageOptions={[25, 50, 100]}
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
            onClick={() => onContinue(selectedRows)}
            disabled={false}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
