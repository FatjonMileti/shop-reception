import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { PackagingInventoryUpdate } from './Shop/PackagingInventoryUpdate'
import { ListTrucks } from './Shop/GoodsReception/ListTrucks'
import { AddTruck } from './Shop/GoodsReception/ListTrucks/AddTruck'
import { ReceptionProcessing } from './Shop/GoodsReception/ReceptionProcessing'
import { Delivery } from './Shop/GoodsReception/Delivery'
import { InProgressReturnTrucks } from './Shop/GoodsReturn/InProgressReturnTrucks'
import { Step5 } from './Shop/GoodsReturn/Step5'
import { ExpectedTrucks } from './Hub/GoodsReturn/ExpectedTrucks'
import { RegisterTruck } from './Hub/GoodsReception/RegisterTruck'
import { ExpenditureProcessing } from './Hub/GoodsReception/ExpenditureProcessing'
import { ShippedTrucks } from './Hub/GoodsReception/ShippedTrucks'
import { ExpectedReturns } from './Hub/GoodsReturn/ExpectedReturns'
import { InProgressReturn } from './Hub/GoodsReturn/InProgressReturn'
import { ContinueReturn } from './Hub/GoodsReturn/ContinueReturn'
import { RecordReturn } from './Hub/GoodsReturn/RecordReturn'
import { SupportScanStep1 } from './Shop/GoodsReception/SupportScanStep1'
import { RecordReturnDetail } from './Hub/GoodsReturn/RecordReturn/RecordReturnDetail'
import { TruckDetail } from './Shop/GoodsReception/ListTrucks/TruckDetail'
import { AddTruckStep2 } from './Shop/GoodsReception/ListTrucks/AddTruckStep2'
import { SupportScanStep2 } from './Shop/GoodsReception/SupportScanStep2'
import { Step4 } from './Shop/GoodsReturn/Step4'
import { Step3 } from './Shop/GoodsReturn/Step3'
import { Step2 } from './Shop/GoodsReturn/Step2'
import { SupportScanStep3 } from './Shop/GoodsReception/SupportScanStep3'
import { Step1 } from './Shop/GoodsReturn/Step1'
import { SupportScanStep5 } from './Shop/GoodsReception/SupportScanStep5'
import { SupportScanStep4 } from './Shop/GoodsReception/SupportScanStep4'
import { ExpectedReturnDetail } from './Hub/GoodsReturn/ExpectedReturns/ExpectedReturnDetail'
import { ExpectedReturnDetailStep2 } from './Hub/GoodsReturn/ExpectedReturns/ExpectedReturnDetailStep2'
import { ExpectedReturnDetailStep3 } from './Hub/GoodsReturn/ExpectedReturns/ExpectedReturnDetailStep3'
import { ExpectedReturnDetailFinal } from './Hub/GoodsReturn/ExpectedReturns/ExpectedReturnDetailFinal'
import { DeliveryDetail } from './Shop/GoodsReception/Delivery/DeliveryDetail'
import { ContinueReturnDetail } from './Hub/GoodsReturn/ContinueReturn/ContinueReturnDetail'
import { ContinueReturnDetail2 } from './Hub/GoodsReturn/ContinueReturn/ContinueReturnDetail2'
import { ContinueReturnDetailFinal } from './Hub/GoodsReturn/ContinueReturn/ContinueReturnDetailFinal'
import { DeliveryCompleteScan } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliveryCompleteScan'
import { DeliverySensitiveProducts } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliverySensitiveProducts'
import { DeliveryRandomSupport } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliveryRandomSupport'
import { DeliveryCompleteScanStep1 } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliveryCompleteScan/DeliveryCompleteScanStep1'
import { DeliveryCompleteScanStep2 } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliveryCompleteScan/DeliveryCompleteScanStep2'
import { DeliveryCompleteScanStep3 } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliveryCompleteScan/DeliveryCompleteScanStep3'
import { DeliverySensitiveProductsConfirm } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliverySensitiveProducts/DeliverySensitiveProductsConfirm'
import { DeliveryRandomProduct } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliveryRandomProduct'
import { DeliveryRandomSupportFinal } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliveryRandomSupport/DeliveryRandomSupportFinal'
import { DeliveryRandomSupportConfirm } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliveryRandomSupport/DeliveryRandomSupportConfirm'
import { DeliveryRandomProductFinal } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliveryRandomProduct/DeliveryRandomProductFinal'
import { DeliveryRandomProductConfirm } from './Shop/GoodsReception/Delivery/DeliveryDetail/DeliveryRandomProduct/DeliveryRandomProductConfirm'

