import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import * as Yup from 'yup'

export const divisionTypes = [
    { label: 'Super', value: 'SUPER' }, 
    { label: 'Hyper', value: 'HYPER' },
    { label: 'Hyper&Super', value: 'HYPER_AND_SUPER'}
]

  export const famInBakeryScope = [
      { label: "Da", value: "Da" },
      { label: "Nu", value: "Nu" }
  ]

export const columns = [
  {
    title: 'Cod',
    field: 'code',
    align: 'left'
  },
  {
    title: 'Nume familie',
    field: 'name',
    align: 'left'
  },
  {
    title: 'Divizie',
    field: 'divisionType',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Modul',
    field: 'moduleName',
    align: 'left',
    collapsible: true
  }
]

export const getInitialValues = editItem => ({
    ...(editItem?.id ? { id: editItem?.id } : {}),
    code: editItem?.code ?? '',
    name: editItem?.name ?? '',
    enable: editItem?.enable || '',
    divisionType: editItem?.divisionType ?? '',
    moduleName: editItem?.moduleName || '',
    moduleId: editItem?.moduleId || ''
})

