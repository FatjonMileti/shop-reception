import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { Task, Tasks } from './Tasks'

export const useLostSalesOpportunitiesRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_TASKS}
        // element={<PrivateRoute component={Tasks} applicationPages={applicationPages} />}
        element={<Tasks />}
      />
      <Route
        path={URLS.AUTH_TASK}
        // element={<PrivateRoute component={Task} applicationPages={applicationPages} />}
        element={<Task />}
      />
    </>
  )
}
