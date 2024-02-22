import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminStore) =>
  Yup.object().shape({
    name: Yup.string().required(),
    metiVersion: Yup.string().required(),
    adCode: Yup.string().required(),
    receptionDeviation: Yup.string().required(),
    sftpIp: Yup.string().required(),
    sftpPath: Yup.string().required(),
    canEditQuantities: Yup.boolean().required(),
    active: Yup.boolean().required()
  })

export const getInitialValues = (editItem: AdminStore) => {
  return {
    id: editItem?.id || null,
    name: editItem?.metiName || null,
    metiVersion: editItem?.metiVersion || null,
    adCode: editItem?.adCode || null,
    receptionDeviation: editItem?.receptionDeviation || null,
    sftpIp: editItem?.sftpIp || null,
    sftpPath: editItem?.sftpPath || null,
    canEditQuantities: editItem?.canEditQuantities || false,
    active: editItem?.active || false
  }
}
