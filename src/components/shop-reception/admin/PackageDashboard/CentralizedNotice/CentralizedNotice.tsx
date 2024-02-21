import { Grid } from '../../../Common/Grid'
import { useNavigate } from 'react-router-dom'
import { Table } from 'components/core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import { DownloadIcon } from 'icons'
import { Input, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'

const CentralizedNotice = () => {
  const navigate = useNavigate()
  const [tableItems, setTableItems] = useState<CentralizedNotice[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<CentralizedNotice>()
  const { showNotification } = useNotification()

  const openEditModal = (rowId: number|string): void => {
    selectRow(rowId)
    setIsEditModalOpen(true)
  }
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const selectRow = (rowId: number|string) => {
    const row = tableItems.find(item => item.id === rowId)
    if (row) {
      setSelectedRow(row)
    }
  }


  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/packagingIntory',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const responseList = response.list

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

  return (
    <Grid
      items={[
        <TitleHeader title='Aviz Centralizator' />,
        <Grid
          hasPaper={true}
          items={[
            <Input
              type='select'
              onChange={event => null}
              label='Selectează magazin'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează magazin',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează hub'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează hub',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează depozit/funizor'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează depozit/funizor',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Selectează retur ambalaje'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează retur ambalaje',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Număr carnion hub'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Aviz magazin'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Nume șofer hub'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Nume șofer magazin'
              variant='outlined'
              style={{ width: '100%' }}
            />,
            <DatePicker
              label="Selectează dată hub de la"
              variant="outlined"
              value={dayjs()}
              onChange={() => null}
              style={{ width: '100%' }}
            />,
            <DatePicker
              label="Selectează dată hub pănă la"
              variant="outlined"
              value={dayjs()}
              onChange={() => null}
              style={{ width: '100%' }}
            />,
            <DatePicker
              label="Selectează dată magazin de la"
              variant="outlined"
              value={dayjs()}
              onChange={() => null}
              style={{ width: '100%' }}
            />,
            <DatePicker
              label="Selectează dată magazin pănă la"
              variant="outlined"
              value={dayjs()}
              onChange={() => null}
              style={{ width: '100%' }}
            />
          ]}
          itemsPerRow={4}
        />,
        <Table
          hideCheckbox
          orderBy='role'
          order='asc'
          columns={columns}
          items={tableItems}
          fetchData={() => {}}
          isLoading={isLoading}
          totalCount={totalCount}
          newButton={null}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          toolbarActions={[
            {
              label: 'Export',
              icon: <DownloadIcon />,
              onClick: () => null
            }
          ]}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default CentralizedNotice
