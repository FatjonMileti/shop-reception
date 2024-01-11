import { Grid, Container, Paper } from '@mui/material'
import { Button, Input, Typography, IconButton, Table } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'
import { columns } from './helpers'

const rows = [
  {
    id: 'POL', title: 'POLITA ROLLS FLORI', amount: (
      <Input
        type='text'
        variant='standard'
        width='100%'
        value='0'
      />
    ), action: (
      <IconButton>
        <CameraIcon />
      </IconButton>
    )
  },
  {
    id: 'IND', title: 'PALET INDUSTRIAL/ATI PIC 100x120', amount: (
      <Input
        type='text'
        variant='standard'
        width='100%'
        value='0'
      />
    ), action: (
      <IconButton>
        <CameraIcon />
      </IconButton>
    )
  }
]

const ExpectedReturnDetailStep3 = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='RETURURI AȘTEPTATE CAMION' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='medium' component='p'>IF32KTL / ABCD</Typography>
              <Typography variant='medium' component='p'>ORADEA2 (25)</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='medium' component='h4'>Recepție retur</Typography>
            </Grid>
            <Grid item xs={12}>
              <Table
                columns={columns}
                isLoading={false}
                rows={rows}
                disablePagination={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type='select'
                label='Adaugă ambalaj'
                variant='standard'
                width='100%'
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ marginTop: '20px' }} spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button
                    type='button'
                    variant='contained'
                    label='SUMAR CAMION'
                    onClick={() => {
                      navigate(URLS.AUTH_EXPECTED_RETURN_DETAIL_FINAL)
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ExpectedReturnDetailStep3
