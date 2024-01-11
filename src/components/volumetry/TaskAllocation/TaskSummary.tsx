import { Capsule } from 'components/core-ui/Capsule'
import s from './TaskAllocation.modules.scss'
import { Grid, Typography } from '@mui/material'

const TaskSummary = item => {
  // TODO: To add type when db schema is defined
  const {
    department,
    taskName,
    estimateStartTime,
    estimateEndTime,
    prodStandardValue,
    prodStandardUM,
    priority,
    frequency,
    volume,
    assignedEmployee
  } = item.item

  const estimateTime = `${estimateStartTime} - ${estimateEndTime}`
  const prodStandard = `${prodStandardValue} ${prodStandardUM.name}/${prodStandardUM.unit}`

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
          <Capsule
            label="Prioritate"
            value={priority}
            valueColor={priority === 1 && '#D30D1F'}
            labelColor={priority === 1 && 'rgba(211, 13, 31, 0.15)'}
          />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="Frecventa" value={frequency.name} />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="Interval recomandat" value={estimateTime} />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="Productivitate standard" value={prodStandard} />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="Volum total" value={volume.total} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Volum efectuat" value={volume.performed} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Volum in lucru" value={volume.inProgress} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Volum ramas" value={volume.remaining} />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="UM" value={prodStandardUM.name} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Angajari repartizati" value={assignedEmployee} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TaskSummary
