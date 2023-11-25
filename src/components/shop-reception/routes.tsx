import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { Home } from './Home'
import { AdminDashboard } from './AdminDashboard'
import { ReceptionDashboard } from './ReceptionDashboard'
import { PackageDashboard } from './PackageDashboard'

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
    </>
  )
}
