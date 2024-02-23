import { Box } from '@mui/material'
import { Capsule } from 'components/core-ui/Capsule'
import s from '../../TaskAllocations.modules.scss'
import { EmployeeCapsuleProps } from '../../TaskAllocationsDefinitions'

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
        label={'Volum alocat'}
        value={`${employee.allocatedWorkload}`}
        labelColor={customCapsuleColors.label}
        valueColor={customCapsuleColors.value}
      />
      <Capsule
        label={'Volum efectuat'}
        value={`${employee.performedWorkload}`}
        labelColor={customCapsuleColors.label}
        valueColor={customCapsuleColors.value}
      />
    </Box>
  )
}
export default EmployeeCapsule
