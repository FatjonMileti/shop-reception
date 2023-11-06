export const getInitialValues = editItem => ({
  ...(editItem?.id ? { id: editItem?.id } : {}),
  departmentName: editItem?.departmentName ?? '',
  taskName: editItem?.taskName ?? '',
  estimateStartTime: editItem?.estimateStartTime ?? '',
  estimateEndTime: editItem?.estimateEndTime ?? '',
  frequency: editItem?.frequency ?? '',
  prodStandardValue: editItem?.prodStandardValue ?? '',
  umStandardProd: editItem?.umStandardProd ?? '',
  workVolumeSource: editItem?.workVolumeSource ?? '',
  priority: editItem?.priority ?? '',
  status: editItem?.status ?? ''
})

export const getValidationSchema = {}
