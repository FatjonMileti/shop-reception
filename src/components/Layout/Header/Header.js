import { useState } from 'react'
import { AppBar, Menu } from '@fullscreendigital/carrefour-dex-fe'
// import {
//   getHeaderRightItems,
//   getHeaderRightMenuItems,
//   getNotificationsItems,
//   getChatItems
// } from './helpers'

const Header = ({ isMenuOpen, handleOpenMenu, drawerWidth }) => {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatAnchorEl, setChatAnchorEl] = useState(null)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null)

  const handleChatButtonClick = event => {
    setChatAnchorEl(event.currentTarget)
    setChatOpen(true)
  }

  const handleChatClose = () => {
    setChatAnchorEl(null)
    setChatOpen(false)
  }

  const handleNotificationsButtonClick = event => {
    setNotificationsAnchorEl(event.currentTarget)
    setNotificationsOpen(true)
  }

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null)
    setNotificationsOpen(false)
  }

  const onSearchInputChange = event => console.log(`search word is: ${event.currentTarget.value}`)

  return (
    <>
      <AppBar
        id="back-to-top-anchor"
        position="fixed"
        style={{
          zIndex: '1201',
          right: '1px',
          ...(isMenuOpen
            ? {
                width: `calc(100% - ${drawerWidth}px)`,
                marginRight: `${drawerWidth}px`
              }
            : {})
        }}
        iconButtonProps={{
          style: { marginRight: '2rem', ...(isMenuOpen && { display: 'none' }) },
          onClick: handleOpenMenu
        }}
        // rightItems={getHeaderRightItems(handleChatButtonClick, handleNotificationsButtonClick)}
        // rightMenuItems={getHeaderRightMenuItems()}
      />
    </>
  )
}

export default Header
