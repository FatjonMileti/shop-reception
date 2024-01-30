import { Grid } from '../../../Common/Grid'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { Add as AddIcon, CloudDownload as CloudDownloadIcon } from '@mui/icons-material'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { PackingTypeForm } from './PackingTypeForm'

const PackingTypes = () => {
  const [tableItems, setTableItems] = useState<PackingType[]>([
    {
      id: 1,
      packagingCode: 'CRAIOVA (3054)',
      additionalCodes: 'DEPOZIT BRAZI NON FOOD',
      name: 'PH01DEP',
      main: 'DEPOZITBRA',
      combination: false,
      active: true,
      return: true,
      generatedBarcode: 'Înregistrat'
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<PackingType>()
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const openNewModal = (): void => setIsNewModalOpen(true)
  const closeNewModal = (): void => setIsNewModalOpen(false)

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
          url: '/reception-mobile-api/rm-api/truck/list',
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
        <TitleHeader title='Administrare tipuri de ambalaje' />,
        <Grid
          hasPaper={true}
          items={[
            <Input
              type='select'
              onChange={event => null}
              label='Magazin'
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
              label='Raion'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează raion',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Familie'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează familie',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Subfamilie'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează Subfamilie',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='select'
              onChange={event => null}
              label='Cod UB'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează cod UB',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Cod produs'
              variant='outlined'
              style={{ width: '100%' }}
            />
          ]}
          itemsPerRow={4}
        />,
        <>
          <PackingTypeForm
            isModalOpen={isNewModalOpen}
            closeModal={closeNewModal}
            setShouldRefreshData={setShouldRefreshData}
          />
          <PackingTypeForm
            isModalOpen={isEditModalOpen}
            closeModal={closeEditModal}
            setShouldRefreshData={setShouldRefreshData}
            editItem={selectedRow}
            isEdit
          />
          <Table
            hideCheckbox
            orderBy='role'
            order='asc'
            columns={columns}
            items={tableItems}
            fetchData={() => {}}
            isLoading={isLoading}
            totalCount={totalCount}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
            rowActions={[
              {
                label: 'Edit',
                labelColor: 'white',
                typographyVariant: 'medium',
                backgroundColor: '#16a085',
                onClick: (e, rowId) => openEditModal(rowId)
              }
            ]}
            rowActionsWidth='130px'
            toolbarActions={[
              {
                label: 'Export',
                icon: <CloudDownloadIcon />,
                onClick: null
              },
              {
                label: 'Tip ambalaj',
                icon: <AddIcon />,
                onClick: openNewModal
              }
            ]}
          />
        </>
      ]}
      itemsPerRow={1}
    />
  )
}

export default PackingTypes
