import { NotificationReducer } from 'reducers/notificationSlice'
import { ProductReducer } from 'reducers/productSlice'
import { TableReducer } from 'reducers/tableSlice'
import { DataStoreReducer } from 'reducers/dataStoreSlice'
import { GovernanceDomainsReducer } from 'reducers/domainsSlice'

const reducers = {
  notification: NotificationReducer,
  product: ProductReducer,
  table: TableReducer,
  dataStore: DataStoreReducer,
  governanceDomains: GovernanceDomainsReducer
}

export default reducers
