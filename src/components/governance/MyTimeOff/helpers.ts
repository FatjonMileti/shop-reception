import { PermissionRoles } from '../enums'

export const columns = [
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
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_PM
  ],
  editRoles: [
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_PM
  ],
  deleteRoles: [
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER,
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_IT_PM
  ]
}
