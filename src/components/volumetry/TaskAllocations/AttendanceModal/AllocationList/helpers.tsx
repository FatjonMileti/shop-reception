import { Checkbox } from '@fullscreendigital/carrefour-dex-fe'
import { formatTime } from 'utils/helpers'

export const buildColumns = ({ toggleEmployee }: { toggleEmployee: Function }) => [
  {
    title: 'Angajatt',
    field: 'fullName',
    render: (row: any) => (
      <Checkbox
        edge="start"
        checked={row.shouldAllocate}
        onChange={() => toggleEmployee(row)}
        inputProps={{ 'aria-labelledby': `employee-${row.value}` }}
        label={row.fullName}
        style={{ display: 'inline-block', lineHeight: '45px' }}
      />
    )
  },
  {
    title: 'Ora inceput de tura',
    field: 'shiftStart',
    render: (row: any) => (
      <span style={{ display: 'inline-block', lineHeight: '45px' }}>
        {formatTime(row.shiftStart)}
      </span>
    )
  },
  {
    title: 'Ora final de tura',
    field: 'shiftEnd',
    render: (row: any) => <span>{formatTime(row.shiftEnd)}</span>
  }
]
