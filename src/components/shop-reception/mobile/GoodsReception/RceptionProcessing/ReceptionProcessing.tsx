import { Grid, Container } from '@mui/material'
import cs from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../admin/Common/TruckCard'

const ReceptionProcessing = () => {
  const navigate = useNavigate()

  const trucks: Truck[] = [
    { id: 1, name: 'Camion 2', description: 'Descriere camion 2' },
    { id: 2, name: 'Camion 3', description: 'Descriere camion 3' }
  ]

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='Procesarea Recepției' />
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          <Grid item xs={12}>
            {trucks.map((item: Truck, index) => (
              <TruckCard
                key={item.id}
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
