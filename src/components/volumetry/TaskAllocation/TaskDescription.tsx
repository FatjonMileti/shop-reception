import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Capsule } from 'components/core-ui/Capsule'
import { useEffect, useState } from 'react'
import AssignEmployee from './AssignEmployee'
import Employee from './Employee'

interface TaskDescriptionProps {
  item: any // TODO: To add type when db schema is defined
  employees?: any[] // TODO: To add type when db schema is defined
}

const TaskDescription: React.FC<TaskDescriptionProps> = props => {
  const { item, employees } = props

  const { frequency, taskName, department } = item.item || item
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = (): void => setIsModalOpen(true)
  const closeModal = (): void => setIsModalOpen(false)

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

  return (
    <Grid container flexDirection="column">
      <Grid container>
        <Grid item mr={1}>
          <Capsule label="Frecventa" value={frequency.name} />
        </Grid>
      </Grid>

      {employees && (
        <Grid container flexDirection="column" pr={2}>
          {employees.map(employee => (
            <Employee employee={employee} task={item}/>
          ))}
        </Grid>
      )}

      <Grid item my={1} xs={12} style={{ marginRight: '15px' }}>
        <Button
          variant="contained"
          label="Selecteaza angajat"
          onClick={() => openModal()}
          style={{ textTransform: 'none', width: isMobile ? '100%' : 'auto' }}
        />
      </Grid>

      <AssignEmployee
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        taskName={taskName}
        department={department.name}
      />
    </Grid>
  )
}

export default TaskDescription
