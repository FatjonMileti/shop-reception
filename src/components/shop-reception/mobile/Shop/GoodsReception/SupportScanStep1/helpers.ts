import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    supportCode: Yup.string(),
    supportTypeId: Yup.string().required(),
    reason: Yup.string().nullable(),
    defect: Yup.string(),
  })

export const getInitialValues = supportData => ({
  supportCode: supportData?.supportCode || '',
  supportTypeId: supportData?.supportTypeId || '',
  supportId: supportData?.supportId || '',
  reason: supportData?.reason || null,
  defect: supportData?.defect || '',
  nonCompliantReasonList: supportData?.nonCompliantReasonList || []
})

export const conformOptions = [
  {
    value: 'COMPLIANT',
    label: 'Conform'
  },
  {
    value: 'NON_COMPLIANT_WRAPPING',
    label: 'Infoliere neconforma'
  },
  {
    value: 'MISSING_SEALING_TAPE',
    label: 'Lipsa banda sigilare'
  },
  {
    value: 'MISSING_PROMO_TAPE',
    label: 'Lipsa banda promo'
  },
  {
    value: 'OVER_HIGH_SUPPORT',
    label: 'Palet suprainaltat'
  },
  {
    value: 'DEFECTIVE_ASSEMBLAGE',
    label: 'Constructie defectuoasa'
  },
  {
    value: 'OVERTURNED_SUPPORT_INSURED',
    label: 'Palet rasturnat asigurat'
  },
  {
    value: 'OVERTURNED_SUPPORT_NON_INSURED',
    label: 'Palet rasturnat ne-asigurat in camion'
  },
  {
    value: 'BROKEN_SUPPORT',
    label: 'Palet lovit'
  }
]
