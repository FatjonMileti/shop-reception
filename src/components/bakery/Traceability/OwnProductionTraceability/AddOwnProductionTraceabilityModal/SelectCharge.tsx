import { Grid, Box, debounce } from '@mui/material'
import { Button, Table } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { useState } from 'react'
import { chargeColumns } from './helpers'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'

interface SelectChargeProps {
  onContinue: (charges: any[]) => void
  onCancel: () => void
  componentMetiCode: string | number
}

export const SelectCharge = ({
  onContinue,
  onCancel,
  componentMetiCode,
}: SelectChargeProps) => {
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
          url: '/bakery/traceability/production',
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
            handleRemoteData={debounce(fetchData, 500)}
            isLoading={isLoading}
            isRemote
            columns={chargeColumns}
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
