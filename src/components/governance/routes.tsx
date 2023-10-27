import { TeamDayOffManagement } from 'components/TeamDayOffManagement'
import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'

export const useGovernanceRoutes = applicationPages => {
  return (
    <Route
      element={
        <PrivateRoute
          component={TeamDayOffManagement}
          applicationPages={applicationPages}
          checkIsAuthorized
        />
      }
      path={URLS.AUTH_PROJECT_TEAM}
    >
      <Route
        path={URLS.AUTH_TEAM_DAY_OFF_MANAGEMENT}
        element={
          <PrivateRoute
            component={TeamDayOffManagement}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </Route>
  )
}
