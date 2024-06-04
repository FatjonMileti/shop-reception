import { Grid, Typography } from '@mui/material'
import s from './NoticeSummary.modules.scss'
import { Capsule } from 'components/core-ui/Capsule'

const NoticeSummary = ({ item }) => {
  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Typography className={s.hubName} fontWeight={700}>
          {item.hubName}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={s.hubNoticeNumber} fontWeight={700}>
          {item.hubNoticeNumber}
        </Typography>
      </Grid>
      <Grid container>
        <Grid item mt={1} mr={1}>
          <Capsule label="Data incarcare" value={item.loadingDoneDate} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Nume sofer hub" value={item.driverName} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Numar inmatriculare" value={item.truckNumber} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Depozit/Furnizor" value={item.depositName} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NoticeSummary
