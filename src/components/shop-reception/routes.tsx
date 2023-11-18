import { PrivateRoute } from "components/utils/PrivateRoute"
import { Route } from "react-router-dom"
import { URLS } from "./constants"
import { Home } from "./Home"

export const useShopReceptionRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_HOME}
        element={<Home />}
      />
    </>
  )
}
