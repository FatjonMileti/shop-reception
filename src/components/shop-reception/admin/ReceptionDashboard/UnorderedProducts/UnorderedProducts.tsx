import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { toTableRowItems } from './serializers'
import sModal from 'components/core-ui/Modal/Modal.modules.scss'
import s from '../../../commonStyles.modules.scss'
import { useNotification } from 'hooks'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { Table } from 'components/core-ui/Table'
import { useQuery } from 'react-query'
import { Modal } from 'components/core-ui/Modal'
import { Grid } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { DownloadIcon } from 'icons'
import { formatAndDownloadResponse } from 'utils/helpers'
import { getDepositNameOptions, getShopOptions } from '../../api'

const UnorderedProducts = () => {
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState<UnorderedProducts[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<UnorderedProducts>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const closeModal = () => setIsOpen(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/unexpectedReceptionProduct',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setTableItems(toTableRowItems(response.unexpectedReceptionList))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la obtinerea datelor. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const markAsResolved = id => {
    setSelectedRow(id)
    setIsOpen(true)
  }

  const { isLoading: isResolveProductLoading, refetch: resolveProduct } = useQuery(
    ['resolve-product'],
    async id => {
      await makeCoreGetRequest(`/shop-reception/unexpectedReceptionProduct/${selectedRow.id}`)
      setShouldRefreshData(true)
      closeModal()

      return
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la rezolvarea produsului. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

  const exportFile = async (tableState, e) => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: '/shop-reception/unexpectedReceptionProduct/export',
      tableFilters: filters,
      order,
      orderBy
    })

    try {
      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `Error while download file. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const { data: depositOptions } = getDepositNameOptions(showNotification)
  const { data: shopOptions } = getShopOptions(showNotification)

  return (
    <div className={s.mainContainer}>
      <Modal
        isModalOpen={isOpen}
        closeModal={closeModal}
        modalTitle={`Doriti rezolvarea pentru produsul ${selectedRow?.productName}?`}
        modalWidth="50%"
      >
        <Grid xs={12} item className={sModal.modalButtons}>
          <Button variant="outlined" label="Nu" onClick={() => closeModal()} />
          <Button variant="contained" label={'Da'} onClick={() => resolveProduct()} />
        </Grid>
      </Modal>
      <Table
        hideCheckbox
        orderBy="id"
        order="desc"
        columns={columns(markAsResolved)}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        rowActions={[]}
        rowActionsWidth="130px"
        toolbarActions={[
          {
            label: 'Export',
            icon: <DownloadIcon />,
            onClick: exportFile
          }
        ]}
        filters={drawerFilters(shopOptions, depositOptions)}
        filtersLabel="Filtreaza"
        filtersButtonLabel="Filtreaza"
        appliedFiltersLabel="Filtre"
        cancelFiltersButtonLabel="Anuleaza"
        applyFiltersButtonLabel="Aplica"
      />
    </div>
  )
}

export default UnorderedProducts
