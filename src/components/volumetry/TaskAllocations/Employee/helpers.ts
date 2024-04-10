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

export const getCapsuleColor = (taskCurrentState, isOverdue) => {
  const { isTaskNotStarted, isTaskStarted, isTaskEnded, isTaskPaused } = taskCurrentState

  if (isOverdue) {
    return { label: 'rgba(211, 13, 31, 0.15)', value: '#D30D1F', progress: 'error' }
  }

  if (isTaskNotStarted) {
    return { label: 'rgba(69, 69, 69, 0.15)', value: '#454545' }
  }

  if (isTaskPaused) {
    return { label: 'rgba(255, 179, 0, 0.15)', value: '#FF9900', progress: 'warning' }
  }

  if (isTaskStarted && !isTaskEnded) {
    return { label: 'rgba(51, 105, 30, 0.15)', value: '#33691E', progress: 'success' }
  }

  if (isTaskEnded) {
    return { label: 'rgba(0, 79, 155, 0.15)', value: '#004F9B' }
  }

  return { label: '', value: '' }
}
