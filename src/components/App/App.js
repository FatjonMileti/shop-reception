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
import { makeGetRequest } from 'utils/api'
import { PrivateRoute } from 'components/utils/PrivateRoute'
import { DynamicComponent } from '../DynamicComponent'
import { toPages } from './serializers'

const App = () => {
  const [pages, setPages] = useState([])
  const [generalPages, setGeneralPages] = useState([])
  const [subdomainId, setSubdomainId] = useState(localStorage.getItem('selectedSubdomainId'))

  useEffect(() => {
    ;(async () => {
      if (subdomainId) {
        try {
          const result = await makeGetRequest(
            `https://c34672c2-757c-491f-9bf0-089182c88037.mock.pstmn.io/activities?submoduleId=${subdomainId}`
          )
          setPages(toPages(result))
        } catch (error) {
          console.log(error)
          setPages(mockedPages)
        }
      }
    })()
  }, [subdomainId])

  return (
    <ThemeProvider theme="light">
      <Layout setGeneralPages={setGeneralPages} setSubdomainId={setSubdomainId}>
        <Routes>
          {/* private routes */}
          <Route path={URLS.AUTH_HOME} exact element={<PrivateRoute component={Home} />} />
          {generalPages.map(page => createRoute({ ...page, pages, setPages }, ServiceDomain))}
          {pages.map(page => createRoute(page, DynamicComponent))}
          {/* end of private routes */}

          <Route path={URLS.LOGIN} element={<Login />} />
          {pages.length && <Route path="*" element={<NotFound />} />}
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
