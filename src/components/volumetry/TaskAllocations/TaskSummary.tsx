import { Capsule } from 'components/core-ui/Capsule'
import s from './TaskAllocations.modules.scss'
import { Grid, Typography } from '@mui/material'
import { PriorityColors, getPriority } from './helpers'
import { useMemo } from 'react'

const TaskSummary = ({ item, hideDetails = false }) => {
  // TODO: To add type when db schema is defined
  const {
    departmentAlias,
    taskName,
    recommendedInterval,
    standardProductivity,
    priorityValue,
    frequency,
    allocatedWorkers,
    totalWorkload,
    completedWorkload,
    inProgressWorkload,
    remainingWorkload,
    workloadMeasurementUnit
  } = item

  const priorityId = useMemo(() => getPriority(priorityValue), [priorityValue])

  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Typography className={s.departmentName} fontWeight={700}>
          {departmentAlias}
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
            value={priorityValue}
            valueColor={PriorityColors[priorityId - 1].value}
            labelColor={PriorityColors[priorityId - 1].label}
          />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="Frecventa" value={frequency} />
        </Grid>

        <Grid item mt={1} mr={1}>
          <Capsule label="Interval recomandat" value={recommendedInterval} />
        </Grid>

        {!hideDetails && (
          <>
            <Grid item mt={1} mr={1}>
              <Capsule label="Productivitate standard" value={standardProductivity} />
            </Grid>

            <Grid item mt={1} mr={1}>
              <Capsule
                label="Volum total"
                value={totalWorkload}
                valueColor={'#004f9b'}
                labelColor={'#d9e5f0'}
              />
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
              <Capsule label="UM" value={workloadMeasurementUnit} />
            </Grid>
            <Grid item mt={1} mr={1}>
              <Capsule label="Angajati repartizati" value={allocatedWorkers} />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default TaskSummary
