import { useState } from 'react'
import { Table } from 'components/core-ui/Table'
import s from './AlertManagement.modules.scss'
import { columns } from './helpers'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { handleQueryError } from 'utils/helpers'
import { useNotification } from 'hooks'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { EditActionIcon } from 'icons'
import { UnsnoozeAlarmModal } from './UnsnoozeAlarmModal'
import { AlertManagementItem } from '../interfaces'

const AlertManagement = () => {
  const [tableItems, setTableItems] = useState<AlertManagementItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [shouldResetPage, setShouldResetPage] = useState<boolean>(false)
  const [selectedRowId, setSelectedRowId] = useState(0)
  const [isUnsnoozeAlarmModalOpen, setIsUnsnoozeAlarmModalOpen] = useState<boolean>(false)

  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/lso/alerts-configuration',
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      handleQueryError(
        error,
        'A aparut o eroare la obtinerea datelor pentru tabel.',
        showNotification
      )
    }
  }

  const openUnsnoozeAlarmModal = (): void => setIsUnsnoozeAlarmModalOpen(true)
  const closeUnsnoozeAlarmModal = (): void => setIsUnsnoozeAlarmModalOpen(false)

  const selectRowId = (rowId: number) => {
    setSelectedRowId(rowId)
    openUnsnoozeAlarmModal()
  }

  return (
    <div className={s.mainContainer}>
      {tableItems.length || isLoading ? (
        <>
          <UnsnoozeAlarmModal
            isModalOpen={isUnsnoozeAlarmModalOpen}
            closeModal={closeUnsnoozeAlarmModal}
            id={selectedRowId}
            setShouldRefreshData={setShouldRefreshData}
          />
          <Table
            hideCheckbox
            orderBy="articleName"
            order="asc"
            columns={columns}
            items={tableItems}
            fetchData={fetchData}
            isLoading={isLoading}
            totalCount={totalCount}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
            shouldResetPage={shouldResetPage}
            setShouldResetPage={setShouldResetPage}
            labelRowsPerPage="Randuri pe pagina:"
            rowActions={[
              {
                label: 'Activeaza alarma',
                labelColor: 'white',
                typographyVariant: 'medium',
                backgroundColor: '#0970E6',
                desktopIcon: <EditActionIcon />,
                onClick: (e, rowId) => selectRowId(rowId)
              }
            ]}
            rowActionsWidth="160px"
          />
        </>
      ) : (
        <Typography variant="regular">Nu exista date de afisat.</Typography>
      )}
    </div>
  )
}

export default AlertManagement
