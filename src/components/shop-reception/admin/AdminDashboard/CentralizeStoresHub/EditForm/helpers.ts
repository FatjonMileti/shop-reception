import * as Yup from 'yup'

export const getValidationSchema = (editItem: CentralizeStoresHub) =>
  Yup.object().shape({
    deposit: Yup.string().required(),
    hubs: Yup.string().required(),
  })

export const getInitialValues = (editItem: CentralizeStoresHub) => {
  return {
    id: editItem?.id || null,
    deposit: editItem?.deposit || null,
    hubs: editItem?.hubs || null,
  }
}
