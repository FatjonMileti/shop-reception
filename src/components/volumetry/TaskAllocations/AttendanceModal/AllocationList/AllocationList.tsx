import { Checkbox, Button } from '@fullscreendigital/carrefour-dex-fe'
import { Box, Grid } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { formatTime } from 'utils/helpers'

const AllocationList = props => {
  const { employees, toggleEmployee, closeModal, allocateEmployees } = props

  const submitStep = () => {
    allocateEmployees()
  }

  return (
    <Box>
      {employees
        .filter(employee => employee.isPresent)
        .map(employee => (
          <Grid container>
            <Grid item xs={12} md={4}>
              <Checkbox
                edge="start"
                checked={employee.shouldAllocate}
                onChange={() => toggleEmployee(employee)}
                inputProps={{ 'aria-labelledby': `employee-${employee.value}` }}
                label={`${employee.fullName} (${employee.genericDepartment})`}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <span style={{ display: 'inline-block', lineHeight: '45px' }}>
                Ora de inceput: {formatTime(employee.shiftStart)}
              </span>
            </Grid>
            <Grid item xs={12} md={4}>
              <span style={{ display: 'inline-block', lineHeight: '45px' }}>
                Ora de final: {formatTime(employee.shiftEnd)}
              </span>
            </Grid>
          </Grid>
        ))}
      <Box className={s.modalButtons} style={{ width: '50%', float: 'right', marginTop: '20px' }}>
        <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
        <Button variant="contained" label="Aloca" onClick={submitStep} />
      </Box>
    </Box>
  )
}

export default AllocationList
