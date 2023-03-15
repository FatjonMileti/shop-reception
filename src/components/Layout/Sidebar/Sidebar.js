import { useState, useEffect, useContext } from 'react'
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
import { DrawerContext } from 'contexts'
import { SidebarHeader } from './SidebarHeader'
import s from './Sidebar.scss'

const mockedResult = [
  {
    id: '1',
    name: 'Governance',
    icon: 'AssuredWorkload',
    routePathExact: false,
    submodules: [
      {
        id: '1',
        name: 'Project Team',
        icon: 'Groups',
        routeURL: '/governance/projectTeam',
        routePathExact: true,
        moduleId: '1'
      },
      {
        id: '2',
        name: 'Project Deliverables',
        icon: 'LocalShipping',
        routeURL: '/governance/projectDeliverables',
        routePathExact: true,
        moduleId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Test Domain',
    icon: 'BarChart',
    routePathExact: false,
    submodules: [
      {
        id: '3',
        name: 'Test subdomain',
        icon: 'BarChart',
        routeURL: '/testDomain/testSubdomain',
        routePathExact: true,
        moduleId: '2'
      }
    ]
  }
]

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

const Sidebar = ({ isMenuOpen, handleCloseMenu, setApplicationModulesPages, setSubdomainId }) => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(0)

  const { drawerWidth } = useContext(DrawerContext)

  const navigate = useNavigate()

  const auth = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        const result = await makeDesignerGetRequest('/application-modules')
        setItems(toMenuItems(result))
        setApplicationModulesPages(toApplicationModulesPages(result))
      } catch (error) {
        console.log(error)
        setItems(toMenuItems(mockedResult))
        setApplicationModulesPages(toApplicationModulesPages(mockedResult))
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
    auth.signOutRedirect()
    await logout()
  }

  return (
    <Drawer
      isRightPersistent
      open={isMenuOpen}
      onClose={handleCloseMenu}
      displayEmptyHeader
      disablePadding
      headerContent={<SidebarHeader handleCloseMenu={handleCloseMenu} drawerWidth={drawerWidth} />}
      headerStyle={{ position: 'fixed', width: '400px', paddingRight: 0, zIndex: 1203 }}
      paperClassName={s.itemsListContainer}
    >
      <div className={s.itemsList} style={{ width: `${drawerWidth}px` }}>
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
