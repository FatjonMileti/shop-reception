import { EffortMatrix } from "../interfaces"

export const toTableRowItems = (items: EffortMatrix[]) => items.map((item: EffortMatrix) => ({
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
}))