export const toEffortMatrixPayload = values => ({
  role: values.role.value,
  evaluationPhase: +values.evaluationPhase,
  analysisPhase: +values.analysisPhase,
  designPhase: +values.designPhase,
  developmentPhase: +values.developmentPhase,
  systemTestPhase: +values.systemTestPhase,
  uatPhase: +values.uatPhase,
  rolloutPhase: +values.rolloutPhase,
  hypercarePhase: +values.hypercarePhase
})
