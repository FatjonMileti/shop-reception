export const getFormInitialValues = (editItem, hideWorkload) => ({
  ...(!hideWorkload && {
    allocatedWorkload: editItem?.allocatedWorkload || '',
    performedWorkload: editItem?.performedWorkload || ''
  }),
  ...(!hideWorkload &&
    editItem?.timerStatus !== 'FINISHED' && {
      allocatedWorkload: editItem?.allocatedWorkload || ''
    }),
  comment: editItem?.comment || ''
})
