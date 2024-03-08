import { LocationItem } from 'components/volumetry/interfaces'
import * as Yup from 'yup'

export const getInitialValues = (editItem: LocationItem) => ({
  region: editItem ? { value: editItem.regionId, label: editItem.regionName } : null,
  category: editItem ? { value: editItem.categoryId, label: editItem.categoryName } : null
})

export const getValidationSchema = (item: LocationItem) =>
  Yup.object().shape({
    region: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
      .required('Acest camp este obligatoriu.'),
    category: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
      .required('Acest camp este obligatoriu.')
  })
