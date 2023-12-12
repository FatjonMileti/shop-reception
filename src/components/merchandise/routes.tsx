import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { PackagingInventoryUpdate } from './PackagingInventoryUpdate'
import { GoodsReception } from './GoodsReception'
import { GoodsReturn } from './GoodsReturn'
import { ListTrucks } from './GoodsReception/ListTrucks'
import { AddTruck } from './GoodsReception/ListTrucks/AddTruck'
import { ReceptionProcessing } from './GoodsReception/RceptionProcessing'
import { Delivery } from './GoodsReception/Delivery'
import { ConfirmReturnTrucks } from './GoodsReturn/ConfirmReturnTrucks'
import { OrderReturnTruck } from './GoodsReturn/OrderReturnTruck'
import { ExpectedTrucks } from './GoodsReturn/ExpectedTrucks'
import { RegisterTruck } from './GoodsReception/RegisterTruck'
import { ExpenditureProcessing } from './GoodsReception/ExpenditureProcessing'
import { ShippedTrucks } from './GoodsReception/ShippedTrucks'
import { ExpectedReturns } from './GoodsReturn/ExpectedReturns'
import { InProgressReturn } from './GoodsReturn/InProgressReturn'
import { ContinueReturn } from './GoodsReturn/ContinueReturn'
import { RecordReturn } from './GoodsReturn/RecordReturn'
import { SupportCode } from './GoodsReception/RegisterTruck/SupportCode'
import { RecordReturnDetail } from './GoodsReturn/RecordReturn/RecordReturnDetail'
import { TruckDetail } from './GoodsReception/ListTrucks/TruckDetail'

export const useMerchandiseRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_GOODS_RECEPTION}
        element={<GoodsReception />}
      />
      <Route
        path={URLS.AUTH_GOODS_RETURN}
        element={<GoodsReturn />}
      />
      <Route
        path={URLS.AUTH_LIST_TRUCKS}
        element={<ListTrucks />}
      />
      <Route
        path={URLS.AUTH_ADD_TRUCK}
        element={<AddTruck />}
      />
      <Route
        path={URLS.AUTH_RECEPTION_PROCESSING}
        element={<ReceptionProcessing />}
      />
      <Route
        path={URLS.AUTH_DELIVERY}
        element={<Delivery />}
      />
      <Route
        path={URLS.AUTH_CONFIRM_RETURN_TRUCKS}
        element={<ConfirmReturnTrucks />}
      />
      <Route
        path={URLS.AUTH_ORDER_RETURN_TRUCK}
        element={<OrderReturnTruck />}
      />
      <Route
        path={URLS.AUTH_PACKAGING_INVENTORY_UPDATE}
        element={<PackagingInventoryUpdate />}
      />
      <Route
        path={URLS.AUTH_EXPECTED_TRUCKS}
        element={<ExpectedTrucks />}
      />
      <Route
        path={URLS.AUTH_REGISTER_TRUCK}
        element={<RegisterTruck />}
      />
      <Route
        path={URLS.AUTH_PROCESSING_SHIPMENT}
        element={<ExpenditureProcessing />}
      />
      <Route
        path={URLS.AUTH_SHIPPED_TRUCKS}
        element={<ShippedTrucks />}
      />
      <Route
        path={URLS.AUTH_EXPECTED_RETURNS}
        element={<ExpectedReturns />}
      />
      <Route
        path={URLS.AUTH_IN_PROGRESS_RETURN}
        element={<InProgressReturn />}
      />
      <Route
        path={URLS.AUTH_CONTINUE_RETURN}
        element={<ContinueReturn />}
      />
      <Route
        path={URLS.AUTH_RECORD_RETURN}
        element={<RecordReturn />}
      />
      <Route
        path={URLS.AUTH_SUPPORT_CODE}
        element={<SupportCode />}
      />
      <Route
        path={URLS.AUTH_RECORD_RETURN_DETAIL}
        element={<RecordReturnDetail />}
      />
      <Route
        path={URLS.AUTH_TRUCK_DETAIL}
        element={<TruckDetail />}
      />
    </>
  )
}
