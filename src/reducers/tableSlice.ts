import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TableState {
  searchText?: string
  filters?: {
    [name: string]: any
  }
  customFilters?: {
    [name: string]: any
  }
}

export interface FiltersState {
  [name: string]: string | number
}

export const tableInitialState: TableState = {
  searchText: '',
  filters: {},
  customFilters: {}
}

export const TableSlice = createSlice({
  name: 'table',
  initialState: tableInitialState,
  reducers: {
    setSearchData: (state: TableState, action: PayloadAction<TableState>) => ({
      ...state,
      ...action.payload
    }),
    setFilters: (state: TableState, action: PayloadAction<FiltersState>) => ({
      ...state,
      filters: {
        ...state.filters,
        ...action.payload
      }
    }),
    setCustomFilters: (state: TableState, action: PayloadAction<FiltersState>) => ({
      ...state,
      customFilters: {
        ...state.customFilters,
        ...action.payload
      }
    }),
    clearSearchData: state => ({ ...state, searchText: '' }),
    clearFiltersData: state => ({ ...state, filters: {}, customFilters: {} })
  }
})

export const TableActions = TableSlice.actions
export const TableReducer = TableSlice.reducer
