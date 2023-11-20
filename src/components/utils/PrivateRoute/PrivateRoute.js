import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { NotFound } from 'components/core-ui'

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const location = useLocation()

  const matchRoute = (appPages, currentPath) => {
    const currentPathWithoutId = currentPath.replace(/\/\d+$/, '/:id')

    return appPages.map(app => app.route.url).includes(currentPathWithoutId)
  }

  const isAuthorized = useMemo(() => {
    if (props.checkIsAuthorized) {
      const isMatch = matchRoute(props.applicationPages, location.pathname)

      return isMatch
    }

    return true
  }, [location, props.applicationPages, props.checkIsAuthorized])

  return isAuthorized ? <RouteComponent {...props} /> : <NotFound />
}

export default PrivateRoute
