import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'

export const gamaProdus = [
    { label: "Obligatoriu", value: "Obligatoriu" },
    { label: "Facultativ", value: "Facultativ" }
]

export const columns = [

    {
      title: 'Denumire',
      field: 'name',
      align: 'left',
      collapsible: true,
    },
    {
      title: 'Obligatoriu/Facultativ',
      field: 'mandatory',
      align: 'left',
      collapsible: 'true',
      render: row => (
        <Box>
          <IconCell value={row.mandatory ? 'active' : 'inactive'} />
        </Box>
      )
    }
  ]

export const getInitialValues = editItem => ({
    id: editItem?.id ?? '',
    name: editItem?.name ?? '',
    mandatory: editItem?.mandatory ? gamaProdus[0].value : gamaProdus[1].value,
    enable: editItem?.enable ? 'Active' : 'Inactive',
})

