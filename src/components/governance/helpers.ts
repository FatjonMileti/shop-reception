import { PermissionRoles } from '../../utils/enums'

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

export const dayOfTypes = [
  {
    value: 'Day-Off',
    label: 'Day-Off'
  },
  {
    value: 'Team Event',
    label: 'Team Event'
  }
]
