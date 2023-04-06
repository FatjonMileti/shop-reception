import { Route } from 'react-router-dom'
import { PrivateRoute } from 'components/utils/PrivateRoute'

export const createRoute = (page, component) => {
  const { route, ...rest } = page

  return (
    <Route
      key={route.url}
      path={route.url}
      exact={route.exact}
      element={<PrivateRoute component={component} {...rest} />}
    />
  )
}
