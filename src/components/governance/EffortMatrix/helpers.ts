import { PermissionRoles } from "utils/enums"

export const columns = [
  {
    title: 'Role',
    field: 'role',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Evaluation',
    field: 'evaluationPhase',
    align: 'left',
    type: 'number',
    suffix: '%'
  },
  {
    title: 'Analysis',
    field: 'analysisPhase',
    align: 'left',
    type: 'number',
    suffix: '%'
  },
  {
    title: 'Design',
    field: 'designPhase',
    align: 'left',
    collapsible: true,
    type: 'number',
    suffix: '%'
  },
  {
    title: 'Development',
    field: 'developmentPhase',
    align: 'left',
    collapsible: true,
    type: 'number',
    suffix: '%'
  },
  {
    title: 'System Test',
    field: 'systemTestPhase',
    align: 'left',
    collapsible: true,
    type: 'number',
    suffix: '%'
  },
  {
    title: 'UAT',
    field: 'uatPhase',
    align: 'left',
    collapsible: true,
    type: 'number',
    suffix: '%'
  },
  {
    title: 'Roll-Out',
    field: 'rolloutPhase',
    align: 'left',
    collapsible: true,
    type: 'number',
    suffix: '%'
  },
  {
    title: 'Hypercare',
    field: 'hypercarePhase',
    align: 'left',
    collapsible: true,
    type: 'number',
    suffix: '%'
  }
]

export const roles = {
  createRoles: [
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN
  ],
  editRoles: [
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN
  ],
  deleteRoles: [
    PermissionRoles.GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN
  ]
}
