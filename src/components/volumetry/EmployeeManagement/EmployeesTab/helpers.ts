import { PermissionRoles } from "utils/enums"

export const columns = [
  {
    title: 'Departament',
    field: 'department',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume',
    field: 'fullName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Functie',
    field: 'jobTitle',
    align: 'left',
    collapsible: true,
    type: 'string'
  }
]

export const roles = {
  filterRoles: [PermissionRoles.GG_RO_HQ_IT_DEX_GOV_REGION_ADMIN]
}
