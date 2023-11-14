import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import * as Yup from 'yup'

// export const divisionTypes = [
//     { label: 'Super', value: 'SUPER' }, 
//     { label: 'Hyper', value: 'HYPER' } 
// ]

export const statuses = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
]

export const columns = [
    {
      title: 'Magazin',
      field: 'name',
      align: 'left'
    },
    {
      title: 'Cod METI',
      field: 'metiCode',
      align: 'left'
    },
    {
      title: 'Divizie',
      field: 'divisionType',
      align: 'left',
      collapsible: true,
    },
    {
      title: 'Societate parinte',
      field: 'parentSociety',
      align: 'left',
      collapsible: true,
    },
    {
      title: 'Regiune',
      field: 'region',
      align: 'left',
      collapsible: true,
    },
    {
      title: 'Zona',
      field: 'zone',
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

// export const getValidationSchema = () => Yup.object({
//     name: Yup.string().nonNullable(),
//     responsible: Yup.string().nonNullable(),
// })

export const getInitialValues = editItem => ({
    ...(editItem?.id ? { id: editItem?.id } : {}),
    name: editItem?.name ?? '',
    divisionType: editItem?.divisionType ?? '',
    enable: editItem?.enable ? 'Active' : 'Inactive' || '',
    metiCode: editItem?.metiCode ?? '',
    parentSociety: editItem?.parentSociety ?? '',
    region: editItem?.region ?? '',
    zone: editItem?.zone ?? ''
})

