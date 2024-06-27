import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import {
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { URLS } from 'components/shop-reception/mobile/constants'

const ExpectedDepositReturnsStep4 = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const item = location.state.item

  const { data, isLoading: isLoadingSummary } = useQuery(
    ['summary'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/truck/deposit/return/summary/${item.id}`,
        null
      )
      return response
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const finaliseReturn = async () => {
    await makeCorePostRequest(
      `/shop-reception-mobile/truck/deposit/return/finalise-return/${item.id}`
    )
  }

  const { isLoading: isMutateLoading, mutate } = useMutation(finaliseReturn, {
    onSuccess: res => {
      showNotification({
        message: `Confirmat`,
        type: 'success'
      })
      navigate('/')
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  if (isLoadingSummary) {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={0} justifyContent={'center'}>
      <Grid xs={10} item>
        <Table>
          <TableHead style={{ backgroundColor: '#0970E6' }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Asteptate</TableCell>
              <TableCell>Descarcate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.supportList.map(item => (
              <TableRow>
                <TableCell>{item.supportCode}</TableCell>
                <TableCell>{item.supportTypeName}</TableCell>
                <TableCell>{item.confirmedSupportNumber}</TableCell>
                <TableCell>{item.supportNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Finalizeaza"
          style={{ width: '100%' }}
          onClick={() => mutate()}
          disabled={isMutateLoading}
        />
      </Grid>
    </Grid>
  )
}

export default ExpectedDepositReturnsStep4
