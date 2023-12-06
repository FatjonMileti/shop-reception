import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Capsule } from 'components/core-ui/Capsule'
import { useState } from 'react'
import AssignEmployee from './AssignEmployee'

const TaskDescription = item => {
  const { frequency, taskName, department } = item.item
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = (): void => setIsModalOpen(true)
  const closeModal = (): void => setIsModalOpen(false)

  return (
    <Grid container flexDirection="column">
      <Grid container>
        <Grid item mr={1}>
          <Capsule label="Frecventa" value={frequency.name} />
        </Grid>
      </Grid>

      <Grid item my={1}>
        <Button
          variant="contained"
          label="Selecteaza angajat"
          onClick={() => openModal()}
          style={{ textTransform: 'none' }}
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
