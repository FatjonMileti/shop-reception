import TaskDescription from './TaskDescription'
import TaskSummary from './TaskSummary'

export const toDepartmentOptions = data => data.map(item => ({ label: item.name, value: item.id }))

export const toListTableRows = items =>
  items.map(item => ({
    id: item.id,
    summary: <TaskSummary item={item} />,
    details: <TaskDescription item={item} />,
    borderLeftColor: 'red'
  }))
