import { Grid, Paper, Typography } from '@mui/material'
import { TitleHeader } from '../../TitleHeader'
import { useParams } from 'react-router-dom'
import s from '../../CommonStyles.modules.scss'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'

const PackagingDisputesTimerDetail = () => {
  const { id } = useParams()
  return <Grid container spacing={2}>
    <Grid xs={12} item>
      <TitleHeader title={`Editează timer FIRST_TYPE (${id})`} />
    </Grid>
    <Grid item xs={12}>
      <Paper className={s.filterPaper}>
        <Grid container spacing={4}>
          <Grid xs={12} item>
            <Typography variant='h6'>
              Tip timer
            </Typography>
            <Typography variant='body1'>
              A doua notificare
              Descrirere timer the second final notification in which the store is notified that the litigation task in the system has been automatically closed and that it will be charged the difference.
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <Input
              type='number'
              onChange={event => null}
              label='Valoare timer'
              variant='outlined'
              style={{ width: '100%' }}
              value="2"
            />
          </Grid>
          <Grid xs={12} item>
            <Button variant="contained" label="Salvează" onClick={null} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>
}

export default PackagingDisputesTimerDetail