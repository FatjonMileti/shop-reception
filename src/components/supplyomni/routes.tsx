import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { ProductScan } from './ProductScan'

export const useSupplyOmniRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_PRODUCT_SCAN}
        element={
          <PrivateRoute
            component={ProductScan}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
