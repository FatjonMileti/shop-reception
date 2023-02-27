import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Drawer, List, Divider } from '@fullscreendigital/carrefour-dex-fe'
import { toSelectedMenuItems, toApplicationModulesPages, toMenuItems } from './serializers'
import {
  AssuredWorkload,
  HomeOutlined,
  NotificationsNoneOutlined,
  PersonOutlineOutlined,
  PowerSettingsNewOutlined
} from '@mui/icons-material'
import { makeGetRequest } from 'utils/api'
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
    type: 'icon'
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
    index: 2,
    primaryText: 'Profile',
    type: 'icon'
  }
]

const Sidebar = ({
  isMenuOpen,
  handleCloseMenu,
  drawerWidth,
  setApplicationModulesPages,
  setSubdomainId
}) => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      // TODO: get the list of items in the menu; this is a GET to api
      try {
        const result = await makeGetRequest(
          'https://c34672c2-757c-491f-9bf0-089182c88037.mock.pstmn.io/application-modules'
        )
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

  return (
    <Drawer
      variant="permanent"
      open={isMenuOpen}
      onClose={handleCloseMenu}
      displayEmptyHeader
      anchor="right"
      headerContent={<SidebarHeader handleCloseMenu={handleCloseMenu} drawerWidth={drawerWidth} />}
    >
      <div className={s.itemsList} style={{ width: `${drawerWidth}px` }}>
        <nav className={s.section}>
          <List
            subheader={{
              component: 'div',
              content: '',
              style: { fontSize: '70%' }
            }}
            items={staticItems}
            onItemClick={handleItemClick}
          />
        </nav>
        <Divider style={{ display: 'block', backgroundColor: '#fff' }} />
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
        <Divider style={{ display: 'block', backgroundColor: '#fff' }} />
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
            onItemClick={handleItemClick}
          />
        </nav>
      </div>
    </Drawer>
  )
}

export default Sidebar
