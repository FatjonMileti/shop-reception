import { Tabs } from '@fullscreendigital/carrefour-dex-fe'
import { useState } from 'react'
import { InProgressTasks } from './InProgressTasks'
import { FinalizedTasks } from './FinalizedTasks'
import s from '../../../commonStyles.modules.scss'

const PackagingDisputes = () => {
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
            content: <InProgressTasks />,
            label: 'Task-uri in lucru',
            tabIndex: 0
          },
          {
            content: <FinalizedTasks />,
            label: 'Task-uri finalizate',
            tabIndex: 1
          }
        ]}
        tabsAriaLabel="Litigii ambalaje - Retur magazine"
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

export default PackagingDisputes
