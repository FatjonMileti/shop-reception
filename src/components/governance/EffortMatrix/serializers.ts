export const toTableRowItems = items => items.map(item => ({
  id: item.id,
  role: item.role,
  evaluationPhase: item.evaluationPhase,
  analysisPhase: item.analysisPhase,
  designPhase: item.designPhase,
  developmentPhase: item.developmentPhase,
  systemTestPhase: item.systemTestPhase,
  uatPhase: item.uatPhase,
  rolloutPhase: item.rolloutPhase,
  hypercarePhase: item.hypercarePhase
}));