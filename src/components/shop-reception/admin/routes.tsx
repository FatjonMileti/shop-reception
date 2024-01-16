import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { Home } from './Home'
import { AdminDashboard } from './AdminDashboard'
import { ReceptionDashboard } from './ReceptionDashboard'
import { PackageDashboard } from './PackageDashboard'
import { TruckList } from './ReceptionDashboard/TruckList'
import { DeliverySlipsList } from './ReceptionDashboard/DeliverySlipsList'
import { SupportWrongDestination } from './ReceptionDashboard/SupportWrongDestination'
import { UnorderedProducts } from './ReceptionDashboard/UnorderedProducts'
import { MetiFiles } from './ReceptionDashboard/MetiFiles'
import { MetiFileDetail } from './ReceptionDashboard/MetiFiles/MetiFileDetail'
import { DifferencesProducts } from './ReceptionDashboard/DifferencesProducts'
import { SupportTradability } from './ReceptionDashboard/SupportTradability'
import { AdminDeposit } from './AdminDashboard/AdminDeposit'
import { AdminHub } from './AdminDashboard/AdminHub'
import { AdminStore } from './AdminDashboard/AdminStore'
import { AdminRegions } from './AdminDashboard/AdminRegions'
import { ManageScanTypes } from './AdminDashboard/ManageScanTypes'
import { SubFamilyValidityThreshold } from './AdminDashboard/SubFamilyValidityThreshold'
import { MetiProducts } from './AdminDashboard/MetiProducts'
import { SensitiveProducts } from './AdminDashboard/SensitiveProducts'
import { PackingTypes } from './AdminDashboard/PackingTypes'
import { DLCProducts } from './AdminDashboard/DLCProducts'
import { ReceptionFiles } from './AdminDashboard/ReceptionFiles'
import { CentralizeStoresHub } from './AdminDashboard/CentralizeStoresHub'
import { ReturnTruckList } from './PackageDashboard/ReturnTruckList'
import { RollingPackages } from './PackageDashboard/RollingPackages'
import { BalancePackages } from './PackageDashboard/BalancePackages'
import { PackagingDisputes } from './PackageDashboard/PackagingDisputes'
import { PackagingTypesDifferences } from './PackageDashboard/PackagingTypesDifferences'
import { ReturnedPackaging } from './PackageDashboard/ReturnedPackaging'
import { PackagingCompliance } from './PackageDashboard/PackagingCompliance'
import { PackagingDisputesTimer } from './PackageDashboard/PackagingDisputesTimer'
import { ShowDeliverySlip } from './ReceptionDashboard/DeliverySlipsList/ShowDeliverySlip'
import { TruckDetail } from './ReceptionDashboard/TruckList/TruckDetail'
import { SupportWrongDestinationDetail } from './ReceptionDashboard/SupportWrongDestination/SupportWrongDestinationDetail'
import { PackagingDisputesTimerDetail } from './PackageDashboard/PackagingDisputesTimer/PackagingDisputesTimerDetail'
import { BalancePackageHistory } from './PackageDashboard/BalancePackages/BalancePackageHistory'
import { BalancePackageForm } from './PackageDashboard/BalancePackages/BalancePackageForm'
import { SGRProducts } from './AdminDashboard/SGRProducts'

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
      <Route
        path={URLS.AUTH_RETURN_TRUCK_LIST}
        element={<ReturnTruckList />}
      />
      <Route
        path={URLS.AUTH_ROLLING_PACKAGES}
        element={<RollingPackages />}
      />
      <Route
        path={URLS.AUTH_BALANCE_PACKAGING}
        element={<BalancePackages />}
      />
      <Route
        path={URLS.AUTH_PACKAGING_DISPUTES_OF_STORE_RETURNS}
        element={<PackagingDisputes />}
      />
      <Route
        path={URLS.AUTH_PACKAGING_TYPES_DIFFERENCES}
        element={<PackagingTypesDifferences />}
      />
      <Route
        path={URLS.AUTH_RETURNED_PACKAGING}
        element={<ReturnedPackaging />}
      />
      <Route
        path={URLS.AUTH_PACKAGING_COMPLIANCE}
        element={<PackagingCompliance />}
      />
      <Route
        path={URLS.AUTH_PACKAGING_DISPUTES_OF_TIMER_ADMINISTRATION}
        element={<PackagingDisputesTimer />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_SLIP}
        element={<ShowDeliverySlip />}
      />
      <Route
        path={URLS.AUTH_TRUCK_DETAIL}
        element={<TruckDetail />}
      />
      <Route
        path={URLS.AUTH_SUPPORT_WRONG_DESTINATION_DETAIL}
        element={<SupportWrongDestinationDetail />}
      />
      <Route
        path={URLS.AUTH_METI_FILE_DETAIL}
        element={<MetiFileDetail />}
      />
      <Route
        path={URLS.AUTH_PACKAGING_DISPUTES_OF_TIMER_DETAIL}
        element={<PackagingDisputesTimerDetail />}
      />
      <Route
        path={URLS.AUTH_BALANCE_PACKAGING_FORM}
        element={<BalancePackageForm />}
      />
      <Route
        path={URLS.AUTH_BALANCE_PACKAGING_HISTORY}
        element={<BalancePackageHistory />}
      />
      <Route
        path={URLS.AUTH_SGR_PRODUCTS}
        element={<SGRProducts />}
      />
    </>
  )
}
