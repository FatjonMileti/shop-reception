import { columns, drawerFilters } from './helpers'
import { Add as AddIcon } from '@mui/icons-material'
import { useMemo, useState } from 'react'
import { toTableRowItems } from './serializers'
import { EditActionIcon } from 'icons'
import { Box } from '@mui/material'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { Table } from 'components/core-ui/Table'
import { useNotification } from 'hooks'
import s from '../../../commonStyles.modules.scss'
import { useQuery } from 'react-query'
import NoticeSeriesNumberModal from './NoticeSeriesNumberModal/NoticeSeriesNumberModal'

const NoticeSeriesNumberList = () => {
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<NoticeSeriesNumber[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<NoticeSeriesNumber>()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const openNewModal = () => setIsNewModalOpen(true)
  const closeNewModal = () => setIsNewModalOpen(false)

  const openEditModal = () => setIsEditModalOpen(true)
  const closeEditModal = () => setIsEditModalOpen(false)

  const selectRow = (rowId: number | string) => {
    setSelectedRow(tableItems.find(item => item.id === rowId))
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/notice-series-numbers',
          page,
          rowsPerPage,
          order,
          orderBy,
          tableFilters
        })
      )

      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la obtinerea datelor din tabel. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { data: societyOptions, isLoading: isSocietyOptionsLoading } = useQuery(
    ['society-options'],
    async () => {
      const result = await makeCoreGetRequest(`/shop-reception/parentSociety`)
      const resultOptions = result.parentSocietyList.map(item => ({
        label: item.parentSocietyName,
        value: item.parentSocietyName
      }))
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea societatilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const filters = useMemo(() => drawerFilters(societyOptions), [societyOptions])

  return (
    <div className={s.mainContainer}>
      <Box>
        <NoticeSeriesNumberModal
          isModalOpen={isNewModalOpen}
          closeModal={closeNewModal}
          setShouldRefreshData={setShouldRefreshData}
          societyOptions={societyOptions}
        />
        <NoticeSeriesNumberModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          setShouldRefreshData={setShouldRefreshData}
          editItem={selectedRow}
          isEdit
          societyOptions={societyOptions}
        />
        <Table
          hideCheckbox
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActionsWidth="130px"
          filters={filters}
          rowsPerPage={10}
          rowsPerPageOptions={[10, 20, 50]}
          toolbarActions={[
            {
              label: 'Adauga',
              icon: <AddIcon />,
              onClick: () => openNewModal()
            }
          ]}
          rowActions={[
            {
              label: 'Edit',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (e, rowId) => {
                selectRow(rowId)
                openEditModal()
              }
            }
          ]}
          filtersLabel="Filtreaza"
          filtersButtonLabel="Filtreaza"
          appliedFiltersLabel="Filtre"
          cancelFiltersButtonLabel="Anuleaza"
          applyFiltersButtonLabel="Aplica"
        />
      </Box>
    </div>
  )
}

export default NoticeSeriesNumberList
