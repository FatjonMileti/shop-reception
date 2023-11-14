import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { UsersManagement } from './UsersManagement'
import { Zones } from './Zones'
import { Stores } from './Stores'

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
        path={URLS.AUTH_ZONES}
        element={
          <PrivateRoute
            component={Zones}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_STORES}
        element={
          <PrivateRoute
            component={Stores}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
