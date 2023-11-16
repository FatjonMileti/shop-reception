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
      title: 'Magazin',
      field: 'storeName',
      align: 'left'
    },
    {
      title: 'Utilizatori',
      field: 'username',
      align: 'left'
    },
    {
      title: 'Data ultimei accesari',
      field: 'lastAccess',
      align: 'left',
    },
    {
      title: 'Data ultimei modificari',
      field: 'lastChange',
      align: 'left',
    },
    {
      title: 'Descarcare Cadantier',
      field: 'printCadentier',
      align: 'left',
      minWidth: '160px',
      render: row => (
        <Box>
          <IconCell value={'active'}/>
        </Box>
      )
    },
    {
        title: 'Modificare cadantier',
        field: 'modifyCadentier',
        align: 'left',
        minWidth: '200px',
        render: row => (
            <Box>
              <IconCell value={'inactive'} />
            </Box>
        )
    },
    {
        title: 'Coeficient de crestere magazin',
        field: 'modifyStoreGrowth',
        align: 'left',
        minWidth: '250px',
        render: row => (
            <Box>
              <IconCell value={'active'} />
            </Box>
        )
    },
    {
        title: 'Coeficient de crestere produse',
        field: 'modifyProductGrowth',
        align: 'left',
        minWidth: '250px',
        render: row => (
            <Box>
              <IconCell value={'active'} />
            </Box>
        )
    },
    {
        title: 'Accesare applicatie',
        field: 'login',
        align: 'left',
        minWidth: '180px',
        render: row => (
            <Box>
              <IconCell value={'active'} />
            </Box>
        )
    },
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

