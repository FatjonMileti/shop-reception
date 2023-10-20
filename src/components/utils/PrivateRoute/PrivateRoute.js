import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { NotFound } from 'components/core-ui'

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const location = useLocation()

  const isAuthorized = useMemo(() => {
    // TODO remove the checkIsAuthorized param when migarting from JSON schema
    if (props.checkIsAuthorized) {
      return props.applicationPages.map(app => app.route.url).includes(location.pathname)
    }

    return true
  }, [location, props.applicationPages, props.checkIsAuthorized])

  return isAuthorized ? <RouteComponent {...props} /> : <NotFound />
}

export default PrivateRoute
