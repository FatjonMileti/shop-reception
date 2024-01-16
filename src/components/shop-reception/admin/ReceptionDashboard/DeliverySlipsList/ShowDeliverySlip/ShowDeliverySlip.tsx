import { Tabs } from '@fullscreendigital/carrefour-dex-fe'
import React, { useState } from 'react'
import Tab1 from './Tab1'
import Tab2 from './Tab2'

const ShowDeliverySlip = () => {
  const [tab, setTab] = useState<number>(0)
  return (
    <Tabs
      containerStyle={{
        width: '100%',
        paddingTop: '20px'
      }}
      onChange={(event, value) => {
        setTab(value)
      }}
      tabContentBoxStyle={{
        padding: 0
      }}
      tabs={[
        {
          content: Tab1(),
          label: 'Detalii BL',
          tabIndex: 0
        },
        {
          content: Tab2(),
          label: 'Modifică BL',
          tabIndex: 1
        }
      ]}
      tabsAriaLabel='basic tabs example'
      tabsContainerStyle={{
        borderBottom: 1,
        borderColor: '#223fa0'
      }}
      value={tab}
    />
  )
}

export default ShowDeliverySlip
