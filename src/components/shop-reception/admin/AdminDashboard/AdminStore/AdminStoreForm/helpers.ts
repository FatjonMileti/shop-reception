import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminStore) =>
  Yup.object().shape({
    code: Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string()
      })
      .required('Campul este obligatoriu.'),
    metiVersion: Yup.object()
      .shape({
        label: Yup.string().required('Campul este obligatoriu.'),
        value: Yup.string().required('Campul este obligatoriu.')
      })
      .required('Campul este obligatoriu.'),
    adCode: Yup.string().required('Campul este obligatoriu.'),
    parentSociety: Yup.object()
      .shape({
        label: Yup.string().required('Campul este obligatoriu.'),
        value: Yup.string().required('Campul este obligatoriu.')
      })
      .required('Campul este obligatoriu.'),
    receptionDeviation: Yup.number().required('Campul este obligatoriu.'),
    sftpIp: Yup.string().required('Campul este obligatoriu.'),
    sftpPath: Yup.string().required('Campul este obligatoriu.'),
    depositIds: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string().required('Campul este obligatoriu.'),
          value: Yup.string().required('Campul este obligatoriu.')
        })
      )
      .required('Campul este obligatoriu.'),
    address: Yup.string().required('Campul este obligatoriu.'),
    city: Yup.string().required('Campul este obligatoriu.'),
    town: Yup.string().required('Campul este obligatoriu.'),

    canEditQuantities: Yup.boolean(),
    canCallReturnTruck: Yup.boolean(),
    active: Yup.boolean().required('Campul este obligatoriu.')
  })

export const getInitialValues = (editItem: AdminStore) => {
  return {
    id: editItem?.id || null,
    code: editItem ? { label: editItem?.metiCode, value: editItem?.metiCode } : null,
    metiVersion: editItem ? { label: editItem?.metiVersion, value: editItem?.metiVersion } : null,
    adCode: editItem?.adCode || '',
    parentSociety: editItem
      ? { label: editItem?.parentSociety, value: editItem?.parentSociety }
      : null,
    receptionDeviation: editItem?.receptionDeviation || '',
    sftpIp: editItem?.sftpIp || '',
    sftpPath: editItem?.sftpPath || '',
    address: editItem?.address || '',
    city: editItem?.city || '',
    town: editItem?.town || '',
    canEditQuantities: editItem?.canEditQuantities || false,
    canCallReturnTruck: editItem?.canCallReturnTruck || false,
    active: editItem?.active || false
  }
}
