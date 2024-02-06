import { useMemo, useState } from 'react'
import { Box, Grid } from '@mui/material'
import s from '../TaskAllocations.modules.scss'
import { getCapsuleColor } from '../helpers'
import { makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { useNotification } from 'hooks'
import { EditAllocationModal } from '../EditAllocationModal'
import { handleQueryError } from '../../utils'
import { EmployeeCapsule } from './EmployeeCapsule'
import { EmployeeProgress } from './EmployeeProgress'
import { EmployeeActions } from './EmployeeActions'
import { EmployeeProps } from '../TaskAllocationsDefinitions'
import { EmployeeIcon } from 'icons'

const Employee: React.FC<EmployeeProps> = props => {
  const { employee, task, setShouldRefreshData, setSelectedRowId, hideDetails } = props

  const { showNotification } = useNotification()

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
              <EmployeeCapsule employee={employee} customCapsuleColors={customCapsuleColors} />
            </Grid>

            <Grid item sm={12} md={6}>
              <EmployeeProgress
                taskCurrentState={taskCurrentState}
                employee={employee}
                customCapsuleColors={customCapsuleColors}
              />
            </Grid>

            <Grid item sm={12} md={2}>
              <EmployeeActions
                taskCurrentState={taskCurrentState}
                handleStartTask={handleStartTask}
                openStopTaskModal={openStopTaskModal}
              />
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
              <EmployeeCapsule employee={employee} customCapsuleColors={customCapsuleColors} />
            </Grid>

            <Grid item sm={12} md={5}>
              <EmployeeProgress
                taskCurrentState={taskCurrentState}
                employee={employee}
                customCapsuleColors={customCapsuleColors}
              />
            </Grid>

            <Grid item sm={12} md={2}>
              <EmployeeActions
                taskCurrentState={taskCurrentState}
                handleStartTask={handleStartTask}
                openStopTaskModal={openStopTaskModal}
              />
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
