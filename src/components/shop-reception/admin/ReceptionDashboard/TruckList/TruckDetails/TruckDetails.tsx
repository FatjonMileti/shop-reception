import { Tabs } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../../commonStyles.modules.scss'
import { useState } from 'react'
import { InfoItems } from 'components/core-ui/InfoItems'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { useParams } from 'react-router-dom'
import TruckSupport from './TruckSupport/TruckSupport'
import VerifyStatus from './VerifyStatus/VerifyStatus'
import ReceptionStatus from './ReceptionStatus/ReceptionStatus'
import ThermodiagramConformity from './ThermodiagramConformity/ThermodiagramConformity'
import DocumentsConformity from './DocumentsConformity/DocumentsConformity'
import Seals from './Seals/Seals'
import Images from './Images/Images'

const TruckDetails = () => {
  const { showNotification } = useNotification()
  const [currentTab, setCurrentTab] = useState<number>(0)
  const { id } = useParams()
  const shopCode = new URLSearchParams(location.search).get('shopCode')

  const { data: truck } = useQuery(
    ['truck-details', id],
    async () => {
      if (id) {
        const result = await makeCoreGetRequest(
          `/shop-reception/truck/details/${id}?shopCode=${shopCode}`
        )
        return result
      }
      return null
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea detaliilor litigiului. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <div className={s.mainContainer}>
      <InfoItems
        itemsPerRow={3}
        items={[
          { name: truck?.flowTypeValue, label: 'Locaţie camion:' },
          { name: truck?.truckNumber, label: 'Număr înmatriculare:' },
          { name: truck?.driverName, label: 'Cod şofer:' },
          { name: truck?.transportCode, label: 'Cod cursă:' },
          { name: truck?.deliveryStatusValue, label: 'Status transport:' },
          { name: truck?.sealCodes, label: 'Sigiliu/sigilii:' },
          { name: truck?.depositName, label: 'Depozit:' },
          { name: truck?.shopName, label: 'Magazin:' },
          { name: truck?.hubName, label: 'HUB:' }
        ]}
      />

      <Tabs
        containerStyle={{}}
        tabContentBoxStyle={{
          padding: 0
        }}
        tabs={[
          {
            content: <TruckSupport truck={truck} />,
            label: 'Suporti in camion',
            tabIndex: 0
          },
          {
            content: <Images />,
            label: 'Imagini',
            tabIndex: 1
          },
          {
            content: <Seals />,
            label: 'Sigilii',
            tabIndex: 2
          },
          {
            content: <DocumentsConformity />,
            label: 'Conformitate documente si interval orar',
            tabIndex: 3
          },
          {
            content: <ThermodiagramConformity />,
            label: 'Conformitate termodiagrama',
            tabIndex: 4
          },
          {
            content: <ReceptionStatus />,
            label: 'Trasabilitate status receptie',
            tabIndex: 5
          },
          {
            content: <VerifyStatus />,
            label: 'Trasabilitate status verificare',
            tabIndex: 6
          }
        ]}
        tabsAriaLabel="Lista camioane marfa"
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

export default TruckDetails
