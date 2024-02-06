import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'

export const statuses = [
    { label: "Activ", value: "Activ" },
    { label: "Inactiv", value: "Inactiv" }
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
          <IconCell value={row.enable ? 'activ' : 'inactiv'} />
        </Box>
      )
    }
  ]

export const getInitialValues = editItem => ({
    ...(editItem?.id ? { id: editItem?.id } : {}),
    name: editItem?.name ?? '',
    divisionType: editItem?.divisionType ?? '',
    enable: editItem?.enable ? 'Activ' : 'Inactiv',
    metiCode: editItem?.metiCode ?? '',
    parentSociety: editItem?.parentSociety ?? '',
    region: editItem?.region ?? '',
    zone: editItem?.zone ?? ''
})

