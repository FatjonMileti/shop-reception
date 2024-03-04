import { useMemo, useState } from 'react'
import { Box, Grid, useMediaQuery } from '@mui/material'
import s from '../TaskAllocations.modules.scss'
import { getCapsuleColor } from '../helpers'
import { makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { useNotification } from 'hooks'
import { EditAllocationModal } from '../EditAllocationModal'
import { handleQueryError } from 'utils/helpers'
import { EmployeeCapsule } from './EmployeeCapsule'
import { EmployeeProgress } from './EmployeeProgress'
import { EmployeeActions } from './EmployeeActions'
import { EmployeeProps } from '../TaskAllocationsDefinitions'
import { EmployeeIcon } from 'icons'
import { getTaskCurrentState } from './helpers'

const Employee: React.FC<EmployeeProps> = props => {
  const { employee, task, setShouldRefreshData, setSelectedRowId, hideDetails } = props

  const { showNotification } = useNotification()

  const taskCurrentState = useMemo(() => getTaskCurrentState(employee), [employee.timerStatus])

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

  const submitStartTask = async status => {
    await makeCorePutRequest(`/volumetry/tasks/${employee.id}`, {
      action: status
    })
    setSelectedRowId(task.taskTemplateId)
    setShouldRefreshData(true)
  }

  const { isLoading, mutate: updateTaskStatus } = useMutation(submitStartTask, {
    onSuccess: res => {
      showNotification({
        message: `Statusul task-ului a fost salvat cu succes.`,
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(
        error,
        'A aparut o eroare la schimbarea statusului taskului.',
        showNotification
      )
  })
  const shouldWrapActions = useMediaQuery('(min-width:1145px)')

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

            <Grid item sm={12} md={shouldWrapActions ? 12 : 2}>
              <EmployeeActions
                taskCurrentState={taskCurrentState}
                updateTaskStatus={updateTaskStatus}
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

            <Grid item sm={12} md={4}>
              <EmployeeProgress
                taskCurrentState={taskCurrentState}
                employee={employee}
                customCapsuleColors={customCapsuleColors}
              />
            </Grid>

            <Grid item sm={12} md={shouldWrapActions ? 3 : 12}>
              <EmployeeActions
                taskCurrentState={taskCurrentState}
                updateTaskStatus={updateTaskStatus}
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
