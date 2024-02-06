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
        <IconCell value={row.enable ? 'activ' : 'inactiv'} />
      </Box>
    )
  }
]

export const statuses = [
    { label: "Activ", value: "Activ" },
    { label: "Inactiv", value: "Inactiv" }
]

export const getInitialValues = editItem => ({
    id: editItem?.id ?? '',
    oidcId: editItem?.oidcId ?? '',
    enable: editItem?.enable ? 'Activ' : 'Inactiv',
    email: editItem?.email ?? '',
    firstName: editItem?.firstName ?? '',
    lastName: editItem?.lastName ?? '',
    structureRoles: editItem?.structureRoles ?? []
})

export const updateStateWithExistingValues = (strRole, findFromList, setChecked, setValues, isTrainee = false) => {
  if(isTrainee) {
    const findTrainee = findFromList?.find(role => role.id === strRole.roleId)
    setChecked(true)
    setValues({label: findTrainee?.name , value: findTrainee?.id})
  } else {
    const findItem = findFromList?.find(item => item.value === strRole.structureId)
    setChecked(true)
    setValues({label: findItem?.label , value: findItem?.value})
  }
}
