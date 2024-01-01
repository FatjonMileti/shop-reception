import { Grid, Container, Box } from '@mui/material'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'

const Step6 = () => {

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
                label='Număr sigiliu'
                variant='standard'
                width='100%'
              />
            </Grid>
            <Grid item xs={12}>
              <Box className={cs.buttonWrapper}>
                <Button
                  type='button'
                  variant='contained'
                  label='ADAUGĂ ALT SIGILIU'
                  onClick={null}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className={cs.buttonWrapper}>
                <Button
                  type='button'
                  variant='contained'
                  label='FINALIZEAZǍ'
                  onClick={null}
                  disabled
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Step6
