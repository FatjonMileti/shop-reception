import { Box } from "@mui/material";
import { IconCell } from "components/core-ui/IconCell";

export const columns = [
  {
    title: 'Cod depozit',
    field: 'code',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume',
    field: 'name',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip depozit',
    field: 'type',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Procent valabilitate',
    field: 'validityPercentage',
    align: 'left',
    type: 'string',
    collapsible: true
  },
  {
    title: 'Activ',
    field: 'active',
    align: 'left',
    type: 'string',
    render: row => (
      <Box>
        <IconCell value={row.active ? 'active' : 'inactive'} />
      </Box>
    )
  }
]