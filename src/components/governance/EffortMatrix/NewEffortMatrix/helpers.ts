import * as Yup from "yup";
import { EffortMatrix } from "components/governance/interfaces";

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
  });

export const getInitialValues = (editItem: EffortMatrix) => {
  return editItem
    ? {
      id: editItem.id,
      role: editItem.role,
      evaluationPhase: editItem.evaluationPhase,
      analysisPhase: editItem.analysisPhase,
      designPhase: editItem.designPhase,
      developmentPhase: editItem.developmentPhase,
      systemTestPhase: editItem.systemTestPhase,
      uatPhase: editItem.uatPhase,
      rolloutPhase: editItem.rolloutPhase,
      hypercarePhase: editItem.hypercarePhase
    }
    : {
      role: null,
      evaluationPhase: '',
      analysisPhase: '',
      designPhase: '',
      developmentPhase: '',
      systemTestPhase: '',
      uatPhase: '',
      rolloutPhase: '',
      hypercarePhase: ''
    };
};
