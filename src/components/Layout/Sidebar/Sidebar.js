import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Drawer, List } from '@fullscreendigital/carrefour-dex-fe'
import { toSelectedMenuItems, toApplicationModulesPages, toMenuItems } from './serializers'
import { Close, AssuredWorkload } from '@mui/icons-material'
import { makeGetRequest } from 'utils/api'
import s from './Sidebar.scss'

const mockedItems = [
  {
    type: 'icon',
    primaryText: 'Governance Services',
    index: 1,
    icon: <AssuredWorkload />,
    disablePadding: true,
    id: '1234',
    nestedItems: [
      {
        type: 'text',
        primaryText: 'Project Team',
        index: 13,
        disablePadding: true,
        href: 'governance/projectTeam',
        id: '567'
      }
    ]
  }
]

const mockedApplicationModulesPages = [
  {
    route: {
      url: '/governance/projectTeam',
      exact: true
    }
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
        setItems(mockedItems)
        setApplicationModulesPages(mockedApplicationModulesPages)
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
      headerContent={
        <span className={s.logo}>
          <Close />
        </span>
      }
    >
      <div style={{ width: `${drawerWidth}px`, margin: '0 auto' }}>
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
        {/* <Divider style={{ display: 'block' }} /> */}
      </div>
    </Drawer>
  )
}

export default Sidebar
