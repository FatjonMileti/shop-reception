import Box from '@mui/material/Box'
import { Close } from '@mui/icons-material'
import { Avatar, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import s from './SidebarHeader.scss'

const SidebarHeader = ({ handleCloseMenu, drawerWidth }) => {
  return (
    <Box
      className={s.menuHeaderContainer}
      style={{ gridTemplateColumns: `40px ${drawerWidth - 140}px 40px` }}
    >
      <div>
        <Avatar alt="Paula Dan" value="PD" />
      </div>
      <div className={s.userName}>Paula Dan</div>
      <IconButton className={s.logo}>
        <Close onClick={handleCloseMenu} />
      </IconButton>
    </Box>
  )
}

export default SidebarHeader
