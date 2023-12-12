import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'oidc-react'
import { Drawer, List } from '@fullscreendigital/carrefour-dex-fe'
import { toSelectedMenuItems, toMenuItems } from './serializers'
import { logout, getUserStore, getUserRegion } from 'utils/authService'
import { SidebarHeader } from './SidebarHeader'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import cn from 'classnames'
import s from './Sidebar.scss'
import { Box, Typography } from '@mui/material'
import { Icon_v2 } from 'components/core-ui/Icon_v2'

const staticItems = [
  {
    disablePadding: true,
    icon: <Icon_v2 iconName="Home" iconType="Menu" />,
    index: 1,
    primaryText: 'Prima pagina',
    type: 'icon',
    href: '/'
  },

  // {
  //   disablePadding: true,
  //   icon: <Icon_v2 iconName="Notifications" iconType="Menu" />,
  //   index: 2,
  //   primaryText: 'Notificari',
  //   type: 'icon',
  //   href: '/'
  // },
  // {
  //   disablePadding: true,
  //   icon: <Icon_v2 iconName="User" iconType="Menu" />,
  //   index: 3,
  //   primaryText: 'Contul meu',
  //   type: 'icon',
  //   href: '/'
  // }
]

const Sidebar = ({ isMenuOpen, handleCloseMenu, modules, setSubdomainId }) => {
  const storeName = getUserStore()
  const regionName = getUserRegion()

  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(0)

  const { showNotification } = useNotification()

  const navigate = useNavigate()

  const auth = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        setItems(toMenuItems(modules))
      } catch (error) {
        // https://giphy.com/embed/oe33xf3B50fsc :))))
        showNotification({
          message: `Error while setting application module menu items. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    })()
  }, [modules])

  const handleItemClick = (event, item) => {
    event.preventDefault()

    handleCloseMenu()

    const { href, index, id } = item

    navigate(href)
    setSelectedItem(index)
    localStorage.setItem('selectedSubdomainId', id)
    setSubdomainId(id)
  }

  const handleLogout = async () => {
    logout()
    localStorage.removeItem('selectedSubdomainId')
    auth.signOutRedirect()
  }

  return (
    <Drawer
      isLeftPersistent
      open={isMenuOpen}
      onClose={handleCloseMenu}
      displayEmptyHeader
      disablePadding
      headerContent={
        <SidebarHeader
          handleCloseMenu={handleCloseMenu}
          storeName={storeName}
          regionName={regionName}
        />
      }
      headerClass={s.drawerHeader}
      paperClassName={s.itemsListContainer}
    >
      <div
        className={cn(
          s.itemsList,
          { [s.padding90]: storeName || regionName },
          { [s.padding130]: storeName && regionName }
        )}
      >
        <nav className={s.section}>
          <List
            subheader={{
              component: 'div',
              content: '',
              style: { fontSize: '70%' }
            }}
            items={staticItems.map(item => ({
              ...item,
              selected: selectedItem === item.index
            }))}
            onItemClick={handleItemClick}
          />
        </nav>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography style={{ margin: '24px 8px 24px 24px', fontSize: '20px', fontWeight: 700 }}>
            My apps
          </Typography>
          <Icon_v2 iconName="Folder" iconType="Icon" />
        </Box>

        <nav className={s.section}>
          <List
            subheader={{
              component: 'div',
              content: '',
              style: { fontSize: '70%' }
            }}
            items={toSelectedMenuItems(items, selectedItem)}
            onItemClick={handleItemClick}
          />
        </nav>

        <br />
        <nav className={s.section}>
          <List
            subheader={{
              component: 'div',
              content: '',
              style: { fontSize: '70%' }
            }}
            items={[
              {
                disablePadding: true,
                icon: <Icon_v2 iconName="Logout" iconType="Menu" />,
                index: 2,
                primaryText: 'Sign Out',
                type: 'icon'
              }
            ]}
            onItemClick={handleLogout}
          />
        </nav>
      </div>
    </Drawer>
  )
}

export default Sidebar
