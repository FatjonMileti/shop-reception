import { Box } from '@mui/system'
import BackButton from './BackButton/BackButton'
import s from './BackButton/BackButton.modules.scss'

import { useLocation, useNavigate } from 'react-router'
import { useMemo } from 'react'
import cn from 'classnames'

const BackButtonTitle = ({ applicationPages }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const memoized = useMemo(() => {
    let currentApplicationName = ''
    let currentName = ''
    let shouldShowBackButton = false

    if (location.pathname !== '') {
      const matchedApplication = applicationPages.find(app =>
        isRouteMatching(app.route.url, location.pathname)
      )

      if (matchedApplication) {
        currentApplicationName = matchedApplication.screenName
        currentName = matchedApplication.name
        shouldShowBackButton = true
      }
    }

    return {
      currentApplicationName,
      currentName,
      shouldShowBackButton
    }
  }, [location.pathname, applicationPages])

  const { currentApplicationName, shouldShowBackButton, currentName } = memoized

  const navigateBack = () => {
    navigate(-1)
  }

  return shouldShowBackButton ? (
    <Box
      className={
        currentName === 'Management task-uri' ? cn(s.absoluteArrowStyles) : cn(s.arrowStyles)
      }
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
