import { Grid } from '../../../Common/Grid'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { SubFamilyValidityThresholdForm } from './SubFamilyValidityThresholdForm'

const SubFamilyValidityThreshold = () => {
  const [tableItems, setTableItems] = useState<SubFamilyValidityThreshold[]>([
    {
      id: 1,
      subfamilyCode: 'CRAIOVA (3054)',
      familyCode: 'CRAIOVA (3054)',
      subfamily: 'DEPOZIT BRAZI NON FOOD',
      family: 'PH01DEP',
      districtCode: 'DEPOZITBRA',
      district: 'DEPOZITBRA',
      validityThreshold: '3095940'
    }
  ])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<SubFamilyValidityThreshold>(null)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const openEditForm = (rowId: number | string) => {
    selectRow(rowId)
    setIsOpenEditModal(true)
  }
  const closeEditForm = () => setIsOpenEditModal(false)
  const selectRow = (rowId: number | string) => {
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
        <TitleHeader title='Prag valabilitate subfamilii' />,
        <Grid
          hasPaper={true}
          items={[
            <Input
              type='select'
              onChange={event => null}
              label='Subfamilie'
              variant='outlined'
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează subfamilie',
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
            />
          ]}
          itemsPerRow={4}
        />,
        <>
          <SubFamilyValidityThresholdForm
            isModalOpen={isOpenEditModal}
            closeModal={closeEditForm}
            setShouldRefreshData={setShouldRefreshData}
            editItem={selectedRow}
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
                onClick: (e, rowId) => openEditForm(rowId)
              }
            ]}
            rowActionsWidth='130px'
          />
        </>
      ]}
      itemsPerRow={1}
    />
  )
}

export default SubFamilyValidityThreshold
