import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../constants'
import { Icon } from '../../../core-ui/Icon'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { MainLayout } from '../Common/MainLayout'
import { useNavigate } from 'react-router-dom'

const getLinks = (navigate) => {
  return [
    {
      icon: <Icon iconName='Storage' fill='white' />,
      title: 'Administrare depozite',
      onClick: () => navigate(URLS.AUTH_ADMIN_DEPOSIT)
    },
    {
      icon: <Icon iconName='DeviceHub' fill='white' />,
      title: 'Administrare huburi',
      onClick: () => navigate(URLS.AUTH_ADMIN_HUB)
    },
    {
      icon: <Icon iconName='ShoppingBasket' fill='white' />,
      title: 'Administrare magazine',
      onClick: () => navigate(URLS.AUTH_ADMIN_STORE)
    },
    {
      icon: <Icon iconName='Public' fill='white' />,
      title: 'Administrare regiuni',
      onClick: () => navigate(URLS.AUTH_ADMIN_REGIONS)
    },
    {
      icon: <Icon iconName='VerticalAlignBottom' fill='white' />,
      title: 'Centralizare magazine şi huburi',
      onClick: () => navigate(URLS.AUTH_CENTRALIZATION_STORES_HUB)
    },
    {
      icon: <Icon iconName='AdfScanner' fill='white' />,
      title: 'Administrare tipuri de scanare',
      onClick: () => navigate(URLS.AUTH_MANAGE_SCAN_TYPES)
    },
    {
      icon: <Icon iconName='RuleFolder' fill='white' />,
      title: 'Prag valabilitate subfamilii',
      onClick: () => navigate(URLS.AUTH_SUBFAMILY_VALIDITY_THRESHOLD)
    },
    {
      icon: <Icon iconName='Inventory' fill='white' />,
      title: 'Listă produse METI',
      onClick: () => navigate(URLS.AUTH_METI_PRODUCTS)
    },
    {
      icon: <Icon iconName='Favorite' fill='white' />,
      title: 'Administrare produse sensibile',
      onClick: () => navigate(URLS.AUTH_ADMIN_SENSITIVE_PRODUCTS)
    },
    {
      icon: <Icon iconName='Recycling' fill='white' />,
      title: 'Administrare tipuri de ambalaje',
      onClick: () => navigate(URLS.AUTH_ADMIN_PACKING_TYPES)
    },
    {
      icon: <Icon iconName='AccessAlarm' fill='white' />,
      title: 'Administrare produse cu DLC scurt',
      onClick: () => navigate(URLS.AUTH_MANAGE_DLC_PRODUCTS)
    },
    {
      icon: <Icon iconName='DocumentScanner' fill='white' />,
      title: 'Fişiere recepţie Infolog',
      onClick: () => navigate(URLS.AUTH_RECEPTION_FILES_INFO)
    },
    {
      icon: <Icon iconName='Star' fill='white' />,
      title: 'Administrare produse SGR',
      onClick: () => navigate(URLS.AUTH_SGR_PRODUCTS)
    }
  ]
}

const AdminDashboard = () => {
  const navigate = useNavigate()

  return (
    <MainLayout
      title="Administrare"
      links={getLinks(navigate)}
      toolbarButtons={[
        <Button
          label='Back'
          size='small'
          variant='contained'
          onClick={() => navigate(URLS.AUTH_HOME)}
        >
          <ArrowBackIcon />
        </Button>
      ]}
    />
  )
}

export default AdminDashboard
