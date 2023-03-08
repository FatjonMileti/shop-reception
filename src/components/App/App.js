import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from 'components/core-ui'
import { Home } from '../Home'
import { Login } from '../Login'
import { ServiceDomain } from '../ServiceDomain'
import { URLS } from 'utils/constants'
import { Layout } from 'components/Layout'
import { ThemeProvider } from '@fullscreendigital/carrefour-dex-fe'
import { mockedPages, createRoute } from './helpers'
import { makeDesignerGetRequest } from 'utils/api'
import { PrivateRoute } from 'components/utils/PrivateRoute'
import { DynamicComponent } from '../DynamicComponent'
import { toApplicationPages } from './serializers'

const App = () => {
  const [applicationPages, setApplicationPages] = useState([])
  const [applicationModulesPages, setApplicationModulesPages] = useState([])
  const [subdomainId, setSubdomainId] = useState(localStorage.getItem('selectedSubdomainId'))

  useEffect(() => {
    ;(async () => {
      if (subdomainId) {
        try {
          const result = await makeDesignerGetRequest(`/activities?submoduleId=${subdomainId}`)
          setApplicationPages(toApplicationPages(result))
        } catch (error) {
          console.log(error)
          setApplicationPages(toApplicationPages(mockedPages))
        }
      }
    })()
  }, [subdomainId])

  return (
    <ThemeProvider theme="light">
      <Layout
        setApplicationModulesPages={setApplicationModulesPages}
        setSubdomainId={setSubdomainId}
      >
        <Routes>
          {/* private routes */}
          <Route path={URLS.AUTH_HOME} exact element={<PrivateRoute component={Home} />} />
          {applicationModulesPages.map(page =>
            createRoute({ ...page, applicationPages, setApplicationPages }, ServiceDomain)
          )}
          {applicationPages.map(page => createRoute(page, DynamicComponent))}
          {/* end of private routes */}

          <Route path={URLS.LOGIN} element={<Login />} />
          {applicationPages.length && <Route path="*" element={<NotFound />} />}
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
