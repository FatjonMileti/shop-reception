import { PermissionRoles } from 'utils/enums'

export const columns = [
  {
    title: 'Person',
    field: 'teamMemberName',
    align: 'left'
  },
  {
    title: 'Day-Off Type',
    field: 'dayOffType',
    align: 'left'
  },
  {
    title: 'Start Date',
    field: 'startDate',
    align: 'left',
    collapsible: true
  },
  {
    title: 'End Date',
    field: 'endDate',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Hours',
    field: 'numberOfHours',
    align: 'left',
    collapsible: true,
    disableSorting: true
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
  ]
}
