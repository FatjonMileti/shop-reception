import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { TeamDayOffManagement } from './TeamDayOffManagement'
import { TeamAssignment } from './TeamAssignment'
import { EffortMatrix } from './EffortMatrix'
import { ProjectMilestones } from './ProjectMilestones'

export const useGovernanceRoutes = applicationPages => {
  return (
    <>
      <Route
        path={URLS.AUTH_TEAM_DAY_OFF_MANAGEMENT}
        element={
          <PrivateRoute
            component={TeamDayOffManagement}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_EFFORT_MATRIX}
        element={
          <PrivateRoute
            component={EffortMatrix}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_TEAM_ASSIGNMENT}
        element={
          <PrivateRoute
            component={TeamAssignment}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_PROJECT_MILESTONES}
        element={
          <PrivateRoute
            component={ProjectMilestones}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
    </>
  )
}
