import * as Yup from 'yup'

export const getValidationSchema = (editItem: ScanType) =>
  Yup.object().shape({
    region: Yup.string().required(),
    scanType: Yup.string().required(),
    startDate: Yup.string().required(),
    lastDate: Yup.string().required(),
    active: Yup.boolean().required(),
  })

export const getInitialValues = (editItem: ScanType) => {
  return {
    id: editItem?.id || null,
    region: editItem?.storeCode || null,
    scanType: editItem?.storeCode || null,
    startDate: editItem?.storeCode || null,
    lastDate: editItem?.storeCode || null,
    active: editItem?.storeCode || false,
  }
}
