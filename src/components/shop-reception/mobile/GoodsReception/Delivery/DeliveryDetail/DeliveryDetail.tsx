import { Grid } from '../../../../Common/Grid'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'

const DeliveryDetail = () => {
  const navigate = useNavigate()
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='VALIDARE LIVRARE' />,
        <>
          <Typography variant='medium' component='p'>Numǎr înmatriculare: ASDS23</Typography>
          <Typography variant='medium' component='p'>Suporți verificați: Hub Deva Abient</Typography>
        </>,
        <Button
          type='button'
          variant='contained'
          label='SCANARE INTEGRALǍ'
          size='large'
          onClick={() => navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN)}
        />,
        <Button
          type='button'
          variant='contained'
          label='PRODUSE SENSIBILE'
          size='large'
          onClick={() => navigate(URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS)}
        />,
        <Button
          type='button'
          variant='contained'
          label='SUPORT ALEATOR'
          size='large'
          onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_SUPPORT)}
        />,
        <Button
          type='button'
          variant='contained'
          label='PRODUSE ALEATOR'
          size='large'
          onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_PRODUCT)}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default DeliveryDetail
