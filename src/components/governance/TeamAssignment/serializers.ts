import { formatUIDate } from "utils/helpers";

export const toTableRowItems = items => items.map(item => {
  return ({
    id: item.id,
    teamMemberName: item.teamMember.name,
    role: item.role,
    iibKey: item.project.iibKey,
    ipbKey: item.project.ipbKey,
    assignedProject: item.project.name,
    assignmentStartDate: formatUIDate(item.assignmentStartDate),
    assignmentEndDate: formatUIDate(item.assignmentEndDate),
  })
})