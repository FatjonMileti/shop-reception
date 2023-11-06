import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { ProductScan } from './ProductScan'
import { ShoppingCart } from './ShoppingCart'

export const useSupplyOmniRoutes = applicationPages => {
  return (
    <Route path={URLS.AUTH_SUPPLY_OMNI}>
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
      <Route
        path={URLS.AUTH_SHOPPING_CART}
        element={
          <PrivateRoute
            component={ShoppingCart}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </Route>
  )
}
