import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { EmployeeActionsProps } from '../../TaskAllocationsDefinitions'

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
        <Button
          variant="contained"
          label="Start"
          style={{
            height: '30px',
            width: isMobile ? '100%' : 'auto'
          }}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            updateTaskStatus('START')
          }}
        />
      )}
      {taskCurrentState.showPauseButton && (
        <Button
          variant="contained"
          label="Pause"
          style={{
            height: '30px',
            width: isMobile ? '100%' : 'auto'
          }}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            updateTaskStatus('PAUSE')
          }}
        />
      )}
      {taskCurrentState.showResumeButton && (
        <Button
          variant="contained"
          label="Resume"
          style={{
            height: '30px',
            width: isMobile ? '100%' : 'auto'
          }}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            updateTaskStatus('RESUME')
          }}
        />
      )}
      {taskCurrentState.showStopButton && (
        <Button
          variant="contained"
          label="Stop"
          style={{
            height: '30px',
            width: isMobile ? '100%' : 'auto',
            marginLeft: '12px'
          }}
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
