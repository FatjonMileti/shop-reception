import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { EmployeeManagement } from './EmployeeManagement'

export const useVolumetryRoutes = applicationPages => {
  return (
    <Route path={URLS.AUTH_EMPLOYEE}>
      <Route
        path={URLS.AUTH_EMPLOYEE_MANAGEMENT}
        element={
          <PrivateRoute
            component={EmployeeManagement}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </Route>
  )
}
