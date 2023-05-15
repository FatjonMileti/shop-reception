import { NotificationReducer } from 'components/Notification/notificationSlice'
import { ProductReducer } from 'reducers/productSlice'

const reducers = {
  notification: NotificationReducer,
  product: ProductReducer
}

export default reducers
