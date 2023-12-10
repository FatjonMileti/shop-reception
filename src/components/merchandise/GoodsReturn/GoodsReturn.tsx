import { Grid, Container, Paper } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from './GoodsReturn.modules.scss'
import cs from '../Common.modules.scss'
import { URLS } from '../constants'
import useRoles from '../useRoles'
import { useNavigate } from 'react-router-dom'
import TitleHeader from '../TitleHeader/TitleHeader'

const GoodsReturn = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  const navigate = useNavigate()

  return (
    <Paper className={s.paper}>
      <Container component='main' maxWidth='xs' className={cs.container}>
        <TitleHeader />
        <form>
          <Grid container spacing={2} className={cs.wrapper}>
            {isShopUser && <>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='COMANDǍ CAMION RETUR'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_ORDER_RETURN_TRUCK)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='CAMIOANE RETUR CONFIRMATE'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_CONFIRM_RETURN_TRUCKS)
                  }}
                />
              </Grid>
            </>}
            {isHubUser && <>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='RETURURI AȘTEPTATE'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_EXPECTED_RETURNS)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='RETUR ÎN CURS DE RECEPȚIE'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_IN_PROGRESS_RETURN)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='ÎNREGISTRARE RETUR'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_RECORD_RETURN)
                  }}
                />
              </Grid>
            </>}
            {(isShopUser || isHubUser) && <Grid item xs={12}>
              <Button
                type='button'
                variant='contained'
                label='CONTINUARE RETUR'
                style={{ width: '100%' }}
                onClick={() => {
                  navigate(URLS.AUTH_CONTINUE_RETURN)
                }}
              />
            </Grid>}
          </Grid>
        </form>
      </Container>
    </Paper>
  )
}

export default GoodsReturn
