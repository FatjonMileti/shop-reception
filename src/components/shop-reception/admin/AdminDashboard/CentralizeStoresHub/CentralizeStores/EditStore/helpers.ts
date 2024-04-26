import * as Yup from 'yup'

export const getValidationSchema = (editItem: any) =>
  Yup.object().shape({
    depositIdList: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().required('Campul este obligatoriu.'),
        label: Yup.string().required('Campul este obligatoriu.')
      })
    ),
    hubIdList: Yup.array().of(
      Yup.object().shape({
        value: Yup.string(),
        label: Yup.string()
      })
    )
  })

export const getInitialValues = (editItem, shopsFormData) => {
  return {
    depositIdList: shopsFormData?.selectedDeposits || [],
    hubIdList: shopsFormData?.selectedHubs || []
  }
}
