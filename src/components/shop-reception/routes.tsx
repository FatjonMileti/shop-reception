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
    </>
  )
}
