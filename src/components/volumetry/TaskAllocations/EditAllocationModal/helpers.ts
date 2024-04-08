export const getFormInitialValues = (editItem, hideWorkload) => ({
  ...(!hideWorkload && {
    allocatedWorkload: editItem?.allocatedWorkload || ''
  }),
  comment: editItem?.comment || ''
})
