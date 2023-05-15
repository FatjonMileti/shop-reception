import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from 'components/core-ui/BarcodeScanner/BarcodeScannerDefinitions'

export interface ProductState {
  product?: Product
}

export const productInitialState: ProductState = {}

export const ProductSlice = createSlice({
  name: 'product',
  initialState: productInitialState,
  reducers: {
    setProduct: (_state, action: PayloadAction<ProductState>) => ({
      ...productInitialState,
      ...action.payload
    }),
    clearProduct: _state => ({ ...productInitialState })
  }
})

export const ProductActions = ProductSlice.actions
export const ProductReducer = ProductSlice.reducer
