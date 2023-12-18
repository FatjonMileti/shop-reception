import { Grid, Container } from '@mui/material'
import s from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../shop-reception/TruckCard'

const ReceptionProcessing = () => {
  const navigate = useNavigate()

  const list: Truck[] = [
    { id: 1, name: 'Camion 2', description: 'Descriere camion 2' },
    { id: 2, name: 'Camion 3', description: 'Descriere camion 3' }
  ]

  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <form>
        <Grid container spacing={2} className={s.wrapper}>
          <Grid item xs={12}>
            {list.map((item: Truck, index) => (
              <TruckCard
                key={index}
                onClick={() => {
                  navigate(URLS.AUTH_SUPPORT_CODE)
                }}
                truck={item}
              />
            ))}
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ReceptionProcessing
