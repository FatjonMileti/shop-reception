import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { Alerts } from './Alerts'
import { Alert } from './Alert'
import { PrivateRoute } from 'components/utils/PrivateRoute'

export const useLostSalesOpportunitiesRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_ALERTS}
        element={<PrivateRoute component={Alerts} applicationPages={applicationPages} />}
      />
      <Route
        path={URLS.AUTH_ALERT}
        element={<PrivateRoute component={Alert} applicationPages={applicationPages} />}
      />
    </>
  )
}
