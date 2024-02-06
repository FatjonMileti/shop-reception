export interface PageDetailsModel {
  pageSize: number
  page: number
  totalCount: number
  pageCount: number
}

export interface BasePageResponseModel<T> {
  list: T[]
  page: PageDetailsModel
}

export interface GovernanceDomainModel {
  domain: string
}
