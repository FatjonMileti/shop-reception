import { formatUIDate } from 'utils/helpers'

export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    teamMemberName: item.teamMember.name,
    teamMemberId: item.teamMember.id,
    projectId: item.project.id,
    role: item.role,
    iibKey: item.project.iibKey,
    ipbKey: item.project.ipbKey,
    assignedProject: item.project.name,
    assignmentStartDate: formatUIDate(item.assignmentStartDate),
    assignmentEndDate: formatUIDate(item.assignmentEndDate)
  }))
