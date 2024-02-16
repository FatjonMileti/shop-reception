import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { NotFound } from 'components/core-ui'

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const location = useLocation()
  const { id } = useParams()

  const matchRoute = (appPages, currentPath) => {
    const currentPathWithReplaceId = currentPath.replace(id, ':id')
    const currentPathWithoutId = currentPath.replace(/\/\d+$/, '/:id')

    return (
      appPages.map(app => app.route.url).includes(currentPathWithReplaceId) ||
      appPages.map(app => app.route.url).includes(currentPathWithoutId)
    )
  }

  const isAuthorized = useMemo(() => {
    return true
    if (props.checkIsAuthorized) {
      const isMatch = matchRoute(props.applicationPages, location.pathname)

      return isMatch
    }

    return true
  }, [location, props.applicationPages, props.checkIsAuthorized])

  return isAuthorized ? <RouteComponent {...props} /> : <NotFound />
}

export default PrivateRoute
