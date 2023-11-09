import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { Login } from "./Login"
import { Home } from "./Home"

export const useMerchandiseRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.MERCHANDISE_LOGIN}
        element={<Login />}
      />
      <Route
        path={URLS.AUTH_MERCHANDISE_HOME}
        element={<Home />}
      />
    </>
  )
}
