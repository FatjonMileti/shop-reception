import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from 'components/core-ui'
import { Home } from '../Home'
import { LoginOIDC } from '../LoginOIDC'
import { LogoutOIDC } from '../LogoutOIDC'
import { ServiceDomain } from '../ServiceDomain'
import { URLS } from 'utils/constants'
import { Layout } from 'components/Layout'
import { ThemeProvider } from '@fullscreendigital/carrefour-dex-fe'
import { createRoute } from './helpers'
import { makeDesignerGetRequest, makeNotificationsPutRequest } from 'utils/api'
import { PrivateRoute } from 'components/utils/PrivateRoute'
import { toApplicationPages } from './serializers'
import { AuthProvider } from 'oidc-react'
import { oidcConfig, getFirebaseToken, setFirebaseToken } from 'utils/authService'
import { useNotification } from 'hooks'
import { toApplicationModulesPages } from 'components/Layout/Sidebar/serializers'
import { CircularProgress } from '@mui/material'
import { formatErrorMessage } from 'utils/formatting'
import { QueryClient, QueryCache, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useGovernanceRoutes } from 'components/governance/routes'
import { useVolumetryRoutes } from 'components/volumetry/routes'
import { useBakeryRoutes } from 'components/bakery/routes'
import { useSupplyOmniRoutes } from 'components/supplyomni/routes'
import BackButtonTitle from 'components/core-ui/BackButtonTitle/BackButtonTitle'
import { useMerchandiseRoutes } from '../mobile/routes'
import { useShopReceptionRoutes } from '../shop-reception/routes'
import { getFBToken } from 'utils/firebase'
import 'file-loader?name=firebase-messaging-sw.js!./firebase-messaging-sw.js'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.status === 'error') {
        console.log(`Something went wront: ${error.message}`)
      }
    }
  })
})
const App = () => {
  const [modules, setModules] = useState([])
  const [applicationPages, setApplicationPages] = useState([])
  const [applicationModulesPages, setApplicationModulesPages] = useState([])
  const [subdomainId, setSubdomainId] = useState(localStorage.getItem('selectedSubdomainId'))

  const [isLoadingAppModules, setIsLoadingAppModules] = useState(false)
  const [hasLoadedAppModules, setHasLoadedAppModules] = useState(false)
  const [isLoadingActivities, setIsLoadingActivities] = useState(false)
  const [hasLoadedActivities, setHasLoadedActivities] = useState(-1) // [~] holds the subdomainId for which the activities were loaded

  const [fbToken, setFbToken] = useState(null)

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      await getFBToken(setFbToken)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const localToken = getFirebaseToken()
      if (fbToken && fbToken !== localToken) {
        try {
          await makeNotificationsPutRequest('/association', {
            deviceToken: fbToken
          })
          setFirebaseToken(fbToken)
        } catch (error) {
          console.log(error)
        }
      }
    })()
  }, [fbToken])

  useEffect(() => {
    ;(async () => {
      await getFBToken(setFbToken)
    })()
  }, [])

  useEffect(() => {
    // console.log("[App] 1st effect called | hasLoadedAppModules: ", hasLoadedAppModules)
    ;(async () => {
      if (!hasLoadedAppModules && !isLoadingAppModules) {
        setIsLoadingAppModules(true)

        try {
          // console.log("[App] will load app modules")
          const result = await makeDesignerGetRequest('/application-modules')
          setModules(result)
          setApplicationModulesPages(toApplicationModulesPages(result))
        } catch (error) {
          // https://giphy.com/embed/oe33xf3B50fsc :))))
          showNotification({
            message: `Error while fetching application modules. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        } finally {
          setHasLoadedAppModules(true)
          setIsLoadingAppModules(false)
          // console.log("[App] did load app modules")
        }
      }
    })()
  }, [hasLoadedAppModules, isLoadingAppModules])

  useEffect(() => {
    // console.log("[App] 2nd effect called | subdomainId: ", subdomainId, " | hasLoadedAppModules: ", hasLoadedAppModules, " | isLoadingAppModules: ", isLoadingAppModules, " | hasLoadedActivities: ", hasLoadedActivities, " | isLoadingActivities: ", isLoadingActivities)
    ;(async () => {
      if (
        hasLoadedAppModules &&
        !isLoadingAppModules &&
        subdomainId &&
        subdomainId !== 'undefined' &&
        subdomainId != hasLoadedActivities &&
        !isLoadingActivities
      ) {
        setIsLoadingActivities(true)

        try {
          const result = await makeDesignerGetRequest(`/activities?submoduleId=${subdomainId}`)
          setApplicationPages(toApplicationPages(result))
        } catch (error) {
          showNotification({
            message: `Error while fetching application pages. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        } finally {
          setHasLoadedActivities(subdomainId)
          setIsLoadingActivities(false)
        }
      }
    })()
  }, [
    subdomainId,
    hasLoadedAppModules,
    isLoadingAppModules,
    hasLoadedActivities,
    isLoadingActivities
  ])

  const governanceRoutes = useGovernanceRoutes(applicationPages)
  const volumetryRoutes = useVolumetryRoutes(applicationPages)
  const bakeryRoutes = useBakeryRoutes(applicationPages)
  const supplyOmniRoutes = useSupplyOmniRoutes(applicationPages)
  const merchandiseRoutes = useMerchandiseRoutes(applicationPages)
  const shopReceptionRoutes = useShopReceptionRoutes(applicationPages)

  return (
    // <AuthProvider {...oidcConfig}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme="light">
        {((isLoadingAppModules || !hasLoadedAppModules) && (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        )) || (
          <Layout modules={modules} setSubdomainId={setSubdomainId}>
            <BackButtonTitle applicationPages={applicationPages}></BackButtonTitle>
            <Routes>
              {!applicationPages.length && <Route path="*" element={<LoginOIDC />} />}

              {/* private routes */}
              <Route
                path={URLS.AUTH_HOME}
                element={
                  <PrivateRoute
                    component={Home}
                    modules={modules}
                    setSubdomainId={setSubdomainId}
                  />
                }
              />
              {governanceRoutes}
              {bakeryRoutes}
              {volumetryRoutes}
              {supplyOmniRoutes}
              {merchandiseRoutes}
              {shopReceptionRoutes}
              {applicationModulesPages.map(page =>
                createRoute(
                  {
                    ...page,
                    subdomainId,
                    modules,
                    applicationPages,
                    hasLoadedActivities,
                    isLoadingActivities
                  },
                  ServiceDomain
                )
              )}
              {/* end of private routes */}

              <Route path={URLS.LOGINOIDC} element={<LoginOIDC />} />
              <Route path={URLS.LOGOUTOIDC} element={<LogoutOIDC />} />
              {applicationPages.length && <Route path="*" element={<NotFound />} />}
            </Routes>
          </Layout>
        )}
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </AuthProvider>
  )
}

export default App
