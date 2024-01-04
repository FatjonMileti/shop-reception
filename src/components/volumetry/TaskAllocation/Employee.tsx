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
}

const Employee: React.FC<EmployeeProps> = props => {
  const { employee, task, setShouldRefreshData } = props
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
    const isTaskStarted = employee.startTime.isStarted
    const isTaskEnded = employee.endTime.isEnded

    const showStartButton = !isTaskStarted && !isTaskEnded
    const showStopButton = isTaskStarted && !isTaskEnded

    return { isTaskStarted, isTaskEnded, showStartButton, showStopButton }
  }, [employee.startTime.isStarted, employee.endTime.isEnded])

  const customCapsuleColors = getCapsuleColor(
    taskCurrentState.isTaskStarted,
    taskCurrentState.isTaskEnded,
    employee.isOverdue
  )

  const [isOpenStopTaskModal, setIsOpenStopTaskModal] = useState<boolean>(false)

  const openStopTaskModal = () => {
    setIsOpenStopTaskModal(true)
  }

  const closeStopTaskModal = () => {
    setIsOpenStopTaskModal(false)
  }

  const submitStartTask = async () => {
    await makeCorePutRequest(`/volumetry/taskAllocation/start/${task.id}`, {
      isStarted: true
    })
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
      <Grid container className={s.employeeInfo}>
        <Grid item xs={12} md={2} sx={{ display: 'flex' }}>
          <EmployeeIcon />
          <p className={s.employeeName}>{employee.employee.name}</p>
        </Grid>

        <Grid item xs={12} md={5.4} className={s.capsules}>
          <Capsule
            label={employee.startTime.isStarted ? 'Ora de inceput' : 'Ora recomandata de inceput'}
            value={employee.startTime.time}
            labelColor={customCapsuleColors.label}
            valueColor={customCapsuleColors.value}
          />
          <Capsule
            label={employee.endTime.isEnded ? 'Ora de final' : 'Ora recomandata de final'}
            value={employee.endTime.time}
            labelColor={customCapsuleColors.label}
            valueColor={customCapsuleColors.value}
          />
          <Capsule
            label={'Volum'}
            value={`${employee.volume.value}${employee.volume.measureUnit}`}
            labelColor={customCapsuleColors.label}
            valueColor={customCapsuleColors.value}
          />
        </Grid>

        <Grid item xs={12} md={2} sx={{ display: 'flex' }}>
          {employee.customText ? (
            <Grid container>
              <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <ChatIcon />
              </Grid>

              <Grid item xs={11} className={s.customText}>
                {employee.customText}
              </Grid>
            </Grid>
          ) : !taskCurrentState.isTaskStarted && !taskCurrentState.isTaskEnded ? (
            <></>
          ) : (
            <Grid container>
              <Grid item xs={9} mr={1} sx={{ alignSelf: 'center' }}>
                <LinearProgress
                  variant="determinate"
                  value={employee.progress}
                  color={customCapsuleColors.progress as 'error' | 'success'}
                />
              </Grid>
              <Grid item xs={2} sx={{ alignSelf: 'center' }}>
                <span
                  className={s.employeeProgress}
                  style={{ background: customCapsuleColors.value }}
                >
                  {employee.progress}%
                </span>
              </Grid>
            </Grid>
          )}
        </Grid>

        {(taskCurrentState.showStartButton || taskCurrentState.showStopButton) && (
          <Grid item xs={12} md={2} className={s.actionButtonContainer}>
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
          </Grid>
        )}
      </Grid>
      <EditAllocationModal
        isModalOpen={isOpenStopTaskModal}
        closeModal={closeStopTaskModal}
        employee={employee}
        task={task}
        setShouldRefreshData={setShouldRefreshData}
      />
    </Box>
  )
}

export default Employee
