import { Box, Tooltip } from '@mui/material'
import { Capsule } from 'components/core-ui/Capsule'
import s from '../../TaskAllocations.modules.scss'
import { EmployeeCapsuleProps } from '../../TaskAllocationsDefinitions'
import { HistoryOutlined } from '@mui/icons-material'
import { formatUIDate, isDayInThePast } from 'utils/helpers'

const EmployeeCapsule = (props: EmployeeCapsuleProps) => {
  const { employee, customCapsuleColors } = props

  return (
    <Box className={s.capsules}>
      <Capsule
        label="Interval orar"
        value={employee.timeInterval}
        labelColor={customCapsuleColors.label}
        valueColor={customCapsuleColors.value}
      >
        {isDayInThePast(employee.createdAt) && (
          <Tooltip title={`Taskul a fost creat in data de: ${formatUIDate(employee.createdAt)}`}>
            <HistoryOutlined className={s.historyIcon} />
          </Tooltip>
        )}
      </Capsule>
      <Capsule
        label="Volum"
        value={employee.workload}
        labelColor={customCapsuleColors.label}
        valueColor={customCapsuleColors.value}
      />
    </Box>
  )
}
export default EmployeeCapsule
