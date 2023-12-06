import { Grid } from '@mui/material'
import { Capsule } from 'components/core-ui/Capsule'

const TaskDescription = item => {
  const { frequency } = item.item

  return (
    <Grid container flexDirection="column">
      <Grid container>
        <Grid item mr={1}>
          <Capsule label="Frecventa" value={frequency.name} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TaskDescription
