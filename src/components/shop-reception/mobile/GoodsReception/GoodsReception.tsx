import { Grid  } from '../../Common/Grid'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../constants'
import useRoles from '../useRoles'
import { useNavigate } from 'react-router-dom'
import { TitleHeader } from '../TitleHeader'

const GoodsReception = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  const navigate = useNavigate()

  let items = [
    <TitleHeader title='Receptie Marfa' />,
  ]

  if(isShopUser){
    items = [
      ...items,
      <Button
      type='button'
      variant='contained'
      label='LISTǍ CAMIOANE'
      style={{ width: '100%' }}
      onClick={() => {
        navigate(URLS.AUTH_LIST_TRUCKS)
      }}
    />,
      <Button
        type='button'
        variant='contained'
        label='VALIDARE LIVRARE'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_DELIVERY)
        }}
      />
    ]
  }

  if(isShopUser || isHubUser){
    items = [
      ...items,
      <Button
        type='button'
        variant='contained'
        label='ÎN PROCESARE RECEPȚIE'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_RECEPTION_PROCESSING)
        }}
      />,
    ]
  }

  if(isHubUser){
    items = [
      ...items,
      <Button
        type='button'
        variant='contained'
        label='CAMIOANE AȘTEPTATE'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_EXPECTED_TRUCKS)
        }}
      />,
      <Button
        type='button'
        variant='contained'
        label='ÎNREGISTREAZǍ CAMION'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_REGISTER_TRUCK)
        }}
      />,
      <Button
        type='button'
        variant='contained'
        label='ÎN PROCESARE EXPEDIȚIE'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_PROCESSING_SHIPMENT)
        }}
      />,
      <Button
        type='button'
        variant='contained'
        label='CAMIOANE EXPEDIATE'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_SHIPPED_TRUCKS)
        }}
      />
    ]
  }

  return (
    <Grid
      gridContainerStyle={{marginTop: '20px'}}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default GoodsReception
