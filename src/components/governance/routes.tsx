import { PrivateRoute } from 'components/utils/PrivateRoute'
import { Route } from 'react-router-dom'
import { URLS } from './constants'
import { TeamDayOffManagement } from './TeamDayOffManagement'
import { TeamAssignment } from './TeamAssignment'
import { EffortMatrix } from './EffortMatrix'
import { ProjectMilestones } from './ProjectMilestones'
import { TeamCapacity } from './TeamCapacity'
import { MyTimeOff } from './MyTimeOff'
import { IndividualCapacity } from './IndividualCapacity'

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
        path={URLS.AUTH_MY_TIME_OFF}
        element={
          <PrivateRoute
            component={MyTimeOff}
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
      <Route
        path={URLS.AUTH_TEAM_CAPACITY}
        element={
          <PrivateRoute
            component={TeamCapacity}
            applicationPages={applicationPages}
            checkIsAuthorized
          />
        }
      />
      <Route
        path={URLS.AUTH_INDIVIDUAL_CAPACITY}
        element={
          <PrivateRoute component={IndividualCapacity} applicationPages={applicationPages} />
        }
      />
    </>
  )
}
