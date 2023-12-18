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
import { ExpectedReturnDetailFinal } from './GoodsReturn/ExpectedReturns/ExpectedReturnDetailFinal'
import { DeliveryDetail } from './GoodsReception/Delivery/DeliveryDetail'
import { ContinueReturnDetail } from './GoodsReturn/ContinueReturn/ContinueReturnDetail'
import { ContinueReturnDetail2 } from './GoodsReturn/ContinueReturn/ContinueReturnDetail2'
import { ContinueReturnDetailFinal } from './GoodsReturn/ContinueReturn/ContinueReturnDetailFinal'
import { DeliveryCompleteScan } from './GoodsReception/Delivery/DeliveryDetail/DeliveryCompleteScan'
import { DeliverySensitiveProducts } from './GoodsReception/Delivery/DeliveryDetail/DeliverySensitiveProducts'
import { DeliveryRandomSupport } from './GoodsReception/Delivery/DeliveryDetail/DeliveryRandomSupport'
import {
  DeliveryCompleteScanStep1
} from './GoodsReception/Delivery/DeliveryDetail/DeliveryCompleteScan/DeliveryCompleteScanStep1'
import {
    DeliveryCompleteScanStep2
} from './GoodsReception/Delivery/DeliveryDetail/DeliveryCompleteScan/DeliveryCompleteScanStep2'
import {
    DeliveryCompleteScanStep3
} from './GoodsReception/Delivery/DeliveryDetail/DeliveryCompleteScan/DeliveryCompleteScanStep3'
import {
    DeliverySensitiveProductsConfirm
} from './GoodsReception/Delivery/DeliveryDetail/DeliverySensitiveProducts/DeliverySensitiveProductsConfirm'
import { DeliveryRandomProduct } from './GoodsReception/Delivery/DeliveryDetail/DeliveryRandomProduct'
import {
    DeliveryRandomSupportFinal
} from './GoodsReception/Delivery/DeliveryDetail/DeliveryRandomSupport/DeliveryRandomSupportFinal'
import {
    DeliveryRandomSupportConfirm
} from './GoodsReception/Delivery/DeliveryDetail/DeliveryRandomSupport/DeliveryRandomSupportConfirm'
import {
    DeliveryRandomProductFinal
} from './GoodsReception/Delivery/DeliveryDetail/DeliveryRandomProduct/DeliveryRandomProductFinal'
import {
    DeliveryRandomProductConfirm
} from './GoodsReception/Delivery/DeliveryDetail/DeliveryRandomProduct/DeliveryRandomProductConfirm'

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
        path={URLS.AUTH_EXPECTED_RETURN_DETAIL_FINAL}
        element={<ExpectedReturnDetailFinal />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_DETAIL}
        element={<DeliveryDetail />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_COMPLETE_SCAN}
        element={<DeliveryCompleteScan />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_1}
        element={<DeliveryCompleteScanStep1 />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_2}
        element={<DeliveryCompleteScanStep2 />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_3}
        element={<DeliveryCompleteScanStep3 />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS}
        element={<DeliverySensitiveProducts />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS_CONFIRM}
        element={<DeliverySensitiveProductsConfirm />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_RANDOM_SUPPORT}
        element={<DeliveryRandomSupport />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_RANDOM_SUPPORT_FINAL}
        element={<DeliveryRandomSupportFinal />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_RANDOM_SUPPORT_CONFIRM}
        element={<DeliveryRandomSupportConfirm />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_RANDOM_PRODUCT}
        element={<DeliveryRandomProduct />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_RANDOM_PRODUCT_FINAL}
        element={<DeliveryRandomProductFinal />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_RANDOM_PRODUCT_CONFIRM}
        element={<DeliveryRandomProductConfirm />}
      />
      <Route
        path={URLS.AUTH_CONTINUE_RETURN_DETAIL}
        element={<ContinueReturnDetail />}
      />
      <Route
        path={URLS.AUTH_CONTINUE_RETURN_DETAIL_2}
        element={<ContinueReturnDetail2 />}
      />
      <Route
        path={URLS.AUTH_CONTINUE_RETURN_DETAIL_FINAL}
        element={<ContinueReturnDetailFinal />}
      />
    </>
  )
}
