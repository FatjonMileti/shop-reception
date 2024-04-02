import { Grid, Box, debounce } from '@mui/material'
import { Button, Table } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { useState } from 'react'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { selectBatchColumns } from '../helpers'
import { formatPayloadDate } from '../../../../../utils/helpers'

interface SelectBatchProps {
  onContinue: (frozenItems: any[]) => void
  onCancel: () => void
  formik: any
}

export const SelectBatch = ({ formik, onContinue, onCancel }: SelectBatchProps) => {
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [selectedRows, setSelectedRows] = useState([])

  console.log('debug', formik.values)
  const fetchData = async (page, rowsPerPage) => {
    try {
      setIsLoading(true)
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/batch/assign',
          page,
          rowsPerPage,
          order: 'asc',
          orderBy: 'expireDate|entryDate',
          filters: [
            {
              name: 'product.metiCode',
              value: formik.values?.product?.metiCode
            },
            {
              name: 'batchStatus',
              value: 'AVAILABLE'
            }
          ],
          extraCustomUrlParams: [
            {
              name: 'productionDate',
              value: formatPayloadDate(formik.values.productionDate)
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
            isRemote
            isLoading={isLoading}
            columns={selectBatchColumns}
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
