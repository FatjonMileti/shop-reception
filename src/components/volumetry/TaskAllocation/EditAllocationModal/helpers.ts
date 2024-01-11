export const getFormInitialValues = editItem =>
  editItem
    ? {
        workload: editItem?.workload || '',
        // message: editItem?.message || ''
      }
    : { workload: '' }
