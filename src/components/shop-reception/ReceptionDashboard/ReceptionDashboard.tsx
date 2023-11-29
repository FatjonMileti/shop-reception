import { Paper, Box } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from './ReceptionDashboard.modules.scss'
import { URLS } from '../constants'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../core-ui/Icon'
import { IconBox } from '../IconBox'
import Toolbar from '@mui/material/Toolbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const getList = (navigate) => {
  return [
    {
      icon: <Icon iconName='AirplaneTicket' fill='white' />,
      title: 'Bonuri de livrare',
      onClick: () => navigate(URLS.AUTH_DELIVERY_SLIPS_LIST)
    },
    {
      icon: <Icon iconName='FireTruck' fill='white' />,
      title: 'Listă camioane marfă',
      onClick: () => navigate(URLS.AUTH_TRUCK_LIST)
    },
    {
      icon: <Icon iconName='BugReport' fill='white' />,
      title: 'Suporţi cu destinaţie eronată',
      onClick: () => navigate(URLS.AUTH_SUPPORT_WRONG_DESTINATION)
    },
    {
      icon: <Icon iconName='SentimentDissatisfied' fill='white' />,
      title: 'Produse necomandate',
      onClick: () => navigate(URLS.AUTH_UNORDERED_PRODUCTS)
    },
    {
      icon: <Icon iconName='AttachFileSharp' fill='white' />,
      title: 'Fişiere Meti',
      onClick: () => navigate(URLS.AUTH_METI_FILES)
    },
    {
      icon: <Icon iconName='ListAlt' fill='white' />,
      title: 'Produse cu diferenţe',
      onClick: () => navigate(URLS.AUTH_DIFFERENCES_PRODUCTS)
    },
    {
      icon: <Icon iconName='HelpCenter' fill='white' />,
      title: 'Transabilitate suport',
      onClick: () => navigate(URLS.AUTH_SUPPORT_TRADABILITY)
    }
  ]
}

const ReceptionDashboard = () => {
  const navigate = useNavigate()

  const getTitle = () => {
    return 'Nu'
  }

  return (
    <Paper className={s.paper}>
      <Typography component='h2' variant='regular'
                  style={{ textAlign: 'center', textTransform: 'uppercase' }}>Recepţie marfă</Typography>

      <Toolbar className={s.toolbar}>
        <Button
          label='Back'
          size='small'
          variant='contained'
          onClick={() => navigate(URLS.AUTH_HOME)}
        >
          <ArrowBackIcon />
        </Button>
      </Toolbar>

      <Box className={s.container}>
        {getList(navigate).map((link, index) => (
          <IconBox
            icon={link.icon}
            onClick={link.onClick}
            title={link.title}
          />
        ))}
      </Box>
    </Paper>
  )
}

export default ReceptionDashboard
