import { PrivateRoute } from 'components/utils/PrivateRoute'
import { URLS } from './constants'
import { UsersManagement } from './UsersManagement'
import { Route } from 'react-router-dom'

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
    </>
  )
}
