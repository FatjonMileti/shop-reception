export const getFormInitialValues = (editItem, hideWorkload) => ({
  ...(!hideWorkload && {workload: editItem?.workload || ''}),
  comment: editItem?.comment || ''
})
