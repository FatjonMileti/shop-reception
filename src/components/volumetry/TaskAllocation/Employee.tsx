import { Grid, LinearProgress } from '@mui/material'
import s from './TaskAllocation.modules.scss'
import { ChatIcon, EmployeeIcon } from 'icons'
import { Capsule } from 'components/core-ui/Capsule'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { useEffect, useState } from 'react'
import { getCapsuleColor } from './helpers'

interface EmployeeProps {
  employee: any // TODO: To add type when db schema is defined
}

const Employee: React.FC<EmployeeProps> = props => {
  const { employee } = props

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

  const isTaskStarted = employee.startTime.isStarted
  const isTaskEnded = employee.endTime.isEnded

  const startButton = !isTaskStarted && !isTaskEnded
  const stopButton = isTaskStarted && !isTaskEnded

  const customCapsuleColors = getCapsuleColor(isTaskStarted, isTaskEnded, employee.isOverdue)

  return (
    <Grid item mt={1} className={s.employeeContainer} flexDirection={'column'} overflow={'hidden'}>
      <Grid container style={{ padding: '8px 12px 8px', gap: '12px', alignItems: 'center' }}>
        <Grid item xs={12} md={2} sx={{ display: 'flex' }}>
          <EmployeeIcon />
          <p className={s.employeeName}>{employee.employee.name}</p>
        </Grid>

        <Grid item xs={12} md={5.4} className={s.capsules}>
          <Capsule
            label={employee.startTime.isStarted ? 'Ora de inceput' : 'Ora estimata de inceput'}
            value={employee.startTime.time}
            labelColor={customCapsuleColors.label}
            valueColor={customCapsuleColors.value}
          />
          <Capsule
            label={employee.endTime.isEnded ? 'Ora de final' : 'Ora estimata de final'}
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
            <>
              <Grid item mr={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <ChatIcon />
              </Grid>

              <p className={s.customText}>{employee.customText}</p>
            </>
          ) : !isTaskStarted && !isTaskEnded ? (
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

        {(startButton || stopButton) && (
          <Grid item xs={12} md={2} className={s.actionButtonContainer}>
            <Button
              variant="contained"
              label={startButton ? 'Start' : 'Stop'}
              style={{
                height: '30px',
                width: isMobile ? '100%' : 'auto'
              }}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default Employee
