import s from '../../../../../commonStyles.modules.scss'
import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import { columns } from './helpers'

const TruckSupport = (truck) => {
  return (
    <BasicTable
      columns={columns}
      rows={truck?.truck?.supportList || []}
      containerProps={{
        className: s.table
      }}
    />
  )
}

export default TruckSupport
