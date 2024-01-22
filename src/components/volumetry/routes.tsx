import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { EmployeeManagement } from './EmployeeManagement'
import { TaskManagement } from './TaskManagement'
import { TaskAllocation } from './TaskAllocation'
import { NormsReport } from './NormsReport'
import EvaluationReports from 'components/volumetry/EmployeeManagement/EvaluationReports/EvaluationReports'
import { AssignedTasks } from './AssignedTasks'

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
        path={URLS.AUTH_EMPLOYEE_EVALUATION_REPORTS}
        element={
          <PrivateRoute
            component={EvaluationReports}
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
      <Route
        path={URLS.AUTH_TASK_ALLOCATION}
        element={
          <PrivateRoute
            component={TaskAllocation}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_NORMS_REPORTS}
        element={
          <PrivateRoute
            component={NormsReport}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_ASSIGNED_TASKS}
        element={
          <PrivateRoute
            component={AssignedTasks}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
