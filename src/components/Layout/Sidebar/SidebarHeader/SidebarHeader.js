import Box from '@mui/material/Box'
import { Close } from '@mui/icons-material'
import { Avatar, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import s from './SidebarHeader.scss'
import { getUserName, getUserAvatarString } from 'utils/authService'

const SidebarHeader = ({ handleCloseMenu }) => {
  const userInfo = getUserName()
  const avatarString = getUserAvatarString()

  return (
    <Box className={s.menuHeaderContainer}>
      <div>
        <Avatar alt={userInfo} value={avatarString} />
      </div>
      <div className={s.userName}>{userInfo}</div>
      <IconButton className={s.logo} onClick={handleCloseMenu}>
        <Close />
      </IconButton>
    </Box>
  )
}

export default SidebarHeader
