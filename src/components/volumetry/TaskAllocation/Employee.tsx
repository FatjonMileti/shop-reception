import { Box, Grid, LinearProgress } from '@mui/material'
import s from './TaskAllocation.modules.scss'
import { ChatIcon, EmployeeIcon } from 'icons'
import { Capsule } from 'components/core-ui/Capsule'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { useEffect, useMemo, useState } from 'react'
import { getCapsuleColor } from './helpers'
import { makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { useNotification } from 'hooks'
import { EditAllocationModal } from './EditAllocationModal'
import { handleQueryError } from '../utils'

interface EmployeeProps {
  employee: any // TODO: To add type when db schema is defined
  task: any // TODO: To add type when db schema is defined
  setShouldRefreshData: Function
  setSelectedRowId: Function
  hideDetails?: boolean
}

const Employee: React.FC<EmployeeProps> = props => {
  const { employee, task, setShouldRefreshData, setSelectedRowId, hideDetails } = props
  console.log(props)
  const { showNotification } = useNotification()
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

  const taskCurrentState = useMemo(() => {
    const isTaskStarted = employee.timerStatus === 'IN_PROGRESS'
    const isTaskEnded = employee.timerStatus === 'FINISHED'

    const showStartButton = !isTaskStarted && !isTaskEnded
    const showStopButton = isTaskStarted && !isTaskEnded

    return { isTaskStarted, isTaskEnded, showStartButton, showStopButton }
  }, [employee.timerStatus])

  const customCapsuleColors = getCapsuleColor(
    taskCurrentState.isTaskStarted,
    taskCurrentState.isTaskEnded,
    employee.progressProportion > 100
  )

  const [isOpenStopTaskModal, setIsOpenStopTaskModal] = useState<boolean>(false)

  const openStopTaskModal = () => {
    setIsOpenStopTaskModal(true)
  }

  const closeStopTaskModal = () => {
    setIsOpenStopTaskModal(false)
  }

  const submitStartTask = async () => {
    await makeCorePutRequest(`/volumetry/tasks/${employee.id}`, {
      action: 'START'
    })
    setSelectedRowId(task.taskTemplateId)
    setShouldRefreshData(true)
  }

  const { isLoading, mutate: handleStartTask } = useMutation(submitStartTask, {
    onSuccess: res => {
      showNotification({
        message: `Taskul a fost inceput cu succes!`,
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la inceperea taskului.', showNotification)
  })

  return (
    <Box>
      {hideDetails ? (
        <>
          <Grid container spacing={4}>
            <Grid item sm={12} md={4}>
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
            </Grid>

            <Grid item sm={12} md={6}>
              {taskCurrentState.isTaskEnded ? (
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
                      color={customCapsuleColors.progress as 'error' | 'success'}
                    />
                  </Box>
                  <Box sx={{ alignSelf: 'center' }}>
                    <span
                      className={s.employeeProgress}
                      style={{ background: customCapsuleColors.value }}
                    >
                      {employee.progressProportion}%
                    </span>
                  </Box>
                </Box>
              ) : (
                <></>
              )}
            </Grid>

            <Grid item sm={12} md={2}>
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
            </Grid>
          </Grid>
          <EditAllocationModal
            isModalOpen={isOpenStopTaskModal}
            closeModal={closeStopTaskModal}
            employee={employee}
            task={task}
            setShouldRefreshData={setShouldRefreshData}
            setSelectedRowId={setSelectedRowId}
            hideWorkload
          />
        </>
      ) : (
        <>
          <Grid container spacing={4}>
            <Grid item sm={12} md={2}>
              <Box className={s.employeeInfo}>
                <EmployeeIcon />
                <p className={s.employeeName}>{employee.workerFullName}</p>
              </Box>
            </Grid>

            <Grid item sm={12} md={3}>
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
            </Grid>

            <Grid item sm={12} md={5}>
              {taskCurrentState.isTaskEnded ? (
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
                      color={customCapsuleColors.progress as 'error' | 'success'}
                    />
                  </Box>
                  <Box sx={{ alignSelf: 'center' }}>
                    <span
                      className={s.employeeProgress}
                      style={{ background: customCapsuleColors.value }}
                    >
                      {employee.progressProportion}%
                    </span>
                  </Box>
                </Box>
              ) : (
                <></>
              )}
            </Grid>

            <Grid item sm={12} md={2}>
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
            </Grid>
          </Grid>
          <EditAllocationModal
            isModalOpen={isOpenStopTaskModal}
            closeModal={closeStopTaskModal}
            employee={employee}
            task={task}
            setShouldRefreshData={setShouldRefreshData}
            setSelectedRowId={setSelectedRowId}
          />
        </>
      )}
    </Box>
  )
}

export default Employee
