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
import { SalesCadentier } from './SalesCadentier'
import { ProductManagementRegion } from './RegionManagerRole/ProductManagementRegion'
import { UsageReport } from './UsageReport'
import { ProductManagement } from './TraineeRole/ProductManagement'
import { ProductionManagement } from './TraineeRole/ProductionManagement'
import { ProductionManagementPrint } from './TraineeRole/ProductionManagementPrint'
import { StoreGrowthCoefficient } from './TraineeRole/StoreGrowthCoefficient'
import { ProductsGrowthCoefficient } from './TraineeRole/ProductsGrowthCoefficient'
import { ApplicationUsageReport } from './TraineeRole/ApplicationUsageReport'

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
      <Route
        path={URLS.AUTH_USAGE_REPORT}
        element={
          <PrivateRoute
            component={UsageReport}
            applicationPages={applicationPages}
            checkIsAuthorized
        />
        }
      />
      <Route
        path={URLS.AUTH_SALES_CADENTIER}
        element={
          <PrivateRoute
            component={SalesCadentier}
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
     
      
      <Route
        path={URLS.AUTH_PRODUCTION_MANAGEMENT}
        element={
          <PrivateRoute
            component={ProductionManagement}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PRODUCTION_MANAGEMENT_PRINT}
        element={
          <PrivateRoute
            component={ProductionManagementPrint}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_STORE_GROWTH_COEFFICIENT}
        element={
          <PrivateRoute
            component={StoreGrowthCoefficient}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PRODUCTS_GROWTH_COEFFICIENT}
        element={
          <PrivateRoute
            component={ProductsGrowthCoefficient}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_APPLICATION_USAGE_REPORT}
        element={
          <PrivateRoute
            component={ApplicationUsageReport}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      

      {/* region manager role */}
      <Route
        path={URLS.AUTH_PRODUCT_MANAGEMENT_REGION}
        element={
          <PrivateRoute
            component={ProductManagementRegion}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
