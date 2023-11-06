import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { EmployeeManagement } from './EmployeeManagement'
import { TaskManagement } from './TaskManagement'

export const useVolumetryRoutes = applicationPages => {
  return (
    <>
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
      <Route
        path={URLS.AUTH_TASK_MANAGEMENT}
        element={
          <PrivateRoute
            component={TaskManagement}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
