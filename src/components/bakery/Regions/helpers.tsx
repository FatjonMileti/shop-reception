import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import * as Yup from 'yup'

export const divisionTypes = [
    { label: 'Super', value: 'SUPER' }, 
    { label: 'Hyper', value: 'HYPER' } 
]

export const statuses = [
    { label: "Activ", value: "Activ" },
    { label: "Inactiv", value: "Inactiv" }
]

export const columns = [
  {
    title: 'Denumire regiune',
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
    collapsible: true
  },
  {
    title: 'Status',
    field: 'enable',
    align: 'left',
    type: 'string',
    render: row => (
      <Box>
        <IconCell value={row.enable ? 'activ' : 'inactiv'} />
      </Box>
      ),
    collapsible: true
  }
]

export const getValidationSchema = () => Yup.object({
    name: Yup.string().nonNullable(),
    responsible: Yup.string().nonNullable(),
})

export const getInitialValues = (editItem, isEdit) => {
  if(isEdit) return {
    ...(editItem?.id ? { id: editItem?.id } : {}),
    name: editItem?.name ?? '',
    responsible: editItem?.responsible ?? '',
    enable: editItem?.enable ? 'Activ' : 'Inactiv',
    divisionType: editItem?.divisionType ?? '',
} 
  return {
    name: '',
    responsible: '',
    enable: 'Activ',
    divisionType: '',
}
}

