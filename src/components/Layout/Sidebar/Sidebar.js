import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'oidc-react'
import { Drawer, List, Divider } from '@fullscreendigital/carrefour-dex-fe'
import { toSelectedMenuItems, toApplicationModulesPages, toMenuItems } from './serializers'
import {
  HomeOutlined,
  NotificationsNoneOutlined,
  PersonOutlineOutlined,
  PowerSettingsNewOutlined
} from '@mui/icons-material'
import { makeDesignerGetRequest } from 'utils/api'
import { logout } from 'utils/authService'
import { SidebarHeader } from './SidebarHeader'
import { useNotification } from 'hooks'
import s from './Sidebar.scss'

const staticItems = [
  {
    disablePadding: true,
    icon: <HomeOutlined />,
    index: 1,
    primaryText: 'Home',
    type: 'icon',
    href: '/'
  },
  {
    disablePadding: true,
    icon: <NotificationsNoneOutlined />,
    index: 2,
    primaryText: 'Notifications',
    type: 'icon'
  },
  {
    disablePadding: true,
    icon: <PersonOutlineOutlined />,
    index: 3,
    primaryText: 'Profile',
    type: 'icon'
  }
]

const Sidebar = ({
  isMenuOpen,
  handleCloseMenu,
  setModules,
  setApplicationModulesPages,
  setSubdomainId
}) => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(0)

  const { showNotification } = useNotification()

  const navigate = useNavigate()

  const auth = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        const result = await makeDesignerGetRequest('/application-modules')
        setModules(result)
        setItems(toMenuItems(result))
        setApplicationModulesPages(toApplicationModulesPages(result))
      } catch (error) {
        // https://giphy.com/embed/oe33xf3B50fsc :))))
        showNotification({
          message: `Error while fetching application modules. ${error.message}`,
          type: 'error'
        })
      }
    })()
  }, [])

  const handleItemClick = (event, item) => {
    event.preventDefault()

    const { href, index, id } = item

    navigate(href)
    setSelectedItem(index)
    localStorage.setItem('selectedSubdomainId', id)
    setSubdomainId(id)
  }

  const handleLogout = async () => {
    logout()
    auth.signOutRedirect()
  }

  return (
    <Drawer
      isRightPersistent
      open={isMenuOpen}
      onClose={handleCloseMenu}
      displayEmptyHeader
      disablePadding
      headerContent={<SidebarHeader handleCloseMenu={handleCloseMenu} />}
      headerClass={s.drawerHeader}
      paperClassName={s.itemsListContainer}
    >
      <div className={s.itemsList}>
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
        <Divider style={{ display: 'block', backgroundColor: '#fff', margin: '16px 0' }} />
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
        <Divider style={{ display: 'block', backgroundColor: '#fff', margin: '16px 0' }} />
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
                icon: <PowerSettingsNewOutlined />,
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
