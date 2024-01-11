import { Capsule } from 'components/core-ui/Capsule'
import s from './TaskAllocation.modules.scss'
import { Grid, Typography } from '@mui/material'

const TaskSummary = item => {
  // TODO: To add type when db schema is defined
  const {
    rayonsOrDepartment,
    taskName,
    recommendedInterval,
    standardProductivity,
    priority,
    frequency,
    allocatedWorkers,
    totalWorkload,
    completedWorkload,
    inProgressWorkload,
    remainingWorkload
  } = item.item

  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Typography className={s.departmentName} fontWeight={700}>
          {rayonsOrDepartment}
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
          <Capsule label="Frecventa" value={frequency} />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="Interval recomandat" value={recommendedInterval} />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="Productivitate standard" value={standardProductivity} />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="Volum total" value={totalWorkload} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Volum efectuat" value={completedWorkload} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Volum in lucru" value={inProgressWorkload} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Volum ramas" value={remainingWorkload} />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="UM" value={standardProductivity} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Angajari repartizati" value={allocatedWorkers} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TaskSummary
