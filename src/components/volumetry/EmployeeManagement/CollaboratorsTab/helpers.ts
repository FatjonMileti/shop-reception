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
  },
  {
    title: 'Angajator',
    field: 'employer',
    align: 'left',
    collapsible: true,
    type: 'string'
  }
]

export const roles = {
  createRoles: [
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER
  ],
  editRoles: [
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER
  ],
  deleteRoles: [
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER
  ],
  filterRoles: [PermissionRoles.GG_RO_HQ_IT_DEX_GOV_REGION_ADMIN]
}
