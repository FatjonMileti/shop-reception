import { Grid, Container, Paper } from '@mui/material'
import { Button, Divider, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { URLS } from '../../constants'
import useRoles from '../../useRoles'
import { useNavigate } from 'react-router-dom'
import { TitleHeader } from '../../TitleHeader'
import { TruckCard } from '../../../shop-reception/TruckCard'

const ListTrucks = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  const navigate = useNavigate()

  const trucks: Truck[] = [
    { id: 1, name: 'Camion 1', description: 'Descriere camion 1' },
    { id: 2, name: 'Camion 2', description: 'Descriere camion 2' },
    { id: 3, name: 'Camion 3', description: 'Descriere camion 3' }
  ]

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        Selecteazǎ Camion
      </Typography>
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          <Grid item xs={12}>
            {trucks.map((truck: Truck, index) => (
              <TruckCard
                key={truck.id}
                onClick={() => {
                  navigate(URLS.AUTH_TRUCK_DETAIL.replace(':id', truck.id.toString()))
                }}
                truck={truck}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Divider>SAU</Divider>
          </Grid>
          {(isShopUser || isHubUser) && <Grid item xs={12}>
            <Button
              type='button'
              variant='contained'
              label='ADAUGǍ CAMION'
              style={{ width: '100%' }}
              onClick={() => {
                navigate(URLS.AUTH_ADD_TRUCK)
              }}
            />
          </Grid>}
        </Grid>
      </form>
    </Container>
  )
}

export default ListTrucks
