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
import { GrowthRegion } from './RegionManagerRole/GrowthRegion'
import { GrowthRegionPrint } from './RegionManagerRole/GrowthRegionPrint'
import { StoreGrowthCoefficient } from './TraineeRole/StoreGrowthCoefficient'
import { ProductsGrowthCoefficient } from './TraineeRole/ProductsGrowthCoefficient'
import { RegionGrowthCoefficient } from './TraineeRole/RegionGrowthCoefficient'
import { ApplicationUsageReport } from './TraineeRole/ApplicationUsageReport'
import { CadentierSalesRegion } from './RegionManagerRole/CadentierSalesRegion'
import { GrowthIndex } from './RegionManagerRole/GrowthIndex'
import { GrowthIndexView } from './RegionManagerRole/GrowthIndex/GrowthIndexView'
import { GrowthIndexProductsView } from './RegionManagerRole/GrowthIndex/GrowthIndexProductsView'
import { CadentierReportAndSales } from './TraineeRole/CadentierReportAndSales'

import { ProductManagementStore } from './StoreManagerRole/ProductManagementStore'
import { UsageReportRegion } from './RegionManagerRole/UsageReportRegion'
import { ProductGrowthIndex } from './StoreManagerRole/ProductGrowthIndex'
import { ProductionManagementStore } from './StoreManagerRole/ProductionManagementStore'
import { ProductionManagementStorePrint } from './StoreManagerRole/ProductionManagementStorePrint'
import { GrowthIndexStore } from './StoreManagerRole/GrowthIndexStore'
import ReportAndSalesStore from './StoreManagerRole/ReportAndSalesStore/ReportAndSalesStore'
import { Ingredients } from './Ingredients'

import { ProductManagementTraceability } from './Traceability/ProductManagementTraceability/ProductManagementTraceability'
import { ReceivedProducts } from './Traceability/ReceivedProducts/ReceivedProducts'
import { FrozenTraceability } from './Traceability/FrozenTraceability/FrozenTraceability'
import { ReportFrozenTraceability } from './Traceability/ReportFrozenTraceability/ReportFrozenTraceability'
import { ReportFrozenTraceabilityPrint } from './Traceability/ReportFrozenTraceabilityPrint/ReportFrozenTraceabilityPrint'
import { OwnProductionTraceability } from './Traceability/OwnProductionTraceability/OwnProductionTraceability'
import { ReportOwnProductionTraceability } from './Traceability/ReportOwnProductionTraceability/ReportOwnProductionTraceability'
import { ReportOwnProductionTraceabilityPrint } from './Traceability/ReportOwnProductionTraceabilityPrint/ReportOwnProductionTraceabilityPrint'

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
      <Route
        path={URLS.AUTH_INGREDIENTS}
        element={
          <PrivateRoute
            component={Ingredients}
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
        path={URLS.AUTH_REGION_GROWTH_COEFFICIENT}
        element={
          <PrivateRoute
            component={RegionGrowthCoefficient}
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
      <Route
        path={URLS.AUTH_CADENTIER_REPORT_AND_SALES}
        element={
          <PrivateRoute
            component={CadentierReportAndSales}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      {/* store manager role */}
      <Route
        path={URLS.AUTH_PRODUCT_MANAGEMENT_STORE}
        element={
          <PrivateRoute
            component={ProductManagementStore}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PRODUCT_GROWTH_INDEX}
        element={
          <PrivateRoute
            component={ProductGrowthIndex}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_PRODUCTION_MANAGEMENT_STORE}
        element={
          <PrivateRoute
            component={ProductionManagementStore}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_PRODUCTION_MANAGEMENT_STORE_PRINT}
        element={
          <PrivateRoute
            component={ProductionManagementStorePrint}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_GROWTH_INDEX_STORE}
        element={
          <PrivateRoute
            component={GrowthIndexStore}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_REPORT_AND_SALES_STORE}
        element={
          <PrivateRoute
            component={ReportAndSalesStore}
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
      <Route
        path={URLS.AUTH_GROWTH_REGION}
        element={
          <PrivateRoute
            component={GrowthRegion}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_GROWTH_REGION_PRINT}
        element={
          <PrivateRoute
            component={GrowthRegionPrint}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_GROWTH_INDEX}
        element={
          <PrivateRoute
            component={GrowthIndex}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_GROWTH_INDEX_VIEW}
        element={
          <PrivateRoute
            component={GrowthIndexView}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_GROWTH_INDEX_PRODUCTS_VIEW}
        element={
          <PrivateRoute
            component={GrowthIndexProductsView}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_USAGE_REPORT_REGION}
        element={
          <PrivateRoute
            component={UsageReportRegion}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_CADENTIER_SALES_REGION}
        element={
          <PrivateRoute
            component={CadentierSalesRegion}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      {/* traceability operator role */}
      <Route
        path={URLS.AUTH_PRODUCT_MANAGEMENT_TRACEABILITY}
        element={
          <PrivateRoute
            component={ProductManagementTraceability}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_RECEIVED_PRODUCTS_TRACEABILITY}
        element={
          <PrivateRoute
            component={ReceivedProducts}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_FROZEN_TRACEABILITY}
        element={
          <PrivateRoute
            component={FrozenTraceability}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_REPORT_FROZEN_TRACEABILITY}
        element={
          <PrivateRoute
            component={ReportFrozenTraceability}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_REPORT_FROZEN_TRACEABILITY_PRINT}
        element={
          <PrivateRoute
            component={ReportFrozenTraceabilityPrint}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_REPORT_FROZEN_TRACEABILITY_FORMATOR}
        element={
          <PrivateRoute
            component={ReportFrozenTraceability}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_REPORT_FROZEN_TRACEABILITY_PRINT_FORMATOR}
        element={
          <PrivateRoute
            component={ReportFrozenTraceabilityPrint}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_OWN_PRODUCTION_TRACEABILITY}
        element={
          <PrivateRoute
            component={OwnProductionTraceability}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_REPORT_OWN_PRODUCTION_TRACEABILITY}
        element={
          <PrivateRoute
            component={ReportOwnProductionTraceability}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_REPORT_OWN_PRODUCTION_TRACEABILITY_PRINT}
        element={
          <PrivateRoute
            component={ReportOwnProductionTraceabilityPrint}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_REPORT_OWN_PRODUCTION_TRACEABILITY_FORMATOR}
        element={
          <PrivateRoute
            component={ReportOwnProductionTraceability}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_REPORT_OWN_PRODUCTION_TRACEABILITY_PRINT_FORMATOR}
        element={
          <PrivateRoute
            component={ReportOwnProductionTraceabilityPrint}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
