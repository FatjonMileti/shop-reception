import { useContext } from 'react'
import { AppBar } from '@fullscreendigital/carrefour-dex-fe'
import { DragHandleOutlined } from '@mui/icons-material'
import { DrawerContext } from 'contexts'
import menu from '../../../images/apps.svg'
import s from './Header.scss'
import dayjs from 'dayjs'

const Header = ({ handleOpenMenu }) => {
  const { isMenuOpen } = useContext(DrawerContext)

  const date = dayjs(new Date())
  const formattedDate = date.format('dddd, MMMM D')

  return (
    <>
      <AppBar
        id="back-to-top-anchor"
        style={{
          zIndex: '1201',
          transition: 'all 0.3s ease'
        }}
        mainItem={{
          content: <img src="images/carrefour.png" style={{ width: '100%' }} />,
          style: {
            position: 'absolute',
            display: 'flex',
            width: '60px',
            left: 'calc(50% - 30px)'
          },
          boxShadow: '0px 6px 9px -3px rgba(0,0,0,0.1)'
        }}
        position="relative"
        menuIcon={
          <>
            <img src={menu} onClick={x => handleOpenMenu(x)} />{' '}
            <span className={s.dateMenu}>{formattedDate}</span>
          </>
        }
      />
    </>
  )
}

export default Header
