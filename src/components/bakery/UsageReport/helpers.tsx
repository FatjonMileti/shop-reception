import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import * as Yup from 'yup'

export const columns = [
    {
      title: 'Magazin',
      field: 'storeName',
      align: 'left',
      sticky: true,
    },
    {
      title: 'Utilizator',
      field: 'username',
      align: 'left',
      sticky: true,
    },
    {
      title: 'Data ultimei accesari',
      field: 'lastAccess',
      align: 'left',
      sticky: true,
    },
    {
      title: 'Data ultimei modificari',
      field: 'lastChange',
      align: 'left',
      sticky: true,
    },
    {
      title: 'Descarcare Cadantier',
      field: 'printCadentier',
      align: 'left',
      minWidth: '160px',
      filterDep: {
        name: ["startDate", "endDate"],
        type: 'daily'
      },
      isDynamic: true,
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
        filterDep: {
          name: ["startDate", "endDate"],
          type: 'daily'
        },
        isDynamic: true,
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
        filterDep: {
          name: ["startDate", "endDate"],
          type: 'daily'
        },
        isDynamic: true,
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
        filterDep: {
          name: ["startDate", "endDate"],
          type: 'daily'
        },
        isDynamic: true,
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
        filterDep: {
          name: ["startDate", "endDate"],
          type: 'daily'
        },
        isDynamic: true,
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

