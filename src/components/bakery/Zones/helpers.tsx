import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import * as Yup from 'yup'

export const divisionTypes = [
    { label: 'Super', value: 'SUPER' }, 
    { label: 'Hyper', value: 'HYPER' } 
]

export const statuses = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
]

export const columns = [
    {
      title: 'Nume zona',
      field: 'name',
      align: 'left'
    },
    {
      title: 'Responsabil',
      field: 'responsible',
      align: 'left'
    },
    {
      title: 'Magazin',
      field: 'stores',
      align: 'left',
      collapsible: 'true',
      render: row => (
        <Box>
          <MultivalueCell value={row.stores} />
        </Box>
      )
    },
    {
      title: 'Divizie',
      field: 'divisionType',
      align: 'left',
      collapsible: true,
    },
    {
      title: 'Status',
      field: 'enable',
      align: 'left',
      collapsible: 'true',
      render: row => (
        <Box>
          <IconCell value={row.enable ? 'active' : 'inactive'} />
        </Box>
      )
    }
  ]

export const getValidationSchema = () => Yup.object({
    name: Yup.string().nonNullable(),
    responsible: Yup.string().nonNullable(),
})

export const getInitialValues = editItem => ({
    ...(editItem?.id ? { id: editItem?.id } : {}),
    name: editItem?.name ?? '',
    responsible: editItem?.responsible ?? '',
    enable: editItem?.enable ? 'Active' : 'Inactive',
    divisionType: editItem?.divisionType ?? '',
    stores: editItem?.stores ?? []
})

