import { CircularProgress, Grid } from '@mui/material'
import { Paper } from '@mui/material'
import { Tabs } from 'components/core-ui/Tabs'
import { Box, useMediaQuery } from '@mui/material'
import { ExistingClient } from './ExistingClient'
import { NewClient } from './NewClient'

import { useQuery } from 'react-query'
import { ShoppingCartStepper } from '../../core-ui/ShoppingCartStepper'
import { ShoppingCartSummary } from '../ShoppingCart'
import { useNotification } from 'hooks'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'

interface SelectClientProps {
  selectNewClient?: boolean
}

const SelectClient: React.FC<SelectClientProps> = ({ selectNewClient }) => {
  const { showNotification } = useNotification()
  const isXs = useMediaQuery('(max-width:624px)')

  const { data: products, isLoading: isLoadingGetProducts } = useQuery(
    ['cart-products'],
    async () => {
      const response = await makeCoreGetRequest(`/supply-omni/cart/product`)

      return response
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea listei de produse. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const tabs = [
    {
      content: <ExistingClient selectNewClient={selectNewClient} />,
      label: 'Client existent',
      tabIndex: 0
    },
    {
      content: <NewClient selectNewClient={selectNewClient} />,
      label: 'Client nou',
      tabIndex: 1
    }
  ]

  const isShowStepper = localStorage.getItem('isStepperStep')
  const isShowOrderSummary = localStorage.getItem('isStepperStep')

  return (
    <Box sx={!isXs ? { margin: '24px' } : { margin: '12px' }}>
      {isLoadingGetProducts ? (
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      ) : (
        <Grid sx={{ mt: 1 }} container spacing={2}>
          {isShowStepper && (
            <Grid item xs={12}>
              <ShoppingCartStepper activeStep={1} />
            </Grid>
          )}
          <Grid
            style={{ paddingTop: '16px', marginTop: 0, height: 'auto', paddingLeft: '30px' }}
            item
            xs={12}
            md={isShowOrderSummary ? 8 : 12}
          >
            <Paper sx={{ pt: 0, pb: 2, minHeight: '400px' }}>
              <Box sx={{ pl: 3, pr: 3, pt: 0 }}>
                <Tabs
                  tabsContainerStyle={{ borderBottom: 1, borderColor: '#E5E5E5', margin: 0 }}
                  tabs={tabs}
                />
              </Box>
            </Paper>
          </Grid>
          {isShowOrderSummary && (
            <Grid item xs={12} md={4}>
              <ShoppingCartSummary sx={{ pl: 2, pr: 2 }} order={products || {}} />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}

export default SelectClient
