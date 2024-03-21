import * as Yup from 'yup'

export const getValidationSchema = (editItem: any) =>
  Yup.object().shape({
    start: Yup.date().required(),
    end: Yup.date().required(),
    active: Yup.boolean().required(),
    ruleOrganisationType: Yup.object().shape({ key: Yup.string(), value: Yup.string() }),
    scanType: Yup.object().shape({ key: Yup.string(), value: Yup.string() }),
    ...(editItem && {
      shopCode: Yup.string(),
      regionId: Yup.string(),
      ruleShopType: Yup.object().shape({ key: Yup.string(), value: Yup.string() })
    })
  })

export const getInitialValues = (editItem: any) => {
  return {
    id: editItem?.id || null,
    start: editItem?.start || null,
    end: editItem?.end || null,
    active: editItem?.active || false,
    shopCode: editItem?.shopCode || null,
    regionId: editItem?.regionName || null,
    ruleOrganisationType: editItem?.ruleOrganisationType || null,
    scanType: editItem?.scanType || null,
    ruleShopType: editItem?.type || null
  }
}
