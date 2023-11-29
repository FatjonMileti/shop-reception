import { Box } from '@mui/system'
import BackButton from './BackButton/BackButton'
import { useLocation, useNavigate } from 'react-router'
import { useMemo } from 'react'

const BackButtonTitle = ({ applicationPages }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const memoized = useMemo(() => {
    let currentApplicationName = ''
    let shouldShowBackButton = false

    if (location.pathname !== '') {
      const matchedApplication = applicationPages.find(app =>
        isRouteMatching(app.route.url, location.pathname)
      )

      if (matchedApplication) {
        currentApplicationName = matchedApplication.screenName
        shouldShowBackButton = true
      }
    }

    return {
      currentApplicationName,
      shouldShowBackButton
    }
  }, [location.pathname, applicationPages])

  const { currentApplicationName, shouldShowBackButton } = memoized

  const navigateBack = () => {
    navigate(-1)
  }

  return shouldShowBackButton ? (
    <Box
      sx={{
        margin: '24px 80px 0 0',
        padding: '0 8px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <BackButton text={currentApplicationName} onNavBack={navigateBack}></BackButton>
    </Box>
  ) : null
}

const isRouteMatching = (templateRoute, realRoute) => {
  const templateParts = templateRoute.split('/')
  const realParts = realRoute.split('/')

  if (templateParts.length !== realParts.length) {
    return false
  }

  for (let i = 0; i < templateParts.length; i++) {
    if (templateParts[i] !== realParts[i] && !templateParts[i].startsWith(':')) {
      return false
    }
  }

  return true
}

export default BackButtonTitle
