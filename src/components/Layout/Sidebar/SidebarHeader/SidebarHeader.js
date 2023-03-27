import Box from '@mui/material/Box'
import { Close } from '@mui/icons-material'
import { Avatar, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import s from './SidebarHeader.scss'

const SidebarHeader = ({ handleCloseMenu }) => {

  return (
    <Box className={s.menuHeaderContainer}>
      <div>
        <Avatar alt="Paula Dan" value="PD" />
      </div>
      <div className={s.userName}>Paula Dan</div>
      <IconButton className={s.logo} onClick={handleCloseMenu}>
        <Close />
      </IconButton>
    </Box>
  )
}

export default SidebarHeader
