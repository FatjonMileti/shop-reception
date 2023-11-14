import { PrivateRoute } from "components/utils/PrivateRoute"
import { Route } from "react-router-dom"
import { URLS } from "./constants"
import { Login } from "./Login"
import { Home } from "./Home"
import { PackagingInventoryUpdate } from "./PackagingInventoryUpdate"
import { GoodsReception } from "./GoodsReception"
import { GoodsReturn } from "./GoodsReturn"
import { ListTrucks } from "./GoodsReception/ListTrucks"
import { AddTruck } from "./GoodsReception/ListTrucks/AddTruck"
import { ReceptionProcessing } from "./GoodsReception/RceptionProcessing"
import { Delivery } from "./GoodsReception/Delivery"
import { ConfirmReturnTrucks } from "./GoodsReturn/ConfirmReturnTrucks"
import { OrderReturnTruck } from "./GoodsReturn/OrderReturnTruck"

export const useMerchandiseRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.MERCHANDISE_LOGIN}
        element={<Login />}
      />
      <Route
        path={URLS.AUTH_MERCHANDISE_HOME}
        element={<Home />}
      />
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
    </>
  )
}
