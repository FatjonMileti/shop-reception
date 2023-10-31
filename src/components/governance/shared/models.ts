export type GovernanceResponseModel<T> = {
  list: T[]
  page: PageDetailsModel
}

export type PageDetailsModel = {
  pageSize: number
  page: number
  totalCount: number
  pageCount: number
}
