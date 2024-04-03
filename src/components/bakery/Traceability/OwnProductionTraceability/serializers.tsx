import OwnProductionTraceabilitySummary from "./OwnProductionTraceabilitySummary";

export const toListTableRows = items =>
  items.map(item => ({
    id: item.id,
    summary: <OwnProductionTraceabilitySummary item={item} />,
    borderLeftColor: '#0970E6'
  }))
