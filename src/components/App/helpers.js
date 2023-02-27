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

export const mockedPages = [
  {
    id: '1',
    name: 'Team Assignment',
    icon: 'HowToRegOutlined',
    routeURL: '/teamAssignment',
    routePathExact: true,
    submoduleId: '1'
  },
  {
    id: '2',
    name: 'Team Day-Off Management',
    icon: 'TimerOffOutlined',
    routeURL: '/teamDayOffManagement',
    routePathExact: true,
    submoduleId: '1'
  }
]
