import { Box, CircularProgress, Grid } from '@mui/material'
import { Table } from 'components/core-ui/Table'
import s from './CollaboratorsTab.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification, usePermissions } from 'hooks'
import { useState } from 'react'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import {
  CRUDAction,
  EmployeeManagementItem,
  ValueLabelInterface
} from 'components/volumetry/interfaces'
import { columns } from './helpers'
import { DeleteCollaborator } from './DeleteCollaborator'
import { CreateEditCollaborator } from './CreateEditCollaborator'
import { AddActionIcon, DeleteActionIcon, EditActionIcon } from 'icons'
import { Autocomplete, FilterDataSelect, Input } from '@fullscreendigital/carrefour-dex-fe'
import {
  getDepartmentsOptions,
  getContractorsNamesOptions,
  getJobTitlesOptions,
  getLocationsOptions
} from 'components/volumetry/api'
import { handleQueryError } from 'components/volumetry/utils'
import { roles } from '../helpers'

const CollaboratorsTab = () => {
  // TODO: De actualizat cand primim update cu drepturile fiecarui rol
  const { canUseCustomFilter } = usePermissions(roles)

  const [locationsFilterValue, setLocationsFilterValue] = useState<ValueLabelInterface>(null)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tableItems, setTableItems] = useState<EmployeeManagementItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedRow, setSelectedRow] = useState<EmployeeManagementItem>(null)
  const [modal, setModal] = useState<CRUDAction>(null)

  const openModal = (action: CRUDAction) => setModal(action)
  const closeModal = () => setModal(null)

  const selectRowId = (rowId: number, action: CRUDAction) => {
    const item = tableItems.find((item: EmployeeManagementItem) => item.id === rowId)
    setSelectedRow(item)
    openModal(action)
  }

  const { showNotification } = useNotification()

  const { data: departmentsOptions, isLoading: isDepartmentsOptionsLoading } =
    getDepartmentsOptions(showNotification)
  const { data: contractorsNamesOptions } = getContractorsNamesOptions(showNotification)
  const { data: jobTitlesOptions, isLoading: isjobTitlesOptionsLoading } =
    getJobTitlesOptions(showNotification)
  const { data: locationsOptions, isLoading: isLocationsLoading } = getLocationsOptions(
    showNotification,
    setLocationsFilterValue,
    canUseCustomFilter
  )

  const handleFilterChange = value => {
    setLocationsFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/volumetry/workers/contractors',
          filters: canUseCustomFilter
            ? [{ name: 'location', value: locationsFilterValue.value }]
            : [],
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
      handleQueryError(error, 'A aparut o eroare la obtinerea colaboratorilor.', showNotification)
    }
  }

  const tableFilterFields = [
    {
      name: 'fullName',
      label: 'Nume',
      type: 'text',
      value: '',
      filter: <Input type="text" name="fullName" label="Nume" variant="outlined" value="" />
    },
    {
      name: 'department',
      label: 'Departament',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Departament"
          options={departmentsOptions}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
      )
    },
    {
      name: 'position',
      label: 'Functie',
      type: 'autocomplete',
      value: '',
      filter: (
        <Autocomplete
          variant="outlined"
          label="Functie"
          options={jobTitlesOptions}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
      )
    }
  ]

  return (
    <div className={s.mainContainer}>
      {canUseCustomFilter && (
        <Grid sx={{ width: '100%', display: 'block' }} container>
          {isLocationsLoading ? (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            </div>
          ) : (
            <Grid item style={{ display: 'block', padding: 0 }}>
              <FilterDataSelect
                name="location"
                defaultSelectedData={locationsFilterValue}
                label="Magazin:"
                showCounter={true}
                showSearch={true}
                counterLabel="Selecteaza magazin"
                noDataFoundLabel="Nu s-au gasit rezultate."
                options={locationsOptions}
                onSelect={handleFilterChange}
              />
            </Grid>
          )}
        </Grid>
      )}
      <Box>
        <CreateEditCollaborator
          isModalOpen={modal === 'create'}
          closeModal={closeModal}
          setShouldRefreshData={setShouldRefreshData}
          departmentsOptions={departmentsOptions}
          isDepartmentsOptionsLoading={isDepartmentsOptionsLoading}
          jobTitlesOptions={jobTitlesOptions}
          isjobTitlesOptionsLoading={isjobTitlesOptionsLoading}
        />
        <DeleteCollaborator
          isModalOpen={modal === 'delete'}
          closeModal={closeModal}
          itemId={selectedRow?.id}
          setShouldRefreshData={setShouldRefreshData}
        />
        <CreateEditCollaborator
          isModalOpen={modal === 'edit'}
          closeModal={closeModal}
          editItem={selectedRow}
          setShouldRefreshData={setShouldRefreshData}
          departmentsOptions={departmentsOptions}
          isDepartmentsOptionsLoading={isDepartmentsOptionsLoading}
          jobTitlesOptions={jobTitlesOptions}
          isjobTitlesOptionsLoading={isjobTitlesOptionsLoading}
        />

        {canUseCustomFilter ? (
          locationsFilterValue && (
            <Table
              hideCheckbox
              orderBy="department"
              order="desc"
              columns={columns}
              items={tableItems}
              fetchData={fetchData}
              isLoading={isLoading}
              totalCount={totalCount}
              shouldRefreshData={shouldRefreshData}
              setShouldRefreshData={setShouldRefreshData}
              filters={tableFilterFields}
              rowActions={[
                {
                  label: 'Edit',
                  labelColor: 'white',
                  typographyVariant: 'medium',
                  backgroundColor: '#16a085',
                  desktopIcon: <EditActionIcon />,
                  onClick: (_e, rowId: number) => selectRowId(rowId, 'edit')
                },
                {
                  label: 'Delete',
                  labelColor: 'white',
                  typographyVariant: 'medium',
                  backgroundColor: '#d9534f',
                  desktopIcon: <DeleteActionIcon />,
                  onClick: (_e, rowId: number) => selectRowId(rowId, 'delete')
                }
              ]}
              rowActionsWidth="130px"
              toolbarActions={[
                {
                  label: 'Add',
                  icon: <AddActionIcon />,
                  onClick: () => setModal('create') // TODO: To verify permissions with the BE
                }
              ]}
            />
          )
        ) : (
          <Table
            hideCheckbox
            orderBy="department"
            order="desc"
            columns={columns}
            items={tableItems}
            fetchData={fetchData}
            isLoading={isLoading}
            totalCount={totalCount}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
            filters={tableFilterFields}
            rowActions={[
              {
                label: 'Edit',
                labelColor: 'white',
                typographyVariant: 'medium',
                backgroundColor: '#16a085',
                desktopIcon: <EditActionIcon />,
                onClick: (_e, rowId: number) => selectRowId(rowId, 'edit')
              },
              {
                label: 'Delete',
                labelColor: 'white',
                typographyVariant: 'medium',
                backgroundColor: '#d9534f',
                desktopIcon: <DeleteActionIcon />,
                onClick: (_e, rowId: number) => selectRowId(rowId, 'delete')
              }
            ]}
            rowActionsWidth="130px"
            toolbarActions={[
              {
                label: 'Add',
                icon: <AddActionIcon />,
                onClick: () => setModal('create') // TODO: To verify permissions with the BE
              }
            ]}
          />
        )}
      </Box>
    </div>
  )
}

export default CollaboratorsTab
