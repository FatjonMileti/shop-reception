import { Grid } from '../../../../Common/Grid'
import { Button, Table } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { columns, rows } from './helpers'

const SupportScanStep2 = () => {
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='Cod Suport' />,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
        />,
        <Button
          type='button'
          variant='contained'
          label='CONFIRMĂ AMBALAJE'
          onClick={null}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default SupportScanStep2
