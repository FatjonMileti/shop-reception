import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    supportCode: Yup.string(),
    supportTypeId: Yup.string().required(),
    reason: Yup.array().of(Yup.string()).min(1),
    defect: Yup.string(),
  })

export const getInitialValues = truck => ({
  supportCode: truck?.supportCode || '',
  supportTypeId: truck?.supportTypeId || '',
  supportId: truck?.supportId || '',
  reason: truck?.reason || '',
  defect: truck?.defect || ''
})
