// TODO: To add type when db schema is defined
export const getTaskCurrentState = employee => {
  const isTaskNotStarted = employee.timerStatus === 'NOT_STARTED'
  const isTaskStarted = ['IN_PROGRESS', 'PAUSED', 'RESUMED'].includes(employee.timerStatus)
  const isTaskEnded = employee.timerStatus === 'FINISHED'
  const isTaskPaused = employee.timerStatus === 'PAUSED'

  const showStartButton = isTaskNotStarted
  const showStopButton = isTaskStarted
  const showPauseButton = isTaskStarted && !isTaskPaused
  const showResumeButton = isTaskPaused

  return {
    isTaskStarted,
    isTaskEnded,
    showStartButton,
    showStopButton,
    isTaskPaused,
    showPauseButton,
    showResumeButton
  }
}
