import { Grid, Container, Box } from '@mui/material'
import { Button, Table, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'
import { columns, rows } from './helpers'

const ApproveTruck = () => {
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        Cod Suport
      </Typography>
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Table
                columns={columns}
                isLoading={false}
                rows={rows}
                disablePagination={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Box className={cs.buttonWrapper}>
                <Button
                  type='button'
                  variant='contained'
                  label='CONFIRMĂ AMBALAJE'
                  onClick={null}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ApproveTruck
