import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const DataStoreSlice = createSlice({
  name: 'dataStore',
  initialState: {},
  reducers: {
    setData: (state: any, action: PayloadAction<any>) => ({
      ...state,
      ...action.payload
    }),
    clearData: (state, action: PayloadAction<string>) => { 
      var data = { ...state }
      data[action.payload] = undefined
      return data
    }
  }
})

export const DataStoreActions = DataStoreSlice.actions
export const DataStoreReducer = DataStoreSlice.reducer
