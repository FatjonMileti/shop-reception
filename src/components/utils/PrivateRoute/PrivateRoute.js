import { Navigate } from 'react-router-dom'
import { URLS } from 'utils/constants'
import { isAuthenticated } from 'utils/authService'

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  return <RouteComponent {...props} />
}

export default PrivateRoute
