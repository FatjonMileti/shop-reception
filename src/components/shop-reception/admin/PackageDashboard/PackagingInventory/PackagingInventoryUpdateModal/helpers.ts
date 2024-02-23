import * as Yup from 'yup'

export const getValidationSchema = (editItem: PackagingInventory) =>
  Yup.object().shape({
    id: Yup.number().required(),
    qualitative: Yup.number().required(),
    defective: Yup.number().required(),
  })

export const getInitialValues = (editItem: PackagingInventory) => {
  return {
    id: editItem?.id || null,
    qualitative: editItem?.inventoryQualitative || null,
    defective: editItem?.defectiveInventory || null,
  }
}
