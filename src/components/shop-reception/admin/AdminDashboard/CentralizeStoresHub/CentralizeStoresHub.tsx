import { Tabs } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../commonStyles.modules.scss'
import { useState } from 'react'
import CentralizeStores from './CentralizeStores/CentralizeStores'
import CentralizeHubs from './CentralizeHubs/CentralizeHubs'

const CentralizeStoresHub = () => {
  const [currentTab, setCurrentTab] = useState<number>(0)

  return (
    <div className={s.mainContainer}>
      <Tabs
        containerStyle={{}}
        tabContentBoxStyle={{
          padding: 0
        }}
        tabs={[
          {
            content: <CentralizeStores />,
            label: 'Magazine',
            tabIndex: 0
          },
          {
            content: <CentralizeHubs />,
            label: 'Huburi',
            tabIndex: 1
          }
        ]}
        tabsAriaLabel="Centralizare magazine şi huburi"
        tabsContainerStyle={{
          borderBottom: 1,
          marginBottom: '24px',
          borderColor: '#223fa0',
          '.MuiTabs-flexContainer': {
            '.MuiButtonBase-root': {
              maxWidth: 'fit-content'
            }
          }
        }}
        value={currentTab}
        onChange={(_, value) => setCurrentTab(value)}
      />
    </div>
  )
}

export default CentralizeStoresHub
