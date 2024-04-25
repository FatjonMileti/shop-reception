import { LocationItem } from 'components/volumetry/interfaces'
import * as Yup from 'yup'

export const getInitialValues = (editItem: any) => ({
  category: editItem ? { value: editItem.categoryId, label: editItem.locationCategory } : null
})

export const getValidationSchema = (item: LocationItem) =>
  Yup.object().shape({
    category: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
      .required('Acest camp este obligatoriu.')
  })
