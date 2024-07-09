import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminRegion) =>
  Yup.object().shape({
    code: Yup.string().required('Campul este obligatoriu.'),
    name: Yup.string().required('Campul este obligatoriu.'),
    responsible: Yup.string().required('Campul este obligatoriu.'),
    active: Yup.boolean().required('Campul este obligatoriu.'),
    shopIds: Yup.array().optional()
  })

export const getInitialValues = (editItem: AdminRegion, shopTypes: any) => {
  return {
    id: editItem?.id || null,
    code: editItem?.code || null,
    name: editItem?.name || null,
    responsible: editItem?.responsible || null,
    active: editItem?.active || false,
    shopIds: shopTypes?.selectedOptions || [{label: '123', value: '123'}]
  }
}
