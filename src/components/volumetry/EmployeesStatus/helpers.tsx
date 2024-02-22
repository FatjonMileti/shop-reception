import { Box } from "@mui/material";
import { IconCell } from "components/core-ui/IconCell";

export const columns = [
  {
    title: 'Nume complet',
    field: 'fullName',
    align: 'left'
  },
  {
    title: 'Task in desfasurare',
    field: 'hasInProgressTasks',
    align: 'left',
    render: row => (
      <Box>
        <IconCell value={row.hasInProgressTasks ? 'active' : 'inactive'} />
      </Box>
    )
  },
  {
    title: 'Nume task in desfasurare',
    field: 'taskName',
    align: 'left'
  },
  {
    title: 'Nr. task-uri finalizate',
    field: 'finishedTasksNumber',
    align: 'left'
  }
]
