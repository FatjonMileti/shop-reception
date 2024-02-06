import { formatUIDate } from 'utils/helpers'

export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    'teamMember.name': item.teamMember.name || '',
    teamMemberId: item.teamMember.id,
    projectId: item.project.id,
    role: item.role,
    'project.iibKey': item.project.iibKey || '',
    'project.ipbKey': item.project.ipbKey || '',
    'project.name': item.project.name || '',
    assignmentStartDate: formatUIDate(item.assignmentStartDate),
    assignmentEndDate: formatUIDate(item.assignmentEndDate)
  }))
