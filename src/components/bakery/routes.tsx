import { PrivateRoute } from 'components/utils/PrivateRoute'
import { URLS } from './constants'
import { Route } from 'react-router-dom'
import { Zones } from './Zones'
import { UsersManagement } from './UsersManagement'

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
    </>
  )
}
