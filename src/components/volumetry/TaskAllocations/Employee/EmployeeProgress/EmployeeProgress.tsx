import { Box, LinearProgress } from '@mui/material'
import s from '../../TaskAllocations.modules.scss'
import { ChatIcon } from 'icons'
import { EmployeeProgressProps } from '../../TaskAllocationsDefinitions'

const EmployeeProgress = (props: EmployeeProgressProps) => {
  const { taskCurrentState, employee, customCapsuleColors } = props

  return taskCurrentState.isTaskEnded ? (
    <Box className={s.message}>
      {employee.comment && <ChatIcon />}
      <Box className={s.customText}>{employee.comment || 'Finalizat'}</Box>
    </Box>
  ) : taskCurrentState.isTaskStarted ? (
    <Box className={s.progressBarContainer}>
      <Box mr={1} style={{ width: '100%' }}>
        <LinearProgress
          variant="determinate"
          value={employee.progressProportion > 100 ? 100 : employee.progressProportion}
          color={customCapsuleColors.progress as 'error' | 'success' | 'warning'}
        />
      </Box>
      <Box sx={{ alignSelf: 'center' }}>
        <span className={s.employeeProgress} style={{ background: customCapsuleColors.value }}>
          {employee.progressProportion}%
        </span>
      </Box>
    </Box>
  ) : (
    <></>
  )
}

export default EmployeeProgress
