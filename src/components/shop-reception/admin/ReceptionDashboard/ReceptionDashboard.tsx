import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../constants'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../core-ui/Icon'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { MainLayout } from '../Common/MainLayout'

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

  return (
    <MainLayout
      title='Recepţie marfă'
      links={getList(navigate)}
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

export default ReceptionDashboard
