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
    field: 'todoTasks',
    align: 'left',
    render: row => (
      <Box>
        <IconCell value={row.todoTasks ? 'active' : 'inactive'} />
      </Box>
    )
  },
  {
    title: 'Nr. task-uri neincepute',
    field: 'inProgressTasks',
    align: 'left'
  },
  {
    title: 'Nr. task-uri finalizate',
    field: 'doneTasks',
    align: 'left'
  }
]
