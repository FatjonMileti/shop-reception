import { Grid, Container, Paper } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from './Home.modules.scss'
import { URLS } from '../constants'
import { useNavigate } from 'react-router-dom'
import useRoles from '../useRoles'
import TitleHeader from '../TitleHeader/TitleHeader'

const Home = () => {
  const navigate = useNavigate()
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()

  return (
    <Paper className={s.paper}>
      <Container component='main' maxWidth='xs' className={s.container}>
        <TitleHeader />
        <form>
          <Grid container spacing={2} className={s.wrapper}>
            {(isShopUser || isHubUser) && <>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='RECEPȚIE MARFǍ'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_GOODS_RECEPTION)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='RETUR AMBALAJE/MARFǍ'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_GOODS_RETURN)
                  }}
                />
              </Grid>
            </>}
            {isShopUser && <Grid item xs={12}>
              <Button
                type='button'
                variant='contained'
                label='ACTUALIZARE INVENTAR AMBALAJE'
                style={{ width: '100%' }}
                onClick={() => {
                  navigate(URLS.AUTH_PACKAGING_INVENTORY_UPDATE)
                }}
              />
            </Grid>}
            {isWareHouseUser && <>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='RETURURI AŞTEPTATE'
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
            </>}
          </Grid>
        </form>
      </Container>
    </Paper>
  )
}

export default Home
