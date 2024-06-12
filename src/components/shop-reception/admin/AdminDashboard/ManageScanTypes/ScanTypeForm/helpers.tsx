import * as Yup from 'yup'

export const getValidationSchema = (editItem: any) =>
  Yup.object().shape({
    ruleOrganisationType: Yup.object().shape({ key: Yup.string(), value: Yup.string() }),
    scanType: Yup.object().shape({ key: Yup.string(), value: Yup.string() }),
    start: Yup.date().required('Campul este obligatoriu.'),
    end: Yup.date().required('Campul este obligatoriu.'),
    active: Yup.boolean().required('Campul este obligatoriu.'),

    shopCode: Yup.object().shape({ key: Yup.string(), value: Yup.string() }).nullable(),
    regionId: Yup.object().shape({ key: Yup.string(), value: Yup.string() }).nullable()
  })

export const getInitialValues = (editItem: any) => {
  return {
    id: editItem?.id || null,
    ruleOrganisationType: editItem?.shopType || null,
    scanType: editItem?.type || null,
    start: editItem?.start || null,
    end: editItem?.end || null,
    active: editItem?.active || false,

    shopCode: editItem?.shopCode || null,
    regionId: editItem?.regionName || null
  }
}
