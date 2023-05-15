import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { Accordion } from '@fullscreendigital/carrefour-dex-fe'

const ProductStockInfo = () => {
  const product = useSelector((state: RootState) => state.product)

  return (
    <Accordion
      key={module.id}
      summary={
        <Typography variant="medium">
          <span className={s.moduleSummary}>
            <Icon iconName={module.icon} tiny={true} />
            {module.name}
          </span>
        </Typography>
      }
      details={
        <Box className={s.applicationsWrapper} style={{ justifyContent: 'center' }}>
          {module.submodules.map(app => (
            <div
              key={app.id}
              onClick={() => {
                localStorage.setItem('selectedSubdomainId', app.id)
                setSubdomainId(app.id)
                navigate(app.routeURL)
              }}
              className={s.applicationContainer}
            >
              <div className={s.iconContainer}>
                <Icon iconName={app.icon} />
              </div>
              <span className={s.applicationName}>{app.name}</span>
            </div>
          ))}
        </Box>
      }
      // disableGutters
      defaultExpanded={index == 0}
      id={module.id}
      onChange={function noRefCheck() {}}
    />
  )
}

export default ProductStockInfo
