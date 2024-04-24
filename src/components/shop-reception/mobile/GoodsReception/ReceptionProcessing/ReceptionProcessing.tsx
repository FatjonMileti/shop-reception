import { Grid } from '../../../Common/Grid'
import { TitleHeader } from '../../TitleHeader'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../admin/Common/TruckCard'

const ReceptionProcessing = () => {
  const navigate = useNavigate()

  const trucks: any[] = [
    { id: 1, name: 'Camion 2', description: 'Descriere camion 2' },
    { id: 2, name: 'Camion 3', description: 'Descriere camion 3' }
  ]

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='Procesarea Recepției' />,
        ...trucks.map((item: any, index) => (
          <TruckCard
            key={item.id}
            onClick={() => {
              navigate(URLS.AUTH_SUPPORT_CODE)
            }}
            truck={item}
          />
        ))
      ]}
      itemsPerRow={1}
    />
  )
}

export default ReceptionProcessing
