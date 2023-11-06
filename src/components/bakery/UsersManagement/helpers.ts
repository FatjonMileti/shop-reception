import { PermissionRoles } from 'utils/enums'

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
    collapsible: true
  }, 
]

export const roles = {
  editRoles: [
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN
    //   PermissionRoles.GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL,
    //   PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER
  ]
}
