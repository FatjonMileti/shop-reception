import { Grid, Container } from '@mui/material'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'

const Step1 = () => {

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        ÎNREGISTREAZǍ CAMION
      </Typography>
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type='text'
                label='Număr aviz'
                variant='standard'
                width='100%'
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type='text'
                label='Număr stive'
                variant='standard'
                width='100%'
              />
            </Grid>
            <Grid item xs={10}>
              <Input
                type='text'
                label='Număr sigiliu'
                variant='standard'
                width='100%'
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton>
                <CameraIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
                <Button
                  type='button'
                  variant='contained'
                  label='ADAUGĂ ALT SIGILIU'
                  onClick={() => null}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
                <Button
                  type='button'
                  variant='contained'
                  label='FINALIZEAZǍ'
                  onClick={() => null}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Step1
