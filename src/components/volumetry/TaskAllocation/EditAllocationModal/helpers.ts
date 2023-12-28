export const getFormInitialValues = editItem =>
  editItem
    ? {
        id: editItem?.id || 0,
        volume: editItem?.volume?.value || '',
        customText: editItem?.customText || ''
      }
    : { customText: '', volume: '', isStopped: true }
