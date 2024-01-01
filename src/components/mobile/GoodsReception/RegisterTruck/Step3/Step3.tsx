import { Grid, Container, Paper, Divider, Box } from '@mui/material'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'

const Step3 = () => {

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='ÎNREGISTREAZǍ CAMION' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
            <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>
            <Typography variant='medium' component='p'>Destinație: Hub Deva Abient</Typography>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Input
            type='text'
            label='Scanează tip ambalaj'
            variant='standard'
            width='100%'
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <ManageSearchIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            SAU
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <Box className={cs.buttonWrapper}>
            <Button
              type='button'
              variant='contained'
              label='SCANEAZǍ TIP AMBALAJ'
              onClick={null}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Input
            type='text'
            label='Tip ambalaj'
            variant='standard'
            width='100%'
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type='text'
            label='Număr ambalaje'
            variant='standard'
            width='100%'
          />
        </Grid>
        <Grid item xs={12}>
          <Box className={cs.buttonWrapper}>
            <Button
              type='button'
              variant='contained'
              label='PASUL URMǍTOR'
              onClick={null}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Step3
