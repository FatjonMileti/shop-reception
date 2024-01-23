import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { EmployeeActionsProps } from '../../TaskAllocationDefinitions'

const EmployeeActions = (props: EmployeeActionsProps) => {
  const { taskCurrentState, handleStartTask, openStopTaskModal } = props

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Box style={{ textAlign: 'right' }}>
      {(taskCurrentState.showStartButton || taskCurrentState.showStopButton) && (
        <Button
          variant="contained"
          label={taskCurrentState.showStartButton ? 'Start' : 'Stop'}
          style={{
            height: '30px',
            width: isMobile ? '100%' : 'auto'
          }}
          onClick={e => {
            if (taskCurrentState.showStartButton) {
              e.preventDefault()
              e.stopPropagation()
              handleStartTask()
            }
            if (!taskCurrentState.showStartButton) {
              e.preventDefault()
              e.stopPropagation()
              openStopTaskModal()
            }
          }}
        />
      )}
    </Box>
  )
}

export default EmployeeActions
