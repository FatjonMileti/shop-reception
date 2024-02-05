import { TASK_STATUS } from './constants'

// TODO: To add type when db schema is defined
export const getTaskCurrentState = employee => {
  const isTaskNotStarted = employee.timerStatus === TASK_STATUS.NOT_STARTED
  const isTaskStarted = [TASK_STATUS.IN_PROGRESS, TASK_STATUS.PAUSED, TASK_STATUS.RESUMED].includes(
    employee.timerStatus
  )
  const isTaskEnded = employee.timerStatus === TASK_STATUS.FINISHED
  const isTaskPaused = employee.timerStatus === TASK_STATUS.PAUSED

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
