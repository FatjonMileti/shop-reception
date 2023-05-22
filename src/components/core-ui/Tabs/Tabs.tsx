import * as React from 'react'
import { Tabs as GeneralTabs } from '@fullscreendigital/carrefour-dex-fe'
import { toTabs } from './serializers'

const Tabs = props => {
  const { tabs, labels, value, handleChange, ...rest } = props

  // console.log("[Tabs] selected value: ", value)
  // console.log("[Tabs] tabs: ", tabs)

  return (
    <GeneralTabs
      {...rest}
      onChange={handleChange}
      tabs={toTabs(tabs, labels)}
      value={value}
      tabContentBoxStyle={{ padding: 0 }}
      tabsStyle={{ flex: 1, maxWidth: 'unset' }}
    />
  )
}

export default Tabs
