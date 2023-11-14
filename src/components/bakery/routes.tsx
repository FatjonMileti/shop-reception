import { PrivateRoute } from 'components/utils/PrivateRoute'
import { URLS } from './constants'
import { Route } from 'react-router-dom'
import { Regions } from './Regions'
import { Zones } from './Zones'
import { UsersManagement } from './UsersManagement'
import { Families } from './Families'

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
        path={URLS.AUTH_REGIONS}
        element={
          <PrivateRoute
            component={Regions}
            applicationPages={applicationPages}
            checkIsAuthorized
        />
        }
      />
      <Route
        path={URLS.AUTH_FAMILIES}
        element={
          <PrivateRoute
            component={Families}
            applicationPages={applicationPages}
            checkIsAuthorized
        />
        }
      />
    </>
  )
}
