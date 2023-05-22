import { renderComponent } from 'utils/dynamicRenderingService'

export const toTabs = tabs => tabs.map(tab => ({ ...tab, content: renderComponent(tab.content) }))
