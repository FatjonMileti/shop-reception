import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../constants'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../core-ui/Icon'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { MainLayout } from '../Common/MainLayout'

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
    <MainLayout
      title='Ambalaje'
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

export default PackageDashboard
