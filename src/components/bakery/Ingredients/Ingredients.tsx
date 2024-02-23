import { Box } from '@mui/material'
import s from '../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import React, { useState } from 'react'
import { useNotification } from 'hooks'
import { IngredientItem, ValueLabelInterface } from '../interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import { columns } from './helpers'
import { toTableRowItems } from './serializers'
import { EditBatch } from './EditBatch'
import { EditActionIcon } from 'icons'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { useQuery } from 'react-query'
import { FamilyItem } from '../StoreManagerRole/interfaces'

const Ingredients = () => {
  const [tableItems, setTableItems] = useState<IngredientItem[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const families = useQuery(
    ['families-store'],
    async () => {
      const result = await makeCoreGetRequest(`/bakery/store/families/ingredients`)
      const resultOptions = result.map(
        (item: FamilyItem): ValueLabelInterface => ({
          label: item.name,
          value: item.id
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching families dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const openEditModal = (): void => setIsEditModalOpen(true)
  const closeEditModal = (): void => setIsEditModalOpen(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters, searchText }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/product/management/ingredients',
          filters: [],
          searchFields: ['name', 'metiCode', 'pluCode'],
          searchText,
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

  const selectRow = (rowId: number, action: string) => {
    setSelectedRowId(rowId)

    if (action === 'edit') {
      openEditModal()
    }
  }

  const drawerFilters = [
    {
      name: 'family',
      value: undefined,
      filter: (
        <Autocomplete
          variant="outlined"
          label="Familie"
          disableClearable
          options={families.data || []}
          multiple
        />
      ),
      type: 'autocomplete',
      label: 'Familie',
      clearFiltersOnChange: ['subfamily']
    },
    {
      name: 'batch',
      value: undefined,
      filter: (
        <Autocomplete
          variant="outlined"
          label="Lot"
          disableClearable
          options={[
            { value: 'true', label: 'Da' },
            { value: 'false', label: 'Nu' }
          ]}
        />
      ),
      type: 'autocomplete',
      label: 'Lot'
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Box>
        <EditBatch
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          setShouldRefreshData={setShouldRefreshData}
          editProductId={selectedRowId}
        />
        <Table
          hideCheckbox
          hasSearchInput
          columns={columns}
          items={tableItems}
          fetchData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActions={[
            {
              label: 'Editeaza',
              labelColor: 'white',
              typographyVariant: 'medium',
              backgroundColor: '#16a085',
              desktopIcon: <EditActionIcon />,
              onClick: (e, rowId) => selectRow(rowId, 'edit')
            }
          ]}
          filters={drawerFilters}
          rowActionsWidth="130px"
        />
      </Box>
    </div>
  )
}

export default Ingredients
