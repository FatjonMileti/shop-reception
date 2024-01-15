import { NotificationReducer } from 'reducers/notificationSlice'
import { TableReducer } from 'reducers/tableSlice'
import { DataStoreReducer } from 'reducers/dataStoreSlice'
import { GovernanceDomainsReducer } from 'reducers/domainsSlice'
import { FirebaseNotificationReducer } from 'reducers/firebaseNotificationSlice'

const reducers = {
  notification: NotificationReducer,
  table: TableReducer,
  dataStore: DataStoreReducer,
  governanceDomains: GovernanceDomainsReducer,
  firebaseNotification: FirebaseNotificationReducer
}

export default reducers
