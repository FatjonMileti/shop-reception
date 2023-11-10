import * as Yup from 'yup'
import { EffortMatrix } from 'components/governance/interfaces'

export const getValidationSchema = editItem =>
  Yup.object().shape({
    role: editItem
      ? Yup.string()
      : Yup.object().shape({
          label: Yup.string().required('The Role field is required'),
          value: Yup.string().required('The Role field is required')
        }),
    evaluationPhase: Yup.number().required(),
    analysisPhase: Yup.number().required(),
    designPhase: Yup.number().required(),
    developmentPhase: Yup.number().required(),
    systemTestPhase: Yup.number().required(),
    uatPhase: Yup.number().required(),
    rolloutPhase: Yup.number().required(),
    hypercarePhase: Yup.number().required()
  })

export const getInitialValues = (editItem: EffortMatrix) => {
  return {
    id: editItem?.id || null,
    role: editItem?.role || null,
    evaluationPhase:
      editItem?.evaluationPhase || editItem?.evaluationPhase === 0 ? editItem?.evaluationPhase : '',
    analysisPhase:
      editItem?.analysisPhase || editItem?.analysisPhase === 0 ? editItem?.analysisPhase : '',
    designPhase: editItem?.designPhase || editItem?.designPhase === 0 ? editItem?.designPhase : '',
    developmentPhase:
      editItem?.developmentPhase || editItem?.developmentPhase === 0
        ? editItem?.developmentPhase
        : '',
    systemTestPhase:
      editItem?.systemTestPhase || editItem?.systemTestPhase === 0 ? editItem?.systemTestPhase : '',
    uatPhase: editItem?.uatPhase || editItem?.uatPhase === 0 ? editItem?.uatPhase : '',
    rolloutPhase:
      editItem?.rolloutPhase || editItem?.rolloutPhase === 0 ? editItem?.rolloutPhase : '',
    hypercarePhase:
      editItem?.hypercarePhase || editItem?.hypercarePhase === 0 ? editItem?.hypercarePhase : ''
  }
}

export const effortMatrixRoles = [
  {
    value: 'IT Project Manager',
    label: 'IT Project Manager'
  },
  {
    value: 'IT Solution Architect',
    label: 'IT Solution Architect'
  },
  {
    value: 'IT SA',
    label: 'IT SA'
  },
  {
    value: 'IT BA',
    label: 'IT BA'
  },
  {
    value: 'Developer',
    label: 'Developer'
  },
  {
    value: 'QA Officer',
    label: 'QA Officer'
  },
  {
    value: 'DevOps',
    label: 'DevOps'
  },
  {
    value: 'Vendor Tech Lead',
    label: 'Vendor Tech Lead'
  },
  {
    value: 'Vendor Project Manager',
    label: 'Vendor Project Manager'
  },
  {
    value: 'IT Lead',
    label: 'IT Lead'
  }
]
