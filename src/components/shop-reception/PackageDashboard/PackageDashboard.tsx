import { Paper, Box } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from './PackageDashboard.modules.scss'
import { URLS } from '../constants'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../core-ui/Icon'
import { IconBox } from '../IconBox'
import Toolbar from '@mui/material/Toolbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const getLinks = (navigate) => {
  return [
    {
      icon: <Icon iconName='FireTruck' fill='white' />,
      title: 'Listă camioane retur',
      onClick: () => navigate(URLS.AUTH_RETURN_TRUCK_LIST)
    },
    {
      icon: <Icon iconName='Inventory2' fill='white' />,
      title: 'Rulaj ambalaje',
      onClick: () => navigate(URLS.AUTH_ROLLING_PACKAGES)
    },
    {
      icon: <Icon iconName='ShoppingBag' fill='white' />,
      title: 'Sold ambalaje',
      onClick: () => navigate(URLS.AUTH_BALANCE_PACKAGING)
    },
    {
      icon: <Icon iconName='AssignmentReturn' fill='white' />,
      title: 'Litigii ambalaje - Retur magazine',
      onClick: () => navigate(URLS.AUTH_PACKAGING_DISPUTES_OF_STORE_RETURNS)
    },
    {
      icon: <Icon iconName='Bloodtype' fill='white' />,
      title: 'Diferenţe tip ambalaj',
      onClick: () => navigate(URLS.AUTH_PACKAGING_TYPES_DIFFERENCES)
    },
    {
      icon: <Icon iconName='KeyboardReturn' fill='white' />,
      title: 'Ambalaje returnate',
      onClick: () => navigate(URLS.AUTH_RETURNED_PACKAGING)
    },
    {
      icon: <Icon iconName='ConfirmationNumber' fill='white' />,
      title: 'Conformitate ambalaje',
      onClick: () => navigate(URLS.AUTH_PACKAGING_COMPLIANCE)
    },
    {
      icon: <Icon iconName='MoreTime' fill='white' />,
      title: 'Litigii ambalaje - Administrare timer',
      onClick: () => navigate(URLS.AUTH_PACKAGING_DISPUTES_OF_TIMER_ADMINISTRATION)
    }
  ]
}

const PackageDashboard = () => {
  const navigate = useNavigate()

  return (
    <Paper className={s.paper}>
      <Typography component='h2' variant='regular'
                  style={{ textAlign: 'center', textTransform: 'uppercase' }}>Ambalaje</Typography>

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
        {getLinks(navigate).map((link, index) => (
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

export default PackageDashboard
