import { Grid, Typography } from '@mui/material'
import { Icon_v2 } from 'components/core-ui/Icon_v2'
import s from '../Tasks.modules.scss'

interface TaskSummaryProps {
  item: any
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ item }) => {
  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Typography className={s.productName} fontWeight={700}>
          {item.productName}
        </Typography>
      </Grid>
      <Grid item className={s.date}>
        <Typography display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Icon_v2 iconName="Date" iconType="Icon"></Icon_v2> {item.date}, {item.interval}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default TaskSummary
