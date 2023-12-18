import { NotificationReducer } from 'reducers/notificationSlice'
import { ProductReducer } from 'reducers/productSlice'
import { TableReducer } from 'reducers/tableSlice'
import { DataStoreReducer } from 'reducers/dataStoreSlice'
import { GovernanceDomainsReducer } from 'reducers/domainsSlice'
import { FirebaseNotificationReducer } from 'reducers/firebaseNotificationSlice'

const reducers = {
  notification: NotificationReducer,
  product: ProductReducer,
  table: TableReducer,
  dataStore: DataStoreReducer,
  governanceDomains: GovernanceDomainsReducer,
  firebaseNotification: FirebaseNotificationReducer
}

export default reducers
