import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { TruckList } from './ReceptionDashboard/TruckList'
import {
  DeliveryTicketsList,
  DeliveryTicketsDetails
} from './ReceptionDashboard/DeliveryTicketsList'
import { SupportWrongDestination } from './ReceptionDashboard/SupportWrongDestination'
import { UnorderedProducts } from './ReceptionDashboard/UnorderedProducts'
import { MetiFiles } from './ReceptionDashboard/MetiFiles'
import { MetiFileDetail } from './ReceptionDashboard/MetiFiles/MetiFileDetail'
import { DifferencesProducts } from './ReceptionDashboard/DifferencesProducts'
import { SupportTradability } from './ReceptionDashboard/SupportTradability'
import { GoodsDeliveryReport } from './ReceptionDashboard/GoodsDeliveryReport'
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
import { PackagingDispute } from './PackageDashboard/PackagingDispute'
import { PackingDisputeImages } from './PackageDashboard/PackingDisputeImages'
import { PackagingTypesDifferences } from './PackageDashboard/PackagingTypesDifferences'
import { ReturnedPackaging } from './PackageDashboard/ReturnedPackaging'
import { PackagingCompliance } from './PackageDashboard/PackagingCompliance'
import { PackagingDisputesTimer } from './PackageDashboard/PackagingDisputesTimer'
import { PackagingInventory } from './PackageDashboard/PackagingInventory'
import { PackagingInventoryHistory } from './PackageDashboard/PackagingInventoryHistory'
import { CentralizedNotice } from './PackageDashboard/CentralizedNotice'
import { TransportResponsible } from './PackageDashboard/TransportResponsible'
import { TruckDetail } from './ReceptionDashboard/TruckList/TruckDetail'
import { SupportWrongDestinationDetail } from './ReceptionDashboard/SupportWrongDestination/SupportWrongDestinationDetail'
import { PackagingDisputesTimerDetail } from './PackageDashboard/PackagingDisputesTimer/PackagingDisputesTimerDetail'
import { BalancePackageHistory } from './PackageDashboard/BalancePackageHistory'
import { SeriesNumber } from './AdminDashboard/SeriesNumber'
import { SGRProducts } from './AdminDashboard/SGRProducts'
import SupportCode from './ReceptionDashboard/DeliveryTicketsList/DeliveryTicketsDetails/SupportCode/SupportCode'

export const useShopReceptionRoutes = applicationPages => {
  return (
    <>
      {/* Admin */}
      <Route
        path={URLS.AUTH_ADMIN_DEPOSITS}
        element={
          <PrivateRoute
            component={AdminDeposit}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_ADMIN_HUBS}
        element={
          <PrivateRoute
            component={AdminHub}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_ADMIN_STORES}
        element={
          <PrivateRoute
            component={AdminStore}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_ADMIN_REGIONS}
        element={
          <PrivateRoute
            component={AdminRegions}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_CENTRALIZATION_STORES_HUB}
        element={
          <PrivateRoute
            component={CentralizeStoresHub}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_MANAGE_SCAN_TYPES}
        element={
          <PrivateRoute
            component={ManageScanTypes}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_SUBFAMILY_VALIDITY_THRESHOLD}
        element={
          <PrivateRoute
            component={SubFamilyValidityThreshold}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_METI_PRODUCTS}
        element={
          <PrivateRoute
            component={MetiProducts}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_ADMIN_SENSITIVE_PRODUCTS}
        element={
          <PrivateRoute
            component={SensitiveProducts}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_ADMIN_PACKING_TYPES}
        element={
          <PrivateRoute
            component={PackingTypes}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_MANAGE_DLC_PRODUCTS}
        element={
          <PrivateRoute
            component={DLCProducts}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_RECEPTION_FILES_INFO}
        element={
          <PrivateRoute
            component={ReceptionFiles}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_SERIES_NUMBER}
        element={
          <PrivateRoute
            component={SeriesNumber}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_SGR_PRODUCTS}
        element={
          <PrivateRoute
            component={SGRProducts}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      {/* Reception */}

      <Route
        path={URLS.AUTH_DELIVERY_SLIPS_LIST}
        element={
          <PrivateRoute
            component={DeliveryTicketsList}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_DELIVERY_SLIPS_SUPPORT_CODE}
        element={
          <PrivateRoute
            component={SupportCode}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_DELIVERY_SLIP}
        element={
          <PrivateRoute
            component={DeliveryTicketsDetails}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_TRUCK_LIST}
        element={
          <PrivateRoute
            component={TruckList}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_SUPPORT_WRONG_DESTINATION}
        element={
          <PrivateRoute
            component={SupportWrongDestination}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_UNORDERED_PRODUCTS}
        element={
          <PrivateRoute
            component={UnorderedProducts}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_METI_FILES}
        element={
          <PrivateRoute
            component={MetiFiles}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_METI_FILE_DETAIL}
        element={
          <PrivateRoute
            component={MetiFileDetail}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_DIFFERENCES_PRODUCTS}
        element={
          <PrivateRoute
            component={DifferencesProducts}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_SUPPORT_TRADABILITY}
        element={
          <PrivateRoute
            component={SupportTradability}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_GOODS_DELIVERY_REPORT}
        element={
          <PrivateRoute
            component={GoodsDeliveryReport}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      {/* Package */}
      <Route
        path={URLS.AUTH_RETURN_TRUCK_LIST}
        element={
          <PrivateRoute
            component={ReturnTruckList}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_ROLLING_PACKAGES}
        element={
          <PrivateRoute
            component={RollingPackages}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_BALANCE_PACKAGING}
        element={
          <PrivateRoute
            component={BalancePackages}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PACKAGING_DISPUTES_OF_STORE_RETURNS}
        element={
          <PrivateRoute
            component={PackagingDisputes}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PACKAGING_DISPUTE_OF_STORE_RETURNS}
        element={
          <PrivateRoute
            component={PackagingDispute}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PACKAGING_DISPUTE_OF_STORE_RETURNS_IMAGES}
        element={
          <PrivateRoute
            component={PackingDisputeImages}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PACKAGING_TYPES_DIFFERENCES}
        element={
          <PrivateRoute
            component={PackagingTypesDifferences}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_RETURNED_PACKAGING}
        element={
          <PrivateRoute
            component={ReturnedPackaging}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PACKAGING_COMPLIANCE}
        element={
          <PrivateRoute
            component={PackagingCompliance}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PACKAGING_DISPUTES_OF_TIMER_ADMINISTRATION}
        element={
          <PrivateRoute
            component={PackagingDisputesTimer}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PACKING_INVENTORY}
        element={
          <PrivateRoute
            component={PackagingInventory}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PACKING_INVENTORY_HISTORY}
        element={
          <PrivateRoute
            component={PackagingInventoryHistory}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_CENTRALIZED_NOTICE}
        element={
          <PrivateRoute
            component={CentralizedNotice}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_TRANSPORT_RESPONSIBLE}
        element={
          <PrivateRoute
            component={TransportResponsible}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_TRUCK_DETAIL}
        element={
          <PrivateRoute
            component={TruckDetail}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_SUPPORT_WRONG_DESTINATION_DETAIL}
        element={
          <PrivateRoute
            component={SupportWrongDestinationDetail}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      <Route
        path={URLS.AUTH_PACKAGING_DISPUTES_OF_TIMER_DETAIL}
        element={
          <PrivateRoute
            component={PackagingDisputesTimerDetail}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_BALANCE_PACKAGING_HISTORY}
        element={
          <PrivateRoute
            component={BalancePackageHistory}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
