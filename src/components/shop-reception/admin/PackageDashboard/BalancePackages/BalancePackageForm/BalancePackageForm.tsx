import { Grid, Paper } from '@mui/material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../Common/CommonStyles.modules.scss'
import { TitleHeader } from '../../../Common/TitleHeader'

const BalancePackageForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={s.filterPaper}>
          <TitleHeader title='Actualizare inventar' />
          <Grid container spacing={4}>
            <Grid xs={12} md={6} item>
              <Input
                type='text'
                onChange={event => null}
                label='Magazin'
                variant='outlined'
                style={{ width: '100%' }}
                value={'ORADEA2'}
                disabled
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <Input
                type='text'
                onChange={event => null}
                label='Tip suport'
                variant='outlined'
                style={{ width: '100%' }}
                value={'PALET TIP EURO'}
                disabled
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <Input
                type='number'
                onChange={event => null}
                label='Calitativ'
                variant='outlined'
                style={{ width: '100%' }}
                value={'1'}
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <Input
                type='number'
                onChange={event => null}
                label='Defect'
                variant='outlined'
                style={{ width: '100%' }}
                value={'0'}
              />
            </Grid>
            <Grid xs={12} item>
              <Button
                variant='contained'
                type='submit'
                label='Salvează'
                onClick={null}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default BalancePackageForm