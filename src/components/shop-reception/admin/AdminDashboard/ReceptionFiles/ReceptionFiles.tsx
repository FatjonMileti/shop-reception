import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { Table } from 'components/core-ui/Table'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useMutation, useQuery } from 'react-query'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import s from '../../../commonStyles.modules.scss'
import sModal from 'components/core-ui/Modal/Modal.modules.scss'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import { Button } from '@fullscreendigital/carrefour-dex-fe'

const ReceptionFiles = () => {
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const [exportSelectedRowId, setExportSelectedRowId] = useState(null)
  const [reimportSelectedRowId, setReimportSelectedRowId] = useState(null)

  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const selectRow = id => {
    setReimportSelectedRowId(id)
    openModal()
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/reception-files',
          tableFilters,
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
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { data: shopCodes, isLoading: isShopCodesLoading } = useQuery(
    ['shop-codes'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/shops/codes`)
      return data.list.map(item => ({
        label: item.displayName,
        value: item.code
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea tipurilor de magazine. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const { data: depositOptions, isLoading: isDepositOptionsLoading } = useQuery(
    ['deposits'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/deposits/accessible`)
      return data.map(item => ({
        label: item.displayName,
        value: item.id
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea tipurilor de depozite. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const { data: reasonsOptions, isLoading: isReasonsOptionsLoading } = useQuery(
    ['hubs'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/reception-files/reasons`)
      return data.map(item => ({
        label: item.value,
        value: item.key
      }))
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea huburilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const exportReception = useQuery(
    ['export-reception', exportSelectedRowId],
    async () => {
      setExportSelectedRowId(null)
      return await makeCoreGetRequest(
        `/shop-reception/reception-files/${exportSelectedRowId}/export`
      )
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: exportSelectedRowId !== null
    }
  )

  const mutateReimport = async () => {
    await makeCorePostRequest(`/shop-reception/reception-files/${reimportSelectedRowId}/reimport`)
  }

  const { isLoading: isLoadingMutation, mutate } = useMutation(mutateReimport, {
    onSuccess: () => {
      closeModal()
      showNotification({
        message: `Operatiunea a avut succes.`,
        type: 'success'
      })
      setShouldRefreshData(true)
    },
    onError: res => {
      showNotification({
        message: `${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        columns={columns(setExportSelectedRowId, selectRow)}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        rowActionsWidth="130px"
        filters={drawerFilters(shopCodes, depositOptions, reasonsOptions)}
      />

      <Modal
        isModalOpen={isOpen}
        closeModal={closeModal}
        modalTitle={
          'Eşti sigur că doreşti să reimporti fişierul? Rezultatele vor fi vizibile peste câteva minute.'
        }
      >
        <Grid container spacing={4}>
          <Grid xs={12} item className={sModal.modalButtons}>
            <Button variant="outlined" label={'Nu'} onClick={() => closeModal()} />
            <Button
              variant="contained"
              label={'Da'}
              onClick={() => mutate()}
              disabled={isLoadingMutation}
            />
          </Grid>
        </Grid>
      </Modal>
    </div>
  )
}

export default ReceptionFiles
