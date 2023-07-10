import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs as GeneralTabs } from '@fullscreendigital/carrefour-dex-fe'
import { toTabsWithLabels, toTabs } from './serializers'
import { TabsProps } from './TabsDefinitions'

const Tabs = (props: TabsProps) => {
  const { tabs, labels, value, handleChange, ...rest } = props

  let [searchParams, setSearchParams] = useSearchParams()

  const [selectedValue, setSelectedValue] = useState(0)

  useEffect(() => {
    setSelectedValue(parseInt(searchParams.get('tab')) || value)
  }, [value, searchParams.get('tab')])

  const onChange = (_, newValue: number) => {
    searchParams.set("tab", `${newValue}`)
    setSearchParams(searchParams, { replace: true }) // [~] otherwise, onBack (very annoyingly) cycles through tabs if the user flicked through them several times
  }

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
      tabContentBoxStyle={{ padding: '0' }}
    />
  )
}

export default Tabs
