import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { EmployeeActionsProps } from '../../TaskAllocationsDefinitions'
import { PlayArrow, Pause, Stop } from '@mui/icons-material'
import { TASK_STATUS_ACTIONS } from '../constants'

const EmployeeActions = (props: EmployeeActionsProps) => {
  const { taskCurrentState, updateTaskStatus, openStopTaskModal } = props

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
      {taskCurrentState.showStartButton && (
        <IconButton
          variant="contained"
          label="Start"
          style={{
            height: '30px',
            width: isMobile ? '100%' : 'auto'
          }}
          startIcon={<PlayArrow />}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            updateTaskStatus(TASK_STATUS_ACTIONS.START)
          }}
        />
      )}
      {taskCurrentState.showPauseButton && (
        <IconButton
          variant="contained"
          label="Pauza"
          style={{
            height: '30px',
            width: isMobile ? '100%' : 'auto'
          }}
          startIcon={<Pause />}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            updateTaskStatus(TASK_STATUS_ACTIONS.PAUSE)
          }}
        />
      )}
      {taskCurrentState.showResumeButton && (
        <IconButton
          variant="contained"
          label="Continua"
          style={{
            height: '30px',
            width: isMobile ? '100%' : 'auto'
          }}
          startIcon={<PlayArrow />}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            updateTaskStatus(TASK_STATUS_ACTIONS.RESUME)
          }}
        />
      )}
      {taskCurrentState.showStopButton && (
        <IconButton
          variant="contained"
          label="Stop"
          style={{
            height: '30px',
            width: isMobile ? '100%' : 'auto',
            marginLeft: '12px'
          }}
          startIcon={<Stop />}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            openStopTaskModal()
          }}
        />
      )}
    </Box>
  )
}

export default EmployeeActions
