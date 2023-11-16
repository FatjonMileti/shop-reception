import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { ProductScan } from './ProductScan'
import { MySales } from './MySales'
import { ShoppingCart } from './ShoppingCart'
import { SelectClient } from './SelectClient'
import { ClientDetails } from './SelectClient/ClientDetails'
import { ProformaView } from './ProformaView'
import { ScanReceipt } from './ScanReceipt'
import { ReceiptInvoiceFinalized } from './ReceiptInvoiceFinalized'
import { ReceiptClientDetails } from './ReceiptClientDetails'
import { ReceiptSelectClient } from './ReceiptSelectClient'

export const useSupplyOmniRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_PRODUCT_SCAN}
        element={<PrivateRoute component={ProductScan} applicationPages={applicationPages} />}
      />
      <Route
        path={URLS.MY_SALES}
        element={<PrivateRoute component={MySales} applicationPages={applicationPages} />}
      />
      <Route
        path={URLS.AUTH_SHOPPING_CART}
        element={
          <PrivateRoute
            component={ShoppingCart}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_SELECT_CLIENT}
        element={
          <PrivateRoute
            component={SelectClient}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_CLIENT_DETAILS}
        element={
          <PrivateRoute
            component={ClientDetails}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PROFORMA_VIEW}
        element={
          <PrivateRoute
            component={ProformaView}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_SCAN_RECEIPT}
        element={
          <PrivateRoute
            component={ScanReceipt}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_RECEIPT_INVOICE}
        element={
          <PrivateRoute
            component={ReceiptInvoiceFinalized}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_RECEIPT_CLIENT}
        element={
          <PrivateRoute
            component={ReceiptClientDetails}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_RECEIPT_SELECT_CLIENT}
        element={
          <PrivateRoute
            component={ReceiptSelectClient}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
