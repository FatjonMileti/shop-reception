export const URLS = {
  // Shop Inventory Update
  AUTH_PACKAGING_INVENTORY_UPDATE: '/shop-reception/mobile/packaging-inventory-update',

  // Shop Goods Reception
  AUTH_LIST_TRUCKS: '/shop-reception/mobile/trucksList', // List of trucks waiting reception
  AUTH_TRUCK_DETAIL: '/shop-reception/mobile/truckDetails/:id', // List of trucks waiting reception step 2
  AUTH_ADD_TRUCK: '/shop-reception/mobile/addTruck', // Add new truck for reception
  AUTH_ADD_TRUCK_STEP_2: '/shop-reception/mobile/add-trucks/step-2', // Add new truck for reception step 2 // TODO: integrate stepper in parent page and delete

  AUTH_RECEPTION_PROCESSING: '/shop-reception/mobile/inProcessingReception', // Trucks in processing for reception

  AUTH_SUPPORT_SCAN_STEP_1: '/shop-reception/mobile/support-scan/step-1', // Reception Step 1
  AUTH_SUPPORT_SCAN_STEP_2: '/shop-reception/mobile/support-scan/step-2', // Step 2
  AUTH_SUPPORT_SCAN_STEP_3: '/shop-reception/mobile/support-scan/step-3', // Step 3
  AUTH_SUPPORT_SCAN_STEP_4: '/shop-reception/mobile/support-scan/step-4', // Step 4
  AUTH_SUPPORT_SCAN_STEP_5: '/shop-reception/mobile/support-scan/step-5', // Step 5

  AUTH_DELIVERY: '/shop-reception/mobile/validateDelivery',
  AUTH_DELIVERY_DETAIL: '/shop-reception/mobile/deliveryDetails',
  AUTH_DELIVERY_COMPLETE_SCAN: '/shop-reception/mobile/deliveryFullScan',
  AUTH_DELIVERY_COMPLETE_SCAN_STEP_1: '/shop-reception/mobile/delivery/full-scan/step-1', // TODO: integrate stepper in parent page and delete
  AUTH_DELIVERY_COMPLETE_SCAN_STEP_2: '/shop-reception/mobile/delivery/full-scan/step-2', // TODO: integrate stepper in parent page and delete
  AUTH_DELIVERY_COMPLETE_SCAN_STEP_3: '/shop-reception/mobile/delivery/full-scan/step-3', // TODO: integrate stepper in parent page and delete
  AUTH_DELIVERY_SENSITIVE_PRODUCTS: '/shop-reception/mobile/sensitiveProducts',
  AUTH_DELIVERY_SENSITIVE_PRODUCTS_CONFIRM:
    '/shop-reception/mobile/delivery/sensitive-products/confirm', // TODO: integrate stepper in parent page and delete
  AUTH_DELIVERY_RANDOM_SUPPORT: '/shop-reception/mobile/randomSupport',
  AUTH_DELIVERY_RANDOM_SUPPORT_FINAL: '/shop-reception/mobile/delivery/random-support/final', // TODO: integrate stepper in parent page and delete
  AUTH_DELIVERY_RANDOM_SUPPORT_CONFIRM: '/shop-reception/mobile/delivery/random-support/confirm', // TODO: integrate stepper in parent page and delete
  AUTH_DELIVERY_RANDOM_PRODUCT: '/shop-reception/mobile/randomProduct',
  AUTH_DELIVERY_RANDOM_PRODUCT_FINAL: '/shop-reception/mobile/delivery/random-product/final', // TODO: integrate stepper in parent page and delete
  AUTH_DELIVERY_RANDOM_PRODUCT_CONFIRM: '/shop-reception/mobile/delivery/random-product/confirm', // TODO: integrate stepper in parent page and delete
  AUTH_SGR_PRODUCTS: '/shop-reception/mobile/sgrProducts',

  // Shop Goods Return
  AUTH_RETURN_STEP_1: '/shop-reception/mobile/return-step-1', // Step 1
  AUTH_RETURN_STEP_2: '/shop-reception/mobile/return-step-2', // Step 2
  AUTH_RETURN_STEP_3: '/shop-reception/mobile/return-step-3', // Step 3
  AUTH_RETURN_STEP_4: '/shop-reception/mobile/return-step-4', // Step 4
  AUTH_RETURN_STEP_5: '/shop-reception/mobile/return-step-5', // Step 5
  AUTH_CONTINUE_RETURN_TRUCKS: '/shop-reception/mobile/inProgressReturns', // In progress return trucks

  // HUB Goods Reception
  AUTH_EXPECTED_TRUCKS: '/shop-reception/mobile/expectedTrucks', // List of trucks waiting reception at the hub
  AUTH_PROCESSING_SHIPMENT: '/shop-reception/mobile/inProcessingShipment', // List of trucks in processing at hub reception
  
  // truck create step 1
  // truck create step 2
  // reception step 1
  // reception step 2
  // reception step 3
  // reception step 4
  // reception step 5
  
  AUTH_REGISTER_TRUCK: '/shop-reception/mobile/registerTruck', // Hub registration step 1
  AUTH_REGISTER_TRUCK_STEP_2:'/shop-reception/mobile/registerTruck-step-2',
  // Hub registration step 2
  // Hub registration step 3
  AUTH_REGISTER_TRUCK_STEP_3: '/shop-reception/mobile/registerTruck-step-3', // --------> Hub registration step 3
  // Hub registered truck list
  // Hub registered trucks in process

  // HUB Goods Return
  AUTH_EXPECTED_RETURNS: '/shop-reception/mobile/expectedReturns', // Hub expected trucks for return
  AUTH_EXPECTED_RETURN_DETAIL: '/shop-reception/mobile/expectedReturnDetails', // return step 1
  AUTH_EXPECTED_RETURN_DETAIL_STEP_2: '/shop-reception/mobile/expected-return/detail-step-2', // return step 2 // TODO: integrate stepper in parent page and delete
  AUTH_EXPECTED_RETURN_DETAIL_STEP_3: '/shop-reception/mobile/expected-return/detail-step-3', // return step 3 // TODO: integrate stepper in parent page and delete
  AUTH_EXPECTED_RETURN_DETAIL_FINAL: '/shop-reception/mobile/expected-return/detail-step-final', // return step 4 // TODO: integrate stepper in parent page and delete
  AUTH_IN_PROGRESS_RETURN: '/shop-reception/mobile/inProgressReturnReception', // trucks in process of return

  AUTH_RECORD_RETURN: '/shop-reception/mobile/recordReturn', // register a new return
  AUTH_RECORD_RETURN_STEP_2: '/shop-reception/mobile/recordReturn/step-2', // register a new truck for return step 2
  AUTH_RECORD_RETURN_STEP_3: '/shop-reception/mobile/recordReturn/step-3', // step 3
  AUTH_RECORD_RETURN_STEP_4: '/shop-reception/mobile/recordReturn/step-4', // step 4 // TODO: integrate stepper in parent page and delete
  AUTH_RECORD_RETURN_STEP_5: '/shop-reception/mobile/recordReturn/step-5', //step 5 // TODO: integrate stepper in parent page and delete
  AUTH_CONTINUE_RETURN: '/shop-reception/mobile/continueReturn', // registered returns in process

  // Deposit
  AUTH_SHIPPED_TRUCKS: '/shop-reception/mobile/shippedTrucks', // Deposit return truck list ?
  // trucks in process of return
  // deposit return step 1
  // deposit return step 2
  // deposit return step 3
  // deposit return step 4

  AUTH_DEPOSIT_EXPECTED_RETURNS: '/shop-reception/mobile/goodsReturnDeposit/expectedReturns',
  AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_1:
    '/shop-reception/mobile/goodsReturnDeposit/expectedReturns/step-1',
  AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_2:
    '/shop-reception/mobile/goodsReturnDeposit/expectedReturns/step-2',
  AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_3:
    '/shop-reception/mobile/goodsReturnDeposit/expectedReturns/step-3',
  AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_4:
    '/shop-reception/mobile/goodsReturnDeposit/expectedReturns/step-4',
  AUTH_DEPOSIT_PENDING_RETURN : '/shop-reception/mobile/goodsReturnDeposit/returnPendingReception'
}
