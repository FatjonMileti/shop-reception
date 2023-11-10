import { PrivateRoute } from 'components/utils/PrivateRoute'
import { URLS } from './constants'
import { UsersManagement } from './UsersManagement'
import { Route } from 'react-router-dom'
import { Regions } from './Regions'

export const useBakeryRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_USERS_MANAGEMENT}
        element={
          <PrivateRoute
            component={UsersManagement}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_REGIONS}
        element={
          <PrivateRoute
            component={Regions}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
