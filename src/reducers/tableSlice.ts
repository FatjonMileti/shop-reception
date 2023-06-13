import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TableState {
  searchText: string
}

export const tableInitialState: TableState = {
  searchText: ''
}

export const TableSlice = createSlice({
  name: 'table',
  initialState: tableInitialState,
  reducers: {
    setSearchData: (state: TableState, action: PayloadAction<TableState>) => ({
      ...state,
      ...action.payload
    }),
    clearSearchData: state => ({ ...state, searchText: '' })
  }
})

export const TableActions = TableSlice.actions
export const TableReducer = TableSlice.reducer
