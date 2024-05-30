import { LocationCategoryManagementTableItem } from 'components/volumetry/interfaces'
import * as Yup from 'yup'

export const getInitialValues = (editItem: LocationCategoryManagementTableItem) => ({
  categoryName: editItem?.category ?? '',
  description: editItem?.description ?? '',
  locationType: editItem ? { value: editItem.locationType, label: editItem.locationType } : null
})

export const getValidationSchema = (item: LocationCategoryManagementTableItem) =>
  Yup.object().shape({
    categoryName: Yup.string().required('Acest camp este obligatoriu.'),
    description: Yup.string().required('Acest camp este obligatoriu.'),
    locationType: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
    .required('Acest camp este obligatoriu.'),
  })

export const toLocationCategoryPayload = values => ({
  ...values,
  locationType: values.locationType.value
})
