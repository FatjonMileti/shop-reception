import Box from '@mui/material/Box'
import { Close } from '@mui/icons-material'
import { Avatar, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import s from './SidebarHeader.scss'
import { getUserName, getUserAvatarString } from 'utils/authService'

const SidebarHeader = ({ handleCloseMenu, storeName, regionName }) => {
  const userInfo = getUserName()
  const avatarString = getUserAvatarString()

  return (
    <Box className={s.menuHeaderContainer}>
      <div>
        <div className={s.userInfoContainer}>
          <Avatar alt={userInfo} value={avatarString} />
          <span className={s.userName}>{userInfo}</span>
        </div>
        {storeName && <div className={s.storeInfoContainer}>Magazin {storeName}</div>}
        {regionName && <div className={s.storeInfoContainer}>Regiune {regionName}</div>}
      </div>

      <IconButton className={s.logo} onClick={handleCloseMenu}>
        <Close />
      </IconButton>
    </Box>
  )
}

export default SidebarHeader
