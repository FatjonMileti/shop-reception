import { Grid, Box, debounce } from '@mui/material'
import { Button, Table } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Dispatch, useState } from 'react'
import { columns, toBatchFormat } from './helpers'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { Product } from '../../ReceivedProducts/interfaces'

interface SelectBatchProps {
  onContinue: () => void
  onCancel: () => void
  setSelectedRows: Dispatch<any>
  selectedRows: any
  metiCode: any
  selectedProduct: Product
  recipeMetiCode: string
}

export const SelectBatch = (props: SelectBatchProps) => {
  const { onContinue, onCancel, setSelectedRows, selectedRows, recipeMetiCode } = props
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async (page, rowsPerPage) => {
    try {
      setIsLoading(true)
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/batch',
          page,
          rowsPerPage,
          filters: [{
            name: 'product.metiCode',
            value: recipeMetiCode
          }],
        })
      )
      setTableItems(response.list)
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch(error) {
      showNotification({
        message: `Error while fetching data: ${formatErrorMessage(error)}`,
        type: 'error'
      })
      setIsLoading(false)
    }
  }

  const onSelectRows = rows => {
    const newItems = rows.filter(row => !selectedRows.some(item => item.batchId === row.id))
    const newRows = [...selectedRows, ...toBatchFormat(newItems)]
    setSelectedRows(newRows)
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
            selectRows={onSelectRows}
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
            onClick={onContinue}
            disabled={false}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
