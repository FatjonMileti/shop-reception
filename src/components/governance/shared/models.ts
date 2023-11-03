export interface GovernanceResponseModel<T> {
  list: T[]
  page: PageDetailsModel
}

export interface PageDetailsModel {
  pageSize: number
  page: number
  totalCount: number
  pageCount: number
}
