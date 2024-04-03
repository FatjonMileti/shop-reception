import { Button, FormTable, Table } from '@fullscreendigital/carrefour-dex-fe'
import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'
import { Box } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { AllocationListProps } from 'components/volumetry/interfaces'
import { useMemo } from 'react'
import { buildColumns } from './helpers'

const AllocationList = (props: AllocationListProps) => {
  const {
    employees,
    toggleEmployee,
    closeModal,
    allocateEmployees,
    allocateEmployeesAllSelected,
    setAllocateEmployeesAllSelected
  } = props

  const submitStep = () => {
    allocateEmployees()
  }

  const columns = useMemo(
    () =>
      buildColumns({
        toggleEmployee
      }),
    [employees]
  )

  return (
    <Box>
      <Button
        variant="contained"
        label={allocateEmployeesAllSelected ? 'Debifeaza toti angajatii' : 'Bifeaza toti angajatii'}
        onClick={() => setAllocateEmployeesAllSelected(!allocateEmployeesAllSelected)}
        style={{ marginBottom: '1em' }}
      />
      <Box style={{ height: '55vh', overflowY: 'scroll' }}>
        <FormTable columns={columns} rows={employees} />
      </Box>
      <Box className={s.modalButtons} style={{ width: '50%', float: 'right', marginTop: '20px' }}>
        <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
        <Button variant="contained" label="Aloca" onClick={submitStep} />
      </Box>
    </Box>
  )
}

export default AllocationList
