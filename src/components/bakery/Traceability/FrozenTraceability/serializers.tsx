import FrozenTraceabilitySummary from "./FrozenTraceabilitySummary";

export const toListTableRows = items =>
  items.map(item => ({
    id: item.id,
    summary: <FrozenTraceabilitySummary item={item} />,
    borderLeftColor: '#0970E6'
  }))
