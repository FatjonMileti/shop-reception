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
    </>
  )
}
