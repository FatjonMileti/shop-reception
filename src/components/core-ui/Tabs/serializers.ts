import { renderComponent } from 'utils/dynamicRenderingService'

export const toTabs = (tabs, labels) => tabs.map(tab => ({ ...tab, label: labels[tab.tabIndex], content: renderComponent(tab.content) }))
