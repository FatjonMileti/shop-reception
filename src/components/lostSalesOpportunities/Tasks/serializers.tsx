import TaskDetails from './TaskDetails/TaskDetails'
import TaskSummary from './TaskSummary/TaskSummary'

export const toListTableRows = items => {
  return items.map(item => ({
    id: item.id,
    summary: <TaskSummary item={item} />,
    details: <TaskDetails item={item} />,
    borderLeftColor: '#0970E6',
    defaultExpanded: true
  }))
}
