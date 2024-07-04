import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    // shopCode: Yup.lazy(value => (typeof value === 'object' ? Yup.object().nullable() : Yup.string().nullable())),
    rayCode: Yup.lazy(value =>
      typeof value === 'object'
        ? Yup.object().required('Campul este obligatoriu.').typeError('Campul este obligatoriu.')
        : Yup.string().required('Campul este obligatoriu.')
    ),
    // famCode: Yup.lazy(value => (typeof value === 'object' ? Yup.object().nullable() : Yup.string().nullable())),
    // sfaCode: Yup.lazy(value => (typeof value === 'object' ? Yup.object().nullable() : Yup.string().nullable())),
    // ubCode: Yup.lazy(value => (typeof value === 'object' ? Yup.object().nullable() : Yup.string().nullable())),
    // prodCode: Yup.string().nullable()
  })

export const getInitialValues = (editItem: SensitiveProduct) => {
  return {
    shopCode: editItem?.shopCode || null,
    rayCode: editItem?.rayName || null,
    famCode: editItem?.famName || null,
    sfaCode: editItem?.sfaName || null,
    ubCode: editItem?.ubName || null,
    prodCode: editItem?.prodName || null,
    shopType: editItem?.shopType || null
  }
}
