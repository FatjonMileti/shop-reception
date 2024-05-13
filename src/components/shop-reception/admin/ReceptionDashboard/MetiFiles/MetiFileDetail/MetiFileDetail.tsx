import { Grid } from '@mui/material'
import s from '../../../../commonStyles.modules.scss'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { makeCoreGetFileRequest, makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { columns, drawerFilters } from './helpers'
import { Table } from 'components/core-ui/Table'
import { formatAndDownloadResponse } from 'utils/helpers'
import { DownloadIcon } from 'icons'
import { InfoItems } from 'components/core-ui/InfoItems'

const MetiFileDetail = () => {
  const { showNotification } = useNotification()
  const { id } = useParams()
  const location = useLocation()
  const shopCode = new URLSearchParams(location.search).get('shopCode')

  const [tableItems, setTableItems] = useState<MetiFile[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [infoItems, setInfoItems] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/shop-reception/metiIntegrationFile/details/${id}?shopCode=${shopCode}`
        })
      )

      setTableItems(toTableRowItems(response.productList))
      setInfoItems(response)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la obtinerea datelor din tabel. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const exportFile = async (tableState, e) => {
    const { filters, order, orderBy } = tableState
    const url = toTableGETUrl({
      url: `/shop-reception/metiIntegrationFile/detailsExport/${id}`,
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

  return (
    <Grid className={s.mainContainer}>
      <InfoItems
        itemsPerRow={3}
        items={[
          { name: infoItems?.depositName, label: 'Depozit sursa:' },
          { name: infoItems?.shopName, label: 'Magazin destinatie:' },
          { name: infoItems?.ticketExternalId, label: 'Bon livrare:' },
          { name: infoItems?.status, label: 'Status fisier:' }
        ]}
      />

      <Table
        hideCheckbox
        columns={columns}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        filters={drawerFilters}
        toolbarActions={[
          {
            label: 'Export',
            icon: <DownloadIcon />,
            onClick: exportFile
          }
        ]}
      />
    </Grid>
  )
}

export default MetiFileDetail
