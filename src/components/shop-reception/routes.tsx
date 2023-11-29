import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { Home } from './Home'
import { AdminDashboard } from './AdminDashboard'
import { ReceptionDashboard } from './ReceptionDashboard'
import { PackageDashboard } from './PackageDashboard'
import { TruckList } from './TruckList'
import { DeliverySlipsList } from './DeliverySlipsList'
import { SupportWrongDestination } from './SupportWrongDestination'
import { UnorderedProducts } from './UnorderedProducts'
import { MetiFiles } from './MetiFiles'
import { DifferencesProducts } from './DifferencesProducts'
import { SupportTradability } from './SupportTradability'
import { AdminDeposit } from './AdminDeposit'
import { AdminHub } from './AdminHub'
import { AdminStore } from './AdminStore'
import { AdminRegions } from './AdminRegions'
import { ManageScanTypes } from './ManageScanTypes'
import SubFamilyValidityThreshold from './SubFamilyValidityThreshold/SubFamilyValidityThreshold'
import { MetiProducts } from './MetiProducts'
import { SensitiveProducts } from './SensitiveProducts'
import { PackingTypes } from './PackingTypes'
import { DLCProducts } from './DLCProducts'
import { ReceptionFiles } from './ReceptionFiles'
import { CentralizeStoresHub } from './CentralizeStoresHub'

export const useShopReceptionRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_HOME}
        element={<Home />}
      />
      <Route
        path={URLS.AUTH_ADMIN_DASHBOARD}
        element={<AdminDashboard />}
      />
      <Route
        path={URLS.AUTH_RECEPTION_DASHBOARD}
        element={<ReceptionDashboard />}
      />
      <Route
        path={URLS.AUTH_PACKAGE_DASHBOARD}
        element={<PackageDashboard />}
      />
      <Route
        path={URLS.AUTH_TRUCK_LIST}
        element={<TruckList />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_SLIPS_LIST}
        element={<DeliverySlipsList />}
      />
      <Route
        path={URLS.AUTH_SUPPORT_WRONG_DESTINATION}
        element={<SupportWrongDestination />}
      />
      <Route
        path={URLS.AUTH_UNORDERED_PRODUCTS}
        element={<UnorderedProducts />}
      />
      <Route
        path={URLS.AUTH_METI_FILES}
        element={<MetiFiles />}
      />
      <Route
        path={URLS.AUTH_DIFFERENCES_PRODUCTS}
        element={<DifferencesProducts />}
      />
      <Route
        path={URLS.AUTH_SUPPORT_TRADABILITY}
        element={<SupportTradability />}
      />
      <Route
        path={URLS.AUTH_ADMIN_DEPOSIT}
        element={<AdminDeposit />}
      />
      <Route
        path={URLS.AUTH_ADMIN_HUB}
        element={<AdminHub />}
      />
      <Route
        path={URLS.AUTH_ADMIN_STORE}
        element={<AdminStore />}
      />
      <Route
        path={URLS.AUTH_ADMIN_REGIONS}
        element={<AdminRegions />}
      />
      <Route
        path={URLS.AUTH_MANAGE_SCAN_TYPES}
        element={<ManageScanTypes />}
      />
      <Route
        path={URLS.AUTH_SUBFAMILY_VALIDITY_THRESHOLD}
        element={<SubFamilyValidityThreshold />}
      />
      <Route
        path={URLS.AUTH_METI_PRODUCTS}
        element={<MetiProducts />}
      />
      <Route
        path={URLS.AUTH_ADMIN_SENSITIVE_PRODUCTS}
        element={<SensitiveProducts />}
      />
      <Route
        path={URLS.AUTH_ADMIN_PACKING_TYPES}
        element={<PackingTypes />}
      />
      <Route
        path={URLS.AUTH_MANAGE_DLC_PRODUCTS}
        element={<DLCProducts />}
      />
      <Route
        path={URLS.AUTH_RECEPTION_FILES_INFO}
        element={<ReceptionFiles />}
      />
      <Route
        path={URLS.AUTH_CENTRALIZATION_STORES_HUB}
        element={<CentralizeStoresHub />}
      />
    </>
  )
}
