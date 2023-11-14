import { PrivateRoute } from "components/utils/PrivateRoute"
import { Route } from "react-router-dom"
import { URLS } from "./constants"
import { Login } from "./Login"
import { Home } from "./Home"
import { GoodsReception } from "./GoodsReception"
import { GoodsReturn } from "./GoodsReturn"
import { ListTrucks } from "./ListTrucks"
import { ReceptionProcessing } from "./RceptionProcessing"
import { Delivery } from "./Delivery"

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
        path={URLS.AUTH_RECEPTION_PROCESSING}
        element={<ReceptionProcessing />}
      />
      <Route
        path={URLS.AUTH_DELIVERY}
        element={<Delivery />}
      />
    </>
  )
}
