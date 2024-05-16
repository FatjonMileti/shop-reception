import { Grid } from '../../../../../../Common/Grid'
import { TitleHeader } from '../../../../../Common/TitleHeader'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../../../../../constants'
import { useNavigate } from 'react-router-dom'

const DeliveryCompleteScan = () => {
  const navigate = useNavigate()
  return (
    <Grid
      gridContainerStyle={{marginTop: '20px'}}
      maxWidth='xs'
      items={[
        <TitleHeader title='VALIDARE LIVRARE SCANARE INTEGRALǍ' />,
        <Grid
          hasPaper={true}
          spacing={1}
          onClick={() => {
            navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_1)
          }}
          items={[
            <Typography variant='medium' component='p'>SCANARE INTEGRALǍ</Typography>,
            <Typography variant='medium' component='p'>Număr înmatriculare: BA32489</Typography>,
            <Typography variant='medium' component='p'>Suporți verificați: 0 / 4</Typography>
          ]}
          itemsPerRow={1}
        />,
        <Grid
          hasPaper={true}
          spacing={1}
          items={[
            <Typography variant='medium' component='p'>BL: 545465</Typography>
          ]}
          itemsPerRow={1}
        />,
      ]}
      itemsPerRow={1}
    />
  )
}

export default DeliveryCompleteScan
