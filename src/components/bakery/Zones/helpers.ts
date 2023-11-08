import { PermissionRoles } from 'utils/enums'

export const columns = [
  {
    title: 'Nume zona',
    field: 'name',
    align: 'left'
  },
  {
    title: 'Responsabil',
    field: 'responsible',
    align: 'left'
  },
  // {
  //   title: 'Magazin',
  //   field: 'stores',
  //   align: 'left'
  // },
  // {
  //   title: 'Divizie',
  //   field: 'divisionType',
  //   align: 'left',
  //   collapsible: true
  // },
]

export const roles = {
  editRoles: [
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN
    //   PermissionRoles.GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL,
    //   PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER
  ]
}
