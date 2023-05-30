import { NotificationReducer } from 'components/Notification/notificationSlice'
import { ProductReducer } from 'reducers/productSlice'
import { TableReducer } from 'reducers/tableSlice'

const reducers = {
  notification: NotificationReducer,
  product: ProductReducer,
  table: TableReducer
}

export default reducers
