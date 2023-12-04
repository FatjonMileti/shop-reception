import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminStore) =>
  Yup.object().shape({
    store: Yup.string().required(),
    METIVersion: Yup.string().required(),
    adCode: Yup.string().required(),
    grams: Yup.string().required(),
    ip: Yup.string().required(),
    way: Yup.string().required(),
    quantities: Yup.boolean().required(),
    active: Yup.boolean().required(),
  })

export const getInitialValues = (editItem: AdminStore) => {
  return {
    id: editItem?.id || null,
    store: editItem?.storeCode || null,
    METIVersion: editItem?.storeCode || null,
    adCode: editItem?.storeCode || null,
    grams: editItem?.storeCode || null,
    ip: editItem?.storeCode || null,
    way: editItem?.storeCode || null,
    quantities: editItem?.storeCode || null,
    active: editItem?.storeCode || null,
  }
}
