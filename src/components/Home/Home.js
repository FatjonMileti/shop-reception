import { useNavigate } from 'react-router-dom'
import { Accordion, List, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from 'components/core-ui/Icon'
import { KeyboardArrowRightOutlined } from '@mui/icons-material'
import s from './Home.scss'

const Home = ({ modules, setSubdomainId }) => {
  const navigate = useNavigate()

  const toListItems = submodules => {
    return submodules.map((item, index) => ({
      type: item.icon ? 'icon' : 'text',
      primaryText: item.name,
      index: index,
      icon: <Icon iconName={item.icon} />,
      disablePadding: true,
      id: item.id,
      href: item.routeURL || null,
      nestedItems: [],
      infoText: (
        <span style={{ opacity: '0.5' }}>
          <KeyboardArrowRightOutlined />
        </span>
      )
    }))
  }

  const handleItemClick = (event, item) => {
    event.preventDefault()

    const { href, id } = item

    navigate(href)
    localStorage.setItem('selectedSubdomainId', id)
    setSubdomainId(id)
  }

  return (
    <div className={s.homeWrapper}>
      {modules.map((module, index) => {
        return (
          <Accordion
            key={module.id}
            summary={
              <Typography variant="medium">
                <span className={s.moduleAccordionSummary}>
                  <Icon iconName={module.icon} />
                  {module.name}
                </span>
              </Typography>
            }
            details={<List items={toListItems(module.submodules)} onItemClick={handleItemClick} />}
            // disableGutters
            defaultExpanded={index == 0}
            id={module.id}
            onChange={function noRefCheck() {}}
          />
        )
      })}
    </div>
  )
}

export default Home
