import dayjs from 'dayjs'

export const URLS = {
  AUTH_HOME: '/',
  AUTH_TEAM_DAY_OFF_MANAGEMENT: '/teamDayOffManagement',
  AUTH_TEAM_ASSIGNMENT: '/teamAssignment',
  LOGINOIDC: '/signin-oidc',
  LOGOUTOIDC: '/signout-oidc'
}

export const DRAWER_WIDTH = 400

export const TOKEN_KEY = 'carrefour-dex-id-token'

export const FIREBASE_TOKEN_KEY = 'carrefour-dex-firebase-token'
export const FIREBASE_USER = 'carrefour-dex-firebase-user'

export const ROLE_ALL = 'all'

export const PUBLIC_HOLIDAYS_SELECTION_MIN_DATE = dayjs('2023-01-01')
export const PUBLIC_HOLIDAYS_SELECTION_MAX_DATE = dayjs('2030-12-31')
