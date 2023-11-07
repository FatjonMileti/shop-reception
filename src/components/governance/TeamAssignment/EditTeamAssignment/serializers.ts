import { TeamAssignmentItem } from 'components/governance/interfaces'
import dayjs from 'dayjs'

export const toTeamAssignmentPayload = (values, editItem) => {
  const assignmentStartDate = dayjs(new Date(values.assignmentStartDate)).format('YYYY-MM-DD')
  const assignmentEndDate = dayjs(
    new Date(values.assignmentEndDate['$d'] || values.assignmentEndDate)
  ).format('YYYY-MM-DD')

  return {
    id: values.id,
    project: { id: (editItem as TeamAssignmentItem)?.projectId },
    teamMember: { id: (editItem as TeamAssignmentItem)?.teamMemberId },
    role: values.role,
    assignmentStartDate,
    assignmentEndDate
  }
}
