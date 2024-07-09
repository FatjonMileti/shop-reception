import { Grid } from '../../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { URLS } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../../admin/Common/TruckCard'
import { useNotification } from '../../../../../../hooks'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../../utils/api'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { CircularProgress } from '@mui/material'

const ExpenditureProcessing = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: trucks, isLoading } = useQuery(
    'inProgressTrucks',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/in-process', null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching trucks. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  if (isLoading) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  let items = [
    <TitleHeader title="ÎN PROCESARE EXPEDIȚIE" />,
    !!trucks &&
      trucks?.map((item, index) => (
        <TruckCard
          key={index}
          onClick={() => {
            navigate(`${URLS.AUTH_REGISTER_TRUCK_STEP_2}?id=${item.id}`)
          }}
          truck={item}
        />
      ))
  ]

  if (!trucks || trucks.length === 0) {
    items.push(
      <Typography
        variant="light"
        component="p"
        style={{ textAlign: 'center', textTransform: 'uppercase' }}
      >
        Nu existǎ camioane în lucru
      </Typography>
    )
  }

  return (
    <Grid gridContainerStyle={{ marginTop: '20px' }} maxWidth="xs" items={items} itemsPerRow={1} />
  )
}

export default ExpenditureProcessing