export const useMerchandiseRoutes = applicationPages => {
  return (
    <>
      {/* Goods reception */}
      <Route
        path={URLS.AUTH_RECEPTION_PROCESSING}
        element={
          <PrivateRoute
            component={ReceptionProcessing}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_EXPECTED_TRUCKS}
        element={
          <PrivateRoute
            component={ExpectedTrucks}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_REGISTER_TRUCK}
        element={
          <PrivateRoute
            component={RegisterTruck}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PROCESSING_SHIPMENT}
        element={
          <PrivateRoute
            component={ExpenditureProcessing}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_SHIPPED_TRUCKS}
        element={
          <PrivateRoute
            component={ShippedTrucks}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_SUPPORT_SCAN_STEP_1}
        element={
          <PrivateRoute
            component={SupportScanStep1}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_ADD_TRUCK}
        element={
          <PrivateRoute
            component={AddTruck}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_LIST_TRUCKS}
        element={
          <PrivateRoute
            component={ListTrucks}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_DELIVERY}
        element={
          <PrivateRoute
            component={Delivery}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_DELIVERY_DETAIL}
        element={
          <PrivateRoute
            component={DeliveryDetail}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_DELIVERY_COMPLETE_SCAN}
        element={
          <PrivateRoute
            component={DeliveryCompleteScan}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS}
        element={
          <PrivateRoute
            component={DeliverySensitiveProducts}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_DELIVERY_RANDOM_SUPPORT}
        element={
          <PrivateRoute
            component={DeliveryRandomSupport}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_DELIVERY_RANDOM_PRODUCT}
        element={
          <PrivateRoute
            component={DeliveryRandomProduct}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      {/* Goods return */}
      <Route
        path={URLS.AUTH_EXPECTED_RETURNS}
        element={
          <PrivateRoute
            component={ExpectedReturns}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_IN_PROGRESS_RETURN}
        element={
          <PrivateRoute
            component={InProgressReturn}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_RECORD_RETURN}
        element={
          <PrivateRoute
            component={RecordReturn}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_CONTINUE_RETURN}
        element={
          <PrivateRoute
            component={ContinueReturn}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_EXPECTED_RETURN_DETAIL}
        element={
          <PrivateRoute
            component={ExpectedReturnDetail}
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
        path={URLS.AUTH_RECORD_RETURN_DETAIL}
        element={
          <PrivateRoute
            component={RecordReturnDetail}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_CONTINUE_RETURN_DETAIL}
        element={
          <PrivateRoute
            component={ContinueReturnDetail}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_RETURN_STEP_5}
        element={
          <PrivateRoute
            component={Step5}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_CONTINUE_RETURN_TRUCKS}
        element={
          <PrivateRoute
            component={InProgressReturnTrucks}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />

      {/* ? */}
      <Route path={URLS.AUTH_PACKAGING_INVENTORY_UPDATE} element={<PackagingInventoryUpdate />} />
      <Route path={URLS.AUTH_SUPPORT_SCAN_STEP_2} element={<SupportScanStep2 />} />
      <Route path={URLS.AUTH_SUPPORT_SCAN_STEP_3} element={<SupportScanStep3 />} />
      <Route path={URLS.AUTH_SUPPORT_SCAN_STEP_4} element={<SupportScanStep4 />} />
      <Route path={URLS.AUTH_SUPPORT_SCAN_STEP_5} element={<SupportScanStep5 />} />

      <Route path={URLS.AUTH_RETURN_STEP_4} element={<Step4 />} />
      <Route path={URLS.AUTH_RETURN_STEP_3} element={<Step3 />} />
      <Route path={URLS.AUTH_RETURN_STEP_2} element={<Step2 />} />
      <Route path={URLS.AUTH_RETURN_STEP_1} element={<Step1 />} />


      {/* TODO: Delete after integration of steppers in parent pages */}
      <Route path={URLS.AUTH_ADD_TRUCK_STEP_2} element={<AddTruckStep2 />} />
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
      <Route path={URLS.AUTH_CONTINUE_RETURN_DETAIL_2} element={<ContinueReturnDetail2 />} />
      <Route
        path={URLS.AUTH_CONTINUE_RETURN_DETAIL_FINAL}
        element={<ContinueReturnDetailFinal />}
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
        path={URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS_CONFIRM}
        element={<DeliverySensitiveProductsConfirm />}
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
        path={URLS.AUTH_DELIVERY_RANDOM_PRODUCT_FINAL}
        element={<DeliveryRandomProductFinal />}
      />
      <Route
        path={URLS.AUTH_DELIVERY_RANDOM_PRODUCT_CONFIRM}
        element={<DeliveryRandomProductConfirm />}
      />
    </>
  )
}
