import { JSXElementConstructor, ReactElement } from 'react'
export interface Filter {
  name: string
  value: string | number | string[]
}
enum FilterType {
  Date = 'date',
  Text = 'text'
}
export interface FilterConfig {
  // copied `TableFiltersType` from library, can we export from library?
  name: string
  value: any
  type: FilterType
  label: string
  filter: ReactElement<any, string | JSXElementConstructor<any>>
}
export interface FilterParams {
  [key: string]: any
}
// FilterComponent should be registered in dynamicRenderingConstants
enum FilterComponent {
  DatePicker = 'DatePicker',
  Input = 'Input'
}
export interface FilterSchema {
  type: FilterType
  // if FilterSchema.UIComponent is determined by only FilterSchema.type, then we can add the rendering logic inside library and remove UIComponent from Schema at all
  UIComponent: FilterComponent
  name: string
  label: string
  required?: boolean
  hidden?: boolean
  defaultValue?: '#CURRENT_DATE' | null
  variable?: string
}

export interface TableState {
  page: number
  rowsPerPage: number
  order: 'asc' | 'desc'
  orderBy: string
  searchText: string
  filters: Filter[]
}