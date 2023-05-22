import * as React from 'react'
import { Tabs as GeneralTabs } from '@fullscreendigital/carrefour-dex-fe'
import { toTabs } from './serializers'

const Tabs = props => {
  const { tabs, value, handleChange, ...rest } = props

  console.log(value)

  return (
    <GeneralTabs
      {...rest}
      onChange={handleChange}
      tabs={toTabs(tabs)}
      value={value}
      tabContentBoxStyle={{ padding: 0 }}
    />
  )
}

export default Tabs
