import { Navigate } from 'react-router-dom'
import { URLS } from 'utils/constants'
import { isAuthenticated } from 'utils/authService'

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  return isAuthenticated() ? <RouteComponent {...props} /> : <Navigate to={URLS.LOGIN} />
}

export default PrivateRoute
