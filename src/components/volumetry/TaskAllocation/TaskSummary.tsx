import { Capsule } from 'components/core-ui/Capsule'
import s from './TaskAllocation.modules.scss'
import { Grid, Typography } from '@mui/material'

const TaskSummary = item => {
  const {
    department,
    taskName,
    estimateStartTime,
    estimateEndTime,
    prodStandardValue,
    prodStandardUM,
    priority
  } = item.item

  const estimateTime = `${estimateStartTime} - ${estimateEndTime}`
  const prodStandard = `${prodStandardValue} ${prodStandardUM.name}`

  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Typography className={s.departmentName} fontWeight={700}>
          {department.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={s.taskName} fontWeight={700}>
          {taskName}
        </Typography>
      </Grid>

      <Grid container>
        <Grid item mt={1} mr={1}>
          <Capsule label="Timp estimat" value={estimateTime} />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="Volum" value={prodStandard} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Angajari repartizati" value={'0'} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Prioritate" value={priority} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TaskSummary
