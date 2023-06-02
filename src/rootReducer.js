import { NotificationReducer } from 'components/Notification/notificationSlice'
import { ProductReducer } from 'reducers/productSlice'
import { TableReducer } from 'reducers/tableSlice'
import { DataStoreReducer } from 'reducers/dataStoreSlice'

const reducers = {
  notification: NotificationReducer,
  product: ProductReducer,
  table: TableReducer,
  dataStore: DataStoreReducer
}

export default reducers
