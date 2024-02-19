import { LocationCategoryManagementTableItem } from 'components/volumetry/interfaces'
import * as Yup from 'yup'

export const getInitialValues = (editItem: LocationCategoryManagementTableItem) => ({
  name: editItem?.name ?? '',
  description: editItem?.description ?? ''
})

export const getValidationSchema = (item: LocationCategoryManagementTableItem) =>
  Yup.object().shape({
    name: Yup.string().required('Acest camp este obligatoriu.'),
    description: Yup.string()
  })
