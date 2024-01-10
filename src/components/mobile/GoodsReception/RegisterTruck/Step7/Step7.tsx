import { Grid, Container, Paper, Box } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'

const Step7 = () => {
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='ÎNREGISTREAZǍ CAMION' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className={cs.buttonWrapper}>
                <Button
                  type='button'
                  variant='contained'
                  label='CAMION GOL'
                  onClick={null}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box className={cs.buttonWrapper}>
              <Button
                type='button'
                variant='contained'
                label='RESIGILEAZĂ CAMION'
                onClick={null}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={cs.buttonWrapper}>
              <Button
                type='button'
                variant='contained'
                label='RETUR AMBALAJE'
                onClick={null}
                disabled
              />
            </Box>
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
