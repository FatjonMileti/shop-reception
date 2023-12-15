import { Grid, Container, Paper } from '@mui/material'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'

const Step7 = () => {

  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        ÎNREGISTREAZǍ CAMION
      </Typography>
      <Grid container spacing={2} className={s.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
                <Button
                  type='button'
                  variant='contained'
                  label='CAMION GOL'
                  onClick={() => null}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
              <Button
                type='button'
                variant='contained'
                label='RESIGILEAZĂ CAMION'
                onClick={() => null}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
              <Button
                type='button'
                variant='contained'
                label='RETUR AMBALAJE'
                onClick={() => null}
                disabled
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ marginTop: '30px', padding: '20px' }}>
              <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>
              <Typography variant='medium' component='p'>Numǎr suporți scanați: 1</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Step7
