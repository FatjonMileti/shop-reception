import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../constants'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../core-ui/Icon'
import DownloadIcon from '@mui/icons-material/Download'
import { MainLayout } from '../Common/MainLayout'

const getLinks = (navigate) => {
  return [
    {
      icon: <Icon iconName='Admin' fill='white' />,
      title: 'Administrare',
      onClick: () => navigate(URLS.AUTH_ADMIN_DASHBOARD)
    },
    {
      icon: <Icon iconName='StoreManager' fill='white' />,
      title: 'Recepţie marfă',
      onClick: () => navigate(URLS.AUTH_RECEPTION_DASHBOARD)
    },
    {
      icon: <Icon iconName='ClustersManagement' fill='white' />,
      title: 'Ambalaje',
      onClick: () => navigate(URLS.AUTH_PACKAGE_DASHBOARD)
    },
  ]
}

const Home = () => {
  const navigate = useNavigate()

  return (
    <MainLayout
      links={getLinks(navigate)}
      toolbarButtons={[
        <Button label='Manual utilizare aplicaţie mobil' size='small' variant='outlined'>
          <DownloadIcon />
        </Button>,
        <Button label='Manual utilizare aplicaţie administrare' size='small' variant='outlined'>
          <DownloadIcon />
        </Button>,
        <Button label='APK Receptie Marfa V0.7.4' size='small' variant='outlined'>
          <DownloadIcon />
        </Button>,
        <Button label='APK Receptie Marfa V0.7.5' size='small' variant='outlined'>
          <DownloadIcon />
        </Button>
      ]}
    />
  )
}

export default Home
