import { Box, CircularProgress } from '@mui/material'
import { Button, Table } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { EmployeeAttendanceProps } from 'components/volumetry/interfaces'
import { useMemo } from 'react'
import { buildColumns } from './helpers'
import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'

const EmployeeAttendance = (props: EmployeeAttendanceProps) => {
  const {
    isEmployeesLoading,
    employees,
    toggleEmployee,
    updateEmplpyeeTime,
    closeModal,
    handleSubmit,
    increaseStep,
    isXs
  } = props

  const submitStep = async () => {
    await handleSubmit()
    increaseStep()
  }

  const tableColumns = useMemo(
    () => buildColumns({ toggleEmployee, updateEmplpyeeTime }) as TableHeaderType[],
    [employees]
  )

  return isEmployeesLoading ? (
    <div style={{ display: 'flex' }}>
      <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
    </div>
  ) : (
    <Box>
      <Box style={{ height: '60vh', overflowY: 'scroll' }}>
        <Table
          hideCheckbox
          orderBy="name"
          order="desc"
          columns={tableColumns}
          rows={employees}
          isLoading={false}
          disablePagination
        />
      </Box>
      <Box className={s.modalButtons} style={{ width: '50%', float: 'right', marginTop: '20px' }}>
        <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
        <Button variant="contained" label="Continua" onClick={submitStep} />
      </Box>
    </Box>
  )
}

export default EmployeeAttendance
