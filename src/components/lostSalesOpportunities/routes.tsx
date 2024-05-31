import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { Alerts } from './Alerts'
import { PrivateRoute } from 'components/utils/PrivateRoute'

export const useLostSalesOpportunitiesRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_ALERTS}
        element={<PrivateRoute component={Alerts} applicationPages={applicationPages} />}
      />
      {/* <Route
        path={URLS.AUTH_TASK}
        element={<PrivateRoute component={Task} applicationPages={applicationPages} />}
      /> */}
    </>
  )
}
