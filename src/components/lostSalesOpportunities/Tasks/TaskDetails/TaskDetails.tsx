import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Capsule } from 'components/core-ui/Capsule'
import { useNavigate } from 'react-router-dom'

interface TaskDetailsProps {
  item: any
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ item }) => {
  const navigate = useNavigate()
  return (
    <>
      <Grid container>
        <Grid item mt={1} mr={1}>
          <Capsule label="Categoria" value={item.category} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Cod METI" value={item.metiCode} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Cantitate" value={item.quantity} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Stoc" value={item.stock} />
        </Grid>
      </Grid>

      <Grid item mt={1} mr={1} alignSelf={'right'}>
        <Button
          variant="outlined"
          label="Vezi detalii"
          onClick={() => navigate(`/lostSalesOpportunities/tasks/${item.id}`)}
        />
      </Grid>
    </>
  )
}

export default TaskDetails
