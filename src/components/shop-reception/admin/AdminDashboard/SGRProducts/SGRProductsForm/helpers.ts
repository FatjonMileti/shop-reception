import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    shopCode: Yup.lazy(value =>
      typeof value === 'object'
        ? Yup.object().required('Campul este obligatoriu.').typeError('Campul este obligatoriu.')
        : Yup.string().required('Campul este obligatoriu.')
    ),
    shopType: Yup.lazy(value =>
      typeof value === 'object'
        ? Yup.object().required('Campul este obligatoriu.').typeError('Campul este obligatoriu.')
        : Yup.string().required('Campul este obligatoriu.')
    ),
    rayCode: Yup.lazy(value =>
      typeof value === 'object'
        ? Yup.object().required('Campul este obligatoriu.').typeError('Campul este obligatoriu.')
        : Yup.string().required('Campul este obligatoriu.')
    ),
    famCode: Yup.lazy(value =>
      typeof value === 'object'
        ? Yup.object().required('Campul este obligatoriu.').typeError('Campul este obligatoriu.')
        : Yup.string().required('Campul este obligatoriu.')
    ),
    sfaCode: Yup.lazy(value =>
      typeof value === 'object'
        ? Yup.object().required('Campul este obligatoriu.').typeError('Campul este obligatoriu.')
        : Yup.string().required('Campul este obligatoriu.')
    ),
    ubCode: Yup.lazy(value =>
      typeof value === 'object'
        ? Yup.object().required('Campul este obligatoriu.').typeError('Campul este obligatoriu.')
        : Yup.string().required('Campul este obligatoriu.')
    ),
    prodCode: Yup.string().required()
  })

export const getInitialValues = (editItem: SGRProducts) => {
  return {
    id: editItem?.id || null,
    shopCode: editItem?.shopCode || [],
    shopType: editItem?.shopType || [],
    rayCode: editItem?.rayName || [],
    famCode: editItem?.famName || [],
    sfaCode: editItem?.sfaName || [],
    ubCode: editItem?.ubName || [],
    prodCode: editItem?.prodName || []
  }
}
