import { Paper, Box } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from './PackageDashboard.modules.scss'
import { URLS } from '../constants'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../core-ui/Icon'
import { IconBox } from '../IconBox'
import Toolbar from '@mui/material/Toolbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const links = [
  {
    icon: <Icon iconName='FireTruck' fill='white' />,
    title: 'Listă camioane retur'
  },
  {
    icon: <Icon iconName='Inventory2' fill='white' />,
    title: 'Rulaj ambalaje'
  },
  {
    icon: <Icon iconName='ShoppingBag' fill='white' />,
    title: 'Sold ambalaje'
  },
  {
    icon: <Icon iconName='AssignmentReturn' fill='white' />,
    title: 'Litigii ambalaje - Retur magazine'
  },
  {
    icon: <Icon iconName='Bloodtype' fill='white' />,
    title: 'Diferenţe tip ambalaj'
  },
  {
    icon: <Icon iconName='KeyboardReturn' fill='white' />,
    title: 'Ambalaje returnate'
  },
  {
    icon: <Icon iconName='ConfirmationNumber' fill='white' />,
    title: 'Conformitate ambalaje'
  },
  {
    icon: <Icon iconName='MoreTime' fill='white' />,
    title: 'Litigii ambalaje - Administrare timer'
  }
]

const PackageDashboard = () => {
  const navigate = useNavigate()

  const getTitle = () => {
    return 'Nu'
  }

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
        {links.map((link, index) => (
          <IconBox
            icon={link.icon}
            onClick={() => null}
            title={link.title}
          />
        ))}
      </Box>
    </Paper>
  )
}

export default PackageDashboard
