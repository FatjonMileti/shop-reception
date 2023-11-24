import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import LanguageIcon from '@mui/icons-material/Language'
import LogoutIcon from '@mui/icons-material/Logout'
import { Logo } from './Logo'
import { useLocation, useNavigate } from 'react-router-dom'
import s from './AdminHeader.scss'

const AdminHeader = ({ handleOpenMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState('Română')

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageSelect = language => {
    setSelectedLanguage(language)
    handleMenuClose()
  }

  return (
    <AppBar position="static">
      <Toolbar className={s.bg}>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <Logo />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
        <Button color="inherit" startIcon={<LogoutIcon />} onClick={() => null} />
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
          aria-controls="language-menu"
          aria-haspopup="true"
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleLanguageSelect('Română')}>Română</MenuItem>
          <MenuItem onClick={() => handleLanguageSelect('English')}>English</MenuItem>
          {/* Add more language options as needed */}
        </Menu>
        <Typography variant="body2" color="inherit" sx={{ marginLeft: 1 }}>
          {selectedLanguage}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default AdminHeader
