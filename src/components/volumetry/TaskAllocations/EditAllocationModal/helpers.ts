export const getFormInitialValues = (editItem, hideWorkload) => ({
  ...(!hideWorkload && {
    allocatedWorkload: editItem?.allocatedWorkload || ''
  }),
  performedWorkload: editItem?.performedWorkload || editItem?.allocatedWorkload || '',
  comment: editItem?.comment || ''
})
