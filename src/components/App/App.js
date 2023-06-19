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
import { makeDesignerGetRequest } from 'utils/api'
import { PrivateRoute } from 'components/utils/PrivateRoute'
import { DynamicComponent } from '../DynamicComponent'
import { toApplicationPages } from './serializers'
import { AuthProvider } from 'oidc-react'
import { oidcConfig } from 'utils/authService'
import { useNotification } from 'hooks'

const App = () => {
  const [modules, setModules] = useState([])
  const [applicationPages, setApplicationPages] = useState([])
  const [applicationModulesPages, setApplicationModulesPages] = useState([])
  const [subdomainId, setSubdomainId] = useState(localStorage.getItem('selectedSubdomainId'))

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      if (subdomainId) {
        try {
          const result = await makeDesignerGetRequest(`/activities?submoduleId=${subdomainId}`)
          setApplicationPages(toApplicationPages(result))
        } catch (error) {
          showNotification({
            message: `Error while fetching application pages. ${error?.message}`,
            type: 'error'
          })
        }
      }
    })()
  }, [subdomainId])

  return (
    <AuthProvider {...oidcConfig}>
      <ThemeProvider theme="light">
        <Layout
          setModules={setModules}
          setApplicationModulesPages={setApplicationModulesPages}
          setSubdomainId={setSubdomainId}
        >
          <Routes>
            {!applicationPages.length && <Route path="*" element={<LoginOIDC />} />}

            {/* private routes */}
            <Route
              path={URLS.AUTH_HOME}
              element={
                (!applicationModulesPages.length && <LoginOIDC />) || (
                  <PrivateRoute
                    component={Home}
                    modules={modules}
                    setSubdomainId={setSubdomainId}
                  />
                )
              }
            />
            {applicationModulesPages.map(page =>
              createRoute({ ...page, subdomainId, modules, applicationPages }, ServiceDomain)
            )}
            {applicationPages.map(page => createRoute(page, DynamicComponent))}
            {/* end of private routes */}

            <Route path={URLS.LOGINOIDC} element={<LoginOIDC />} />
            <Route path={URLS.LOGOUTOIDC} element={<LogoutOIDC />} />
            {applicationPages.length && <Route path="*" element={<NotFound />} />}
          </Routes>
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
