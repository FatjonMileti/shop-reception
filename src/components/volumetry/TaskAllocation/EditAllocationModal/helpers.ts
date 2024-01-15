export const getFormInitialValues = editItem => ({
  workload: editItem?.workload || '',
  comment: editItem?.comment || ''
})
