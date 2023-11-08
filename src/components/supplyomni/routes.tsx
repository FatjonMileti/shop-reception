import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { ProductScan } from './ProductScan'
import { MySales } from './MySales'
import { ShoppingCart } from './ShoppingCart'

export const useSupplyOmniRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_PRODUCT_SCAN}
        element={<PrivateRoute component={ProductScan} applicationPages={applicationPages} />}
      />
      <Route
        path={URLS.MY_SALES}
        element={<PrivateRoute component={MySales} applicationPages={applicationPages} />}
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
    </>
  )
}
