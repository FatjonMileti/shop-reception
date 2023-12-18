import { Grid, Container, Paper } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from './GoodsReception.modules.scss'
import cs from '../Common.modules.scss'
import { URLS } from '../constants'
import useRoles from '../useRoles'
import { useNavigate } from 'react-router-dom'
import { TitleHeader } from '../TitleHeader'

const GoodsReception = () => {
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
                  label='LISTǍ CAMIOANE'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_LIST_TRUCKS)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='VALIDARE LIVRARE'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_DELIVERY)
                  }}
                />
              </Grid>
            </>}
            {(isShopUser || isHubUser) && <Grid item xs={12}>
              <Button
                type='button'
                variant='contained'
                label='ÎN PROCESARE RECEPȚIE'
                style={{ width: '100%' }}
                onClick={() => {
                  navigate(URLS.AUTH_RECEPTION_PROCESSING)
                }}
              />
            </Grid>}
            {isHubUser && <>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='CAMIOANE AȘTEPTATE'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_EXPECTED_TRUCKS)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='ÎNREGISTREAZǍ CAMION'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_REGISTER_TRUCK)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <Button
                type='button'
                variant='contained'
                label='ÎN PROCESARE EXPEDIȚIE'
                style={{ width: '100%' }}
                onClick={() => {
                  navigate(URLS.AUTH_PROCESSING_SHIPMENT)
                }}
              />
            </Grid>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='contained'
                  label='CAMIOANE EXPEDIATE'
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate(URLS.AUTH_SHIPPED_TRUCKS)
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

export default GoodsReception
