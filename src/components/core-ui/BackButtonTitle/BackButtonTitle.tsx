import { Box } from '@mui/system'
import BackButton from './BackButton/BackButton'
import { useLocation, useNavigate } from 'react-router'
import { useMemo } from 'react'

const BackButtonMechanism = ({ applicationPages, modules, subdomainId }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const memoized = useMemo(() => {
    let currentApplicationName = ''
    let lastRoutePath = ''
    let submodule = null
    let showBackButton = false

    if (location.pathname !== '') {
      let currentUrlSegments = location.pathname.split('/')
      const lastSegment = currentUrlSegments[currentUrlSegments.length - 2]

      const lastRouteUrl = applicationPages.find(page => page.route.url.includes(lastSegment))

      if (lastRouteUrl) {
        lastRoutePath = lastSegment
      }

      const currentApplication = applicationPages.find(app => app.route.url === location.pathname)
      if (currentApplication) {
        currentApplicationName = currentApplication.name
        showBackButton = true
      }
    }

    const module = modules.find(module => module.id === subdomainId)

    if (module && lastRoutePath) {
      submodule = module.submodules.find(submodule => submodule.routeURL.includes(lastRoutePath))
    }

    return {
      currentApplicationName,
      submodule,
      showBackButton
    }
  }, [location.pathname, applicationPages, modules, subdomainId])

  const { currentApplicationName, submodule, showBackButton } = memoized

  const navBack = () => {
    navigate(submodule ? submodule.routeURL : '/')
  }

  return showBackButton ? (
    <Box
      sx={{
        marginLeft: '1.5rem'
      }}
    >
      <BackButton text={currentApplicationName} onNavBack={navBack}></BackButton>
    </Box>
  ) : null
}

export default BackButtonMechanism
