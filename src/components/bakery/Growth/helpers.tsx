import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import * as Yup from 'yup'

// export const divisionTypes = [
//     { label: 'Super', value: 'SUPER' }, 
//     { label: 'Hyper', value: 'HYPER' } 
// ]

// export const statuses = [
//     { label: "Active", value: "Active" },
//     { label: "Inactive", value: "Inactive" }
// ]

export const columns = [
  {
    title: 'Divizie',
    field: 'type',
    align: 'left'
  },
  {
    title: 'Coeficient de crestere',
    field: 'growth',
    align: 'left'
  },
  {
    title: 'Ultima actualizare',
    field: 'username',
    align: 'left'
  },
  {
    title: 'Data / ora',
    field: 'lastChange',
    align: 'left'
  },
]

export const getValidationSchema = () => Yup.object({
    growth: Yup.number().required()
})

export const getInitialValues = editItem => ({
    id: editItem?.id ?? '',
    type: editItem?.id ?? '',
    growth: editItem?.growth ?? '',
    username: editItem?.username ?? '',
    lastChange: editItem?.lastChange ?? ''
})

