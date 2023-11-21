import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { UsersManagement } from './UsersManagement'
import { Zones } from './Zones'
import { Regions } from './Regions'
import { Stores } from './Stores'
import { Growth } from './Growth'
import { Clusters } from './Clusters'
import { Families } from './Families'
import { FamilyProducts } from './Families/FamilyProducts'
import { Products } from './Products'
import { ProductManagement } from './TraineeRole/ProductManagement'

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
          <PrivateRoute component={Zones} applicationPages={applicationPages} checkIsAuthorized />
        }
      />
      <Route
        path={URLS.AUTH_STORES}
        element={
          <PrivateRoute component={Stores} applicationPages={applicationPages} checkIsAuthorized />
        }
      />
      <Route
        path={URLS.AUTH_REGIONS}
        element={
          <PrivateRoute component={Regions} applicationPages={applicationPages} checkIsAuthorized />
        }
      />
      <Route
        path={URLS.AUTH_GROWTH}
        element={
          <PrivateRoute component={Growth} applicationPages={applicationPages} checkIsAuthorized />
        }
      />
      <Route
        path={URLS.AUTH_CLUSTERS}
        element={
          <PrivateRoute
            component={Clusters}
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
      <Route
        path={URLS.AUTH_FAMILY_PRODUCTS}
        element={
          <PrivateRoute
            component={FamilyProducts}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PRODUCTS}
        element={
          <PrivateRoute
            component={Products}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      {/* Formator */}
      <Route
        path={URLS.AUTH_PRODUCT_MANAGEMENT}
        element={
          <PrivateRoute
            component={ProductManagement}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
