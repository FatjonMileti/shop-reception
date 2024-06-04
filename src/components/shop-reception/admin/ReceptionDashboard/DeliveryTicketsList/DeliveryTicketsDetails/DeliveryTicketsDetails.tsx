import { useState } from 'react'
import s from '../../../../commonStyles.modules.scss'
import { Tabs } from '@fullscreendigital/carrefour-dex-fe'
import ViewDetails from './ViewDetails/ViewDetails'
import EditDetails from './EditDetails/EditDetails'
import ReceptionStatus from './ReceptionStatus/ReceptionStatus'
import VerifyStatus from './VerifyStatus/VerifyStatus'

const DeliveryTicketsDetails = () => {
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
            content: <ViewDetails />,
            label: 'Detalii BL',
            tabIndex: 0
          },
          {
            content: <EditDetails />,
            label: 'Modifica BL',
            tabIndex: 1
          },
          {
            content: <ReceptionStatus />,
            label: 'Trasabilitate status receptie',
            tabIndex: 2
          },
          {
            content: <VerifyStatus />,
            label: 'Trasabilitate status verificare',
            tabIndex: 3
          }
        ]}
        tabsAriaLabel="Bonuri de livrare"
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

export default DeliveryTicketsDetails
