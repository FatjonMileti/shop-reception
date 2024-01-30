import { Grid } from '../../../../Common/Grid'
import { Button, Input, Typography, IconButton, Table } from '@fullscreendigital/carrefour-dex-fe'
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
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='RETURURI AȘTEPTATE CAMION' />,
        <>
          <Typography variant='medium' component='p'>IF32KTL / ABCD</Typography>
          <Typography variant='medium' component='p'>ORADEA2 (25)</Typography>
        </>,
        <Typography variant='medium' component='h4'>Recepție retur</Typography>,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
        />,
        <Input
          type='select'
          label='Adaugă ambalaj'
          variant='standard'
          width='100%'
        />,
        <Button
          type='button'
          variant='contained'
          label='SUMAR CAMION'
          onClick={() => {
            navigate(URLS.AUTH_EXPECTED_RETURN_DETAIL_FINAL)
          }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default ExpectedReturnDetailStep3
