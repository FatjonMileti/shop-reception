import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { EmployeeManagement } from './EmployeeManagement'
import { TaskManagement } from './TaskManagement'
import { TaskAllocations } from './TaskAllocations'
import { NormsReport } from './NormsReport'
import { EvaluationReports } from './EvaluationReports'
import { AssignedTasks } from './AssignedTasks'
import { EmployeesStatus } from './EmployeesStatus'
import { TaskAllocation } from './TaskAllocation'
import { LocationManagement } from './LocationManagement'
import { LocationCategoryManagement } from './LocationCategoryManagement'

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
        path={URLS.AUTH_TASK_ALLOCATIONS}
        element={
          <PrivateRoute
            component={TaskAllocations}
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
      <Route
        path={URLS.AUTH_ALLOCATED_EMPLOYEES_STATUS}
        element={
          <PrivateRoute
            component={EmployeesStatus}
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
        path={URLS.AUTH_LOCATION_MANAGEMENT}
        element={
          <PrivateRoute
            component={LocationManagement}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_LOCATION_CATEGORY_MANAGEMENT}
        element={
          <PrivateRoute
            component={LocationCategoryManagement}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
