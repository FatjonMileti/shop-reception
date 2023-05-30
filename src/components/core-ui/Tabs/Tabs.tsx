import { useEffect, useState } from 'react'
import { Tabs as GeneralTabs } from '@fullscreendigital/carrefour-dex-fe'
import { toTabsWithLabels, toTabs } from './serializers'
import { TabsProps } from './TabsDefinitions'

const Tabs = (props: TabsProps) => {
  const { tabs, labels, value, handleChange, ...rest } = props

  const [selectedValue, setSelectedValue] = useState(0)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const onChange = (_, newValue: number) => setSelectedValue(newValue)

  return (
    <GeneralTabs
      {...rest}
      onChange={handleChange || onChange}
      tabs={labels ? toTabsWithLabels(tabs, labels) : toTabs(tabs)}
      value={selectedValue}
      tabsContainerStyle={{
        borderBottom: 1,
        borderColor: '#E5E5E5',
        padding: '0 24px'
      }}
    />
  )
}

export default Tabs
