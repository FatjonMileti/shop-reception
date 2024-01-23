import { Box } from '@mui/material'
import { Capsule } from 'components/core-ui/Capsule'
import s from '../../TaskAllocation.modules.scss'
import { EmployeeCapsuleProps } from '../../TaskAllocationDefinitions'

const EmployeeCapsule = (props: EmployeeCapsuleProps) => {
  const { employee, customCapsuleColors } = props

  return (
    <Box className={s.capsules}>
      <Capsule
        label={'Interval orar'}
        value={employee.timeInterval}
        labelColor={customCapsuleColors.label}
        valueColor={customCapsuleColors.value}
      />
      <Capsule
        label={'Volum'}
        value={`${employee.workload}`}
        labelColor={customCapsuleColors.label}
        valueColor={customCapsuleColors.value}
      />
    </Box>
  )
}
export default EmployeeCapsule
