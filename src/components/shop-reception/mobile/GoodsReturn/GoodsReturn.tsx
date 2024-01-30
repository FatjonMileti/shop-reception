import { Grid  } from '../../Common/Grid'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../constants'
import useRoles from '../useRoles'
import { useNavigate } from 'react-router-dom'
import { TitleHeader } from '../TitleHeader'

const GoodsReturn = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  const navigate = useNavigate()

  let items = [
    <TitleHeader title='Returneaza Marfa' />,
  ]

  if(isShopUser){
    items = [
      ...items,
        <Button
          type='button'
          variant='contained'
          label='COMANDǍ CAMION RETUR'
          style={{ width: '100%' }}
          onClick={() => {
            navigate(URLS.AUTH_ORDER_RETURN_TRUCK)
          }}
        />,
        <Button
          type='button'
          variant='contained'
          label='CAMIOANE RETUR CONFIRMATE'
          style={{ width: '100%' }}
          onClick={() => {
            navigate(URLS.AUTH_CONFIRM_RETURN_TRUCKS)
          }}
        />
    ]
  }

  if(isHubUser){
    items = [
      ...items,
      <Button
        type='button'
        variant='contained'
        label='RETURURI AȘTEPTATE'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_EXPECTED_RETURNS)
        }}
      />,
      <Button
        type='button'
        variant='contained'
        label='RETUR ÎN CURS DE RECEPȚIE'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_IN_PROGRESS_RETURN)
        }}
      />,
      <Button
        type='button'
        variant='contained'
        label='ÎNREGISTRARE RETUR'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_RECORD_RETURN)
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
        label='CONTINUARE RETUR'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_CONTINUE_RETURN)
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

export default GoodsReturn
