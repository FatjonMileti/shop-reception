import { useEffect, useMemo, useState } from 'react'
import { Box, Grid, Paper, debounce } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import s from './TeamDayOffManagement.modules.scss'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import { useNotification, usePermissions } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { Table } from 'components/core-ui/Table'
import { Input } from 'components/core-ui/Input'
import { NewTimeOff } from './NewTimeOff'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Delete, Edit } from '@mui/icons-material'
import { DeleteTimeOff } from './DeleteTimeOff'

// const table = {
//   action: {
//     url: '/governance/teamTimeOff',
//     type: 'GET'
//   },
//   hideCheckbox: true,
//   orderBy: 'teamMember.name',
//   order: 'asc',
//   columns: [
//     {
//       title: 'Person',
//       field: 'teamMember.name',
//       align: 'left',
//       type: 'string'
//     },
//     {
//       title: 'Day-Off Type',
//       field: 'dayOffType',
//       align: 'left',
//       type: 'string'
//     },
//     {
//       title: 'Start Date',
//       field: 'startDate',
//       align: 'left',
//       collapsible: true,
//       type: 'date'
//     },
//     {
//       title: 'End Date',
//       field: 'endDate',
//       align: 'left',
//       collapsible: true,
//       type: 'date'
//     },
//     {
//       title: 'Hours',
//       field: 'numberOfHours',
//       align: 'left',
//       collapsible: true,
//       type: 'number'
//     }
//   ],
//   tableActions: {
//     newAction: {
//       allowedRoles: [
//         'GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN',
//         'GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL',
//         'GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER'
//       ],
//       modalTitle: 'New Time Off',
//       formItems: [
//         {
//           UIComponent: 'AsyncAutocomplete',
//           type: 'autocomplete',
//           action: {
//             url: '/governance/teamMembers',
//             type: 'GET',
//             valueKey: 'id',
//             labelKey: 'name',
//             filterQueryKey: 'domain',
//             localQueryKey: 'teamMember.domain'
//           },
//           variant: 'standard',
//           name: 'teamMember.name',
//           width: '100%',
//           label: 'Person name',
//           payloadKey: 'teamMember.id',
//           required: true
//         },
//         {
//           UIComponent: 'Input',
//           type: 'select',
//           values: [
//             {
//               value: 'Public Holiday',
//               label: 'Public Holiday'
//             },
//             {
//               value: 'Day-Off',
//               label: 'Day-Off'
//             },
//             {
//               value: 'Team Event',
//               label: 'Team Event'
//             }
//           ],
//           name: 'dayOffType',
//           variant: 'standard',
//           width: '100%',
//           label: 'Type of day-off',
//           required: true
//         },
//         {
//           UIComponent: 'DatePicker',
//           type: 'date',
//           name: 'startDate',
//           style: {
//             width: '100%'
//           },
//           label: 'Start Date',
//           variant: 'standard',
//           defaultValue: '#CURRENT_DATE',
//           required: true
//         },
//         {
//           UIComponent: 'DatePicker',
//           type: 'date',
//           name: 'endDate',
//           style: {
//             width: '100%'
//           },
//           label: 'End Date',
//           variant: 'standard',
//           defaultValue: '#CURRENT_DATE',
//           required: true
//         },
//         {
//           UIComponent: 'Input',
//           type: 'number',
//           variant: 'standard',
//           name: 'numberOfHours',
//           width: '100%',
//           label: 'Number of hours',
//           id: 'hours',
//           dependencies: {
//             conditions: {
//               operator: 'equal',
//               value: true,
//               params: 'startDate|endDate'
//             },
//             UIAttributes: {
//               onSuccess: {
//                 inputProps: {
//                   hidden: false
//                 }
//               },
//               onFailure: {
//                 inputProps: {
//                   hidden: true
//                 }
//               }
//             }
//           }
//         }
//       ],
//       formItemsPerRow: 1,
//       formButtons: [
//         {
//           UIComponent: 'Button',
//           label: 'Cancel',
//           variant: 'outlined',
//           isCancelButton: true
//         },
//         {
//           UIComponent: 'Button',
//           label: 'Save',
//           variant: 'contained',
//           isSaveButton: true
//         }
//       ],
//       formAction: {
//         type: 'POST',
//         url: '/governance/teamTimeOff'
//       }
//     },
//     filters: [
//       {
//         UIComponent: 'Input',
//         type: 'text',
//         name: 'teamMember.name',
//         label: 'Team Member',
//         variant: 'standard'
//       }
//     ]
//   },
//   tableRowActions: {
//     editAction: {
//       updateUrl: '/governance/teamTimeOff/:id',
//       updateUrlType: 'PUT',
//       getUrl: '/governance/teamTimeOff',
//       getUrlType: 'GET',
//       allowedRoles: [
//         'GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN',
//         'GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL',
//         'GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER'
//       ],
//       formInfoItems: [
//         {
//           name: 'teamMember.name',
//           label: 'Person name'
//         }
//       ],
//       formItems: [
//         {
//           UIComponent: 'Input',
//           type: 'select',
//           values: [
//             {
//               value: 'Public Holiday',
//               label: 'Public Holiday'
//             },
//             {
//               value: 'Day-Off',
//               label: 'Day-Off'
//             },
//             {
//               value: 'Team Event',
//               label: 'Team Event'
//             }
//           ],
//           name: 'dayOffType',
//           variant: 'standard',
//           width: '100%',
//           label: 'Type of day-off',
//           required: true
//         },
//         {
//           UIComponent: 'DatePicker',
//           type: 'date',
//           name: 'startDate',
//           style: {
//             width: '100%'
//           },
//           label: 'Start Date',
//           variant: 'standard',
//           required: true
//         },
//         {
//           UIComponent: 'DatePicker',
//           type: 'date',
//           name: 'endDate',
//           style: {
//             width: '100%'
//           },
//           label: 'End Date',
//           variant: 'standard',
//           required: true
//         },
//         {
//           UIComponent: 'Input',
//           type: 'number',
//           variant: 'standard',
//           name: 'numberOfHours',
//           width: '100%',
//           label: 'Number of hours',
//           id: 'hours',
//           dependencies: {
//             conditions: {
//               operator: 'equal',
//               value: true,
//               params: 'startDate|endDate'
//             },
//             UIAttributes: {
//               onSuccess: {
//                 inputProps: {
//                   hidden: false
//                 }
//               },
//               onFailure: {
//                 inputProps: {
//                   hidden: true
//                 }
//               }
//             }
//           }
//         }
//       ],
//       formItemsPerRow: 1,
//       formButtons: [
//         {
//           UIComponent: 'Button',
//           label: 'Cancel',
//           variant: 'outlined',
//           isCancelButton: true
//         },
//         {
//           UIComponent: 'Button',
//           label: 'Save',
//           variant: 'contained',
//           isSaveButton: true
//         }
//       ]
//     },
//     deleteAction: {
//       url: '/governance/teamTimeOff',
//       allowedRoles: [
//         'GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN',
//         'GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL',
//         'GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER'
//       ],
//       confirmText: 'Are you sure you want to delete this entry?',
//       formButtons: [
//         {
//           UIComponent: 'Button',
//           label: 'Cancel',
//           variant: 'outlined',
//           isCancelButton: true
//         },
//         {
//           UIComponent: 'Button',
//           label: 'Delete',
//           variant: 'contained',
//           isDeleteButton: true
//         }
//       ]
//     }
//   }
// }

