import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductStock } from 'components/core-ui/BarcodeScanner/BarcodeScannerDefinitions'

export interface ProductState {
  code?: string
  title?: string
  storeStock?: ProductStock
  warehouseStock?: ProductStock
}

export const productInitialState: ProductState = {}

export const ProductSlice = createSlice({
  name: 'product',
  initialState: productInitialState,
  reducers: {
    setProduct: (state: ProductState, action: PayloadAction<ProductState>) => ({
      ...state,
      ...action.payload
    }),
    clearProduct: _state => ({ ...productInitialState })
  }
})

export const ProductActions = ProductSlice.actions
export const ProductReducer = ProductSlice.reducer
