import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { TruckCard } from 'components/shop-reception/admin/Common/TruckCard'
import { URLS } from '../../constants'
import { makeCoreGetRequest } from 'utils/api'

const ExpectedDepositReturns = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data, isLoading } = useQuery(
    ['deposit-return-list'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/truck/deposit/return/list`)
      return response || []
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

  if (isLoading && typeof data == 'undefined') {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      {data.length === 0 ? (
        <Grid xs={8} item>
          <Typography>Nu exista camioane de retur in lucru.</Typography>
        </Grid>
      ) : (
        <>
          {data?.map(item => (
            <Grid xs={12} item>
              <TruckCard
                key={1}
                onClick={() => {
                  navigate(URLS.AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_1, { state: { item: item } })
                }}
                truck={{
                  truckNumber: item.truckNumber,
                  shopNamesAndCodes: item.shopNamesAndCodes,
                  loadingDate: item.loadingDate,
                  driverName: item.driverName
                }}
              />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  )
}

export default ExpectedDepositReturns
