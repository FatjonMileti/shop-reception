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
import { SupportCode } from './SupportCode'
import { RecordReturnDetail } from './GoodsReturn/RecordReturn/RecordReturnDetail'
import { TruckDetail } from './GoodsReception/ListTrucks/TruckDetail'
import { AddTruckStep2 } from './GoodsReception/ListTrucks/AddTruckStep2'
import { ApproveTruck } from './SupportCode/ApproveTruck'
import { Step1 } from './GoodsReception/RegisterTruck/Step1'
import { Step2 } from './GoodsReception/RegisterTruck/Step2'
import { Step3 } from './GoodsReception/RegisterTruck/Step3'
import { Step4 } from './GoodsReception/RegisterTruck/Step4'
import { Step5 } from './GoodsReception/RegisterTruck/Step5'
import { Step6 } from './GoodsReception/RegisterTruck/Step6'
import { Step7 } from './GoodsReception/RegisterTruck/Step7'
import { ExpectedReturnDetail } from './GoodsReturn/ExpectedReturns/ExpectedReturnDetail'
import { ExpectedReturnDetailStep2 } from './GoodsReturn/ExpectedReturns/ExpectedReturnDetailStep2'
import { ExpectedReturnDetailStep3 } from './GoodsReturn/ExpectedReturns/ExpectedReturnDetailStep3'
import { DeliveryDetail } from './GoodsReception/Delivery/DeliveryDetail'

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
        path={URLS.AUTH_ADD_TRUCK_STEP_2}
        element={<AddTruckStep2 />}
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
      <Route
        path={URLS.AUTH_APPROVE_TRUCK}
        element={<ApproveTruck />}
      />
      <Route
        path={URLS.AUTH_TRUCK_STEP_1}
        element={<Step1 />}
      />
      <Route
        path={URLS.AUTH_TRUCK_STEP_2}
        element={<Step2 />}
      />
      <Route
        path={URLS.AUTH_TRUCK_STEP_3}
        element={<Step3 />}
      />
      <Route
        path={URLS.AUTH_TRUCK_STEP_4}
        element={<Step4 />}
      />
      <Route
        path={URLS.AUTH_TRUCK_STEP_5}
        element={<Step5 />}
      />
      <Route
        path={URLS.AUTH_TRUCK_STEP_6}
        element={<Step6 />}
      />
      <Route
        path={URLS.AUTH_TRUCK_STEP_7}
        element={<Step7 />}
      />
      <Route
        path={URLS.AUTH_EXPECTED_RETURN_DETAIL}
        element={<ExpectedReturnDetail />}
      />
      <Route
        path={URLS.AUTH_EXPECTED_RETURN_DETAIL_STEP_2}
        element={<ExpectedReturnDetailStep2 />}
      />
      <Route
        path={URLS.AUTH_EXPECTED_RETURN_DETAIL_STEP_3}
        element={<ExpectedReturnDetailStep3 />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_DETAIL}
        element={<DeliveryDetail />}
      />
    </>
  )
}
