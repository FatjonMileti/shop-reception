import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs as GeneralTabs } from '@fullscreendigital/carrefour-dex-fe'
import { TabsProps } from './TabsDefinitions'
import { useMediaQuery } from '@mui/material'

const Tabs = (props: TabsProps) => {
  const { tabs } = props

  let [searchParams, setSearchParams] = useSearchParams()

  const [selectedValue, setSelectedValue] = useState(parseInt(searchParams.get('tab')) || 0)

  useEffect(() => {
    setSelectedValue(parseInt(searchParams.get('tab')))
  }, [searchParams.get('tab')])

  const onChange = (_, newValue: number) => {
    searchParams.set('tab', `${newValue}`)
    setSearchParams(searchParams, { replace: true }) // [~] otherwise, onBack (very annoyingly) cycles through tabs if the user flicked through them several times
  }

  const isXs = useMediaQuery('(max-width:624px)')

  return (
    <GeneralTabs
      onChange={onChange}
      tabs={tabs}
      value={selectedValue}
      tabsContainerStyle={{
        borderBottom: 1,
        borderColor: '#E5E5E5',
        margin: isXs ? '18px 12px 0' : '36px 24px 0'
      }}
      tabContentBoxStyle={{ padding: '0' }}
      tabsStyle={{ fontSize: isXs ? '0.8rem !important' : '1rem' }}
    />
  )
}

export default Tabs
