import { Table } from '../../../../core-ui/Table'
import { columns, drawerFilters } from './helpers'
import { useState } from 'react'
import { makeCoreGetFileRequest, makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { useNavigate } from 'react-router-dom'
import s from '../../../commonStyles.modules.scss'
import { useQuery } from 'react-query'
import { formatAndDownloadResponse } from 'utils/helpers'
import { EditActionIcon } from 'icons'

const SupportWrongDestination = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [tableItems, setTableItems] = useState<SupportWrongDestination[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception/wrongDestination',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const responseList = response.deliverySupportList

      setTableItems(toTableRowItems(responseList))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const downloadFile = async (id) => {
    try {
      const response = await makeCoreGetFileRequest(`/download/${id}`, {
        responseType: 'blob'
      })
      return formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `Error while downloading file. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        columns={columns(navigate, downloadFile)}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        totalCount={totalCount}
        newButton={null}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        filters={drawerFilters}
        // rowActions={[
        //   {
        //     label: 'Editeaza',
        //     labelColor: 'white',
        //     typographyVariant: 'medium',
        //     backgroundColor: '#16a085',
        //     desktopIcon: <EditActionIcon />,
        //     onClick: (e, rowId) => selectRow(rowId, 'edit')
        //   },
        // ]}
        // rowActionsWidth="130px"
      />
    </div>
  )
}

export default SupportWrongDestination
