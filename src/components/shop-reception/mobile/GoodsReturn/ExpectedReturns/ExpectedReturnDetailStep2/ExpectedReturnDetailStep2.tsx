import { Grid } from '../../../../Common/Grid'
import { Button, Input, Typography, Table } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'
import { columns } from './helpers'

const rows = [
  {
    store: 'ORADEA2', number: (
      <Input
        type='text'
        variant='standard'
        width='100%'
        value='0'
      />
    )
  }
]

const ExpectedReturnDetailStep2 = () => {
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
        <Typography variant='medium' component='h4'>Descărcare stive</Typography>,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
        />,
        <Button
          type='button'
          variant='contained'
          label='PASUL URMĂTOR'
          onClick={() => {
            navigate(URLS.AUTH_EXPECTED_RETURN_DETAIL_STEP_3)
          }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default ExpectedReturnDetailStep2
