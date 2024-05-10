import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { InfoItems } from 'components/core-ui/InfoItems'
import s from '../../../commonStyles.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { formatUIDate } from 'utils/helpers'
import { Tabs } from '@fullscreendigital/carrefour-dex-fe'
import { Details } from './Details'
import { Images } from './Images'
import { StatusTraceability } from './StatusTraceability'

const PackagingDispute = () => {
  const [currentTab, setCurrentTab] = useState<number>(0)

  const { id } = useParams()

  const { showNotification } = useNotification()

  const { data: litigation, refetch } = useQuery(
    ['litigation', id],
    async () => {
      if (id) {
        const result = await makeCoreGetRequest(`/shop-reception/return-litigation/details/${id}`)
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
          { name: litigation?.noticeNumber, label: 'Numar aviz magazin:' },
          { name: litigation?.depositName, label: 'Depozit:' },
          { name: litigation?.noticeDate, label: 'Data aviz magazin:' },
          { name: litigation?.depositType?.value, label: 'Tip depozit:' },
          { name: litigation?.shopName, label: 'Magazin:' },
          { name: litigation?.shopType, label: 'Tip magazin:' },
          { name: litigation?.hubName, label: 'Via:' },
          { name: litigation?.taskDate, label: 'Data task:' },
          {
            name: litigation?.taskExpirationDate,
            label: 'Data expirare task magazin:'
          },
          { name: litigation?.taskStatus, label: 'Status:' }
        ]}
      />
      <Tabs
        containerStyle={{}}
        tabContentBoxStyle={{
          padding: 0
        }}
        tabs={[
          {
            content: (
              <Details
                list={litigation?.supportList || []}
                showMessage={litigation?.showMessage}
                showResponsibility={litigation?.showResponsibility}
                depositUserClassified={litigation?.depositUserClassified}
                refreshData={refetch}
                showAccept={litigation?.showAccept}
                litigationId={litigation?.id}
              />
            ),
            label: 'Detalii',
            tabIndex: 0
          },
          {
            content: <Images pictureModels={litigation?.pictureModels} />,
            label: 'Imagini',
            tabIndex: 1
          },
          {
            content: (
              <StatusTraceability traceabilityReturnTruck={litigation?.traceabilityReturnTruck} />
            ),
            label: 'Transabilitate status',
            tabIndex: 2
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

export default PackagingDispute
