import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import { columns } from './helpers'
import s from '../../../../commonStyles.modules.scss'

const StatusTraceability = ({ traceabilityReturnTruck }) => {
  return (
    <BasicTable
      columns={columns}
      rows={traceabilityReturnTruck}
      containerProps={{
        className: s.table
      }}
    />
  )
}

export default StatusTraceability
