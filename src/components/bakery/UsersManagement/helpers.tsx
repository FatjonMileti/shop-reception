import { Box } from "@mui/material"
import { IconCell } from "components/core-ui/IconCell"
import { MultivalueCell } from "components/core-ui/MultivalueCell"

export const columns = [
  {
    title: 'Nume user',
    field: 'lastName',
    align: 'left'
  },
  {
    title: 'Prenume User',
    field: 'firstName',
    align: 'left'
  },
  {
    title: 'Magazin',
    field: 'storeName',
    align: 'left'
  },
  {
    title: 'Regiune',
    field: 'regionName',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Rol',
    field: 'roles',
    align: 'left',
    width: '140px',
    collapsible: 'true',
    render: row => (
      <Box>
        <MultivalueCell value={row.roles} />
      </Box>
    )
  },
  {
    title: 'Status',
    field: 'enable',
    align: 'left',
    width: '80px',
    collapsible: 'true',
    render: row => (
      <Box>
        <IconCell value={row.enable ? 'active' : 'inactive'} />
      </Box>
    )
  }
]

export const statuses = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
]
export const getInitialValues = editItem => ({
    id: editItem?.id ?? '',
    oidcId: editItem?.oidcId ?? '',
    enable: editItem?.enable ? 'Active' : 'Inactive',
    email: editItem?.email ?? '',
    firstName: editItem?.firstName ?? '',
    lastName: editItem?.lastName ?? '',
    structureRoles: editItem?.structureRoles ?? []
})