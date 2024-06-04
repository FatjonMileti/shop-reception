import { useNotification } from 'hooks'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import s from '../../../commonStyles.modules.scss'
import { InfoItems } from 'components/core-ui/InfoItems'
import { Tabs } from '@fullscreendigital/carrefour-dex-fe'
import { Images } from './Images'
import { Seals } from './Seals'
import { Details } from './Details'
import { StatusTraceability } from './StatusTraceability'
import { formatUIDateTime } from 'utils/helpers'

const ReturnTruck = () => {
  const [currentTab, setCurrentTab] = useState<number>(0)

  const { id } = useParams()

  const { showNotification } = useNotification()

  const { data: details } = useQuery(
    ['details', id],
    async () => {
      if (id) {
        const result = await makeCoreGetRequest(`/shop-reception/return-trucks/${id}/details`)
        return result
      }
      return null
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea detaliilor camionului. ${formatErrorMessage(
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
          { name: details?.shopNames, label: 'Magazin(e):' },
          { name: details?.hubName, label: 'Hub:' },
          { name: details?.depositName, label: 'Depozit:' },
          { name: details?.truckType?.value, label: 'Traseu:' },
          { name: details?.truckNumber, label: 'Numar inmatriculare:' },
          { name: details?.driverName, label: 'Nume sofer:' },
          {
            name: details?.created ? formatUIDateTime(details?.created) : '',
            label: 'Data inregistrare:'
          },
          {
            name: details?.loadingDone ? formatUIDateTime(details?.loadingDone) : '',
            label: 'Data expeditie:'
          },
          { name: details?.truckStatus?.value, label: 'Status:' },
          { name: details?.packageReturn ? 'Da' : 'Nu', label: 'Retur ambalaje:' }
        ]}
      />
      <Tabs
        containerStyle={{}}
        tabContentBoxStyle={{
          padding: 0
        }}
        tabs={[
          {
            content: <Images id={id} />,
            label: 'Imagini',
            tabIndex: 0
          },
          {
            content: <Seals id={id} />,
            label: 'Sigilii',
            tabIndex: 1
          },
          {
            content: <Details id={id} isForShop={details?.truckType.key !== 'HUB_TO_DEPOSIT'} />,
            label: 'Detalii retur',
            tabIndex: 2
          },
          {
            content: <StatusTraceability id={id} />,
            label: 'Trasabilitate status',
            tabIndex: 3
          }
        ]}
        tabsAriaLabel="Litigii ambalaje - Retur magazine"
        tabsContainerStyle={{
          borderBottom: 1,
          marginBottom: '24px',
          marginTop: '24px',
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

export default ReturnTruck