const columns = [
  {
    title: 'Person',
    field: 'teamMemberName',
    align: 'left'
  },
  {
    title: 'Day-Off Type',
    field: 'dayOffType',
    align: 'left'
  },
  {
    title: 'Start Date',
    field: 'startDate',
    align: 'left',
    collapsible: true
  },
  {
    title: 'End Date',
    field: 'endDate',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Hours',
    field: 'numberOfHours',
    align: 'left',
    collapsible: true,
    disableSorting: true
  }
]

const TeamDayOffManagement = () => {
  const [domainFilterValue, setDomainFilterValue] = useState(null)
  const [filterOptions, setFilterOptions] = useState([])
  const [tableItems, setTableItems] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [teamMembers, setTeamMembers] = useState(null)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedEditRow, setSelectedEditRow] = useState(0)
  const [selectedDeleteRow, setSelectedDeleteRow] = useState(0)
  const [shouldRefreshData, setShouldRefreshData] = useState(false)

  const { showNotification } = useNotification()

  const { canCreate, canEdit, canDelete } = usePermissions({
    createRoles: [
      'GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN',
      'GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL',
      'GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER'
    ],
    editRoles: [
      'GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN',
      'GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL',
      'GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER'
    ],
    deleteRoles: [
      'GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN',
      'GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL',
      'GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER'
    ]
  })

  useEffect(() => {
    ;(async () => {
      try {
        const result = await makeCoreGetRequest('/governance/domains')

        const resultOptions = toAsyncSelectOptions(result, 'domain', 'domain') || []
        setFilterOptions(resultOptions)
      } catch (error) {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    })()
  }, [])

  useEffect(() => {
    if (filterOptions.length) {
      setDomainFilterValue(filterOptions[0])
    }
  }, [filterOptions])

  useEffect(() => {
    if (domainFilterValue) {
      ;(async () => {
        try {
          const result = await makeCoreGetRequest(
            `/governance/teamMembers?page=-1&filterBy=domain&filterValue=${encodeURIComponent(
              domainFilterValue?.value
            )}`
          )
          const resultOptions = toAsyncSelectOptions(result.list, 'id', 'name') || []
          setTeamMembers(resultOptions)
        } catch (error) {
          showNotification({
            message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        }
      })()
    }
  }, [domainFilterValue])

  const openNewModal = () => setIsNewModalOpen(true)

  const closeNewModal = () => setIsNewModalOpen(false)

  const openEditModal = () => setIsEditModalOpen(true)

  const closeEditModal = () => setIsEditModalOpen(false)

  const openDeleteModal = () => setIsDeleteModalOpen(true)

  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  const selectEditRow = row => {
    setSelectedEditRow(row)
    openEditModal()
  }

  const selectDeleteRow = row => {
    setSelectedDeleteRow(row)
    openDeleteModal()
  }

  const columnsWithActions = useMemo(() => {
    let result = columns
    if (canEdit || canDelete) {
      const actionsRow = {
        title: '',
        field: 'actions',
        align: 'right',
        width: '112px',
        collapsible: 'true',
        render: row => (
          <Box display="flex">
            {canEdit && (
              <Button
                onClick={() => selectEditRow(row)}
                style={{ minWidth: '0.7rem', background: 'transparent' }}
                label=""
              >
                <Edit />
              </Button>
            )}

            {canDelete && (
              <Button onClick={() => selectDeleteRow(row)} label="">
                <Delete />
              </Button>
            )}
          </Box>
        )
      } as any

      result = [...columns, actionsRow]
    }
    return result
  }, [columns, canEdit, canDelete, teamMembers])

  const handleFilterChange = value => {
    setDomainFilterValue(value)
    setShouldRefreshData(true)
  }

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/governance/teamTimeOff',
          filters: [{ name: 'teamMember.domain', value: domainFilterValue.value }],
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
  const debouncedHandleRemoteData = debounce(fetchData, 500)

  return (
    <div className={s.mainContainer}>
      <Paper className={s.filtersContainer}>
        <Grid container spacing={4}>
          <Grid xs={12} md={3} item>
            <AsyncAutocomplete
              variant="standard"
              name="teamMember.domain"
              label="Domain"
              disableClearable
              value={domainFilterValue}
              options={filterOptions}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>
      </Paper>
      {domainFilterValue && (
        <Box>
          <NewTimeOff
            teamMembers={teamMembers}
            isModalOpen={isNewModalOpen}
            openModal={openNewModal}
            closeModal={closeNewModal}
          />
          <NewTimeOff
            isModalOpen={isEditModalOpen}
            openModal={openEditModal}
            closeModal={closeEditModal}
            editItem={selectedEditRow}
            isEdit
          />
          <DeleteTimeOff
            isModalOpen={isDeleteModalOpen}
            openModal={openDeleteModal}
            closeModal={closeDeleteModal}
            deleteItem={selectedDeleteRow}
            setShouldRefreshData={setShouldRefreshData}
            isDelete
          />
          <Table
            hideCheckbox
            orderBy="teamMember.name"
            order="asc"
            columns={columnsWithActions}
            items={tableItems}
            fetchData={debouncedHandleRemoteData}
            isLoading={isLoading}
            newButton={canCreate ? { onClick: openNewModal } : null}
            totalCount={totalCount}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
            filters={[
              {
                name: 'teamMember.name',
                filter: (
                  <Input
                    type="text"
                    name="teamMember.name"
                    label="Team member"
                    variant="standard"
                    value=""
                  />
                ),
                type: 'text',
                label: 'Team member'
              }
            ]}
          />
        </Box>
      )}
    </div>
  )
}

export default TeamDayOffManagement
