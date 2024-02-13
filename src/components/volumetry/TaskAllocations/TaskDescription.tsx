import { Button, ListTableActionsItems } from '@fullscreendigital/carrefour-dex-fe'
import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AssignEmployee from './AssignEmployee'
import { toEmployeesItems } from './serializers'
import { DeleteActionIcon, EditActionIcon } from 'icons'
import { EditAllocationModal } from './EditAllocationModal'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'
import { CRUDAction } from '../interfaces'
import { TaskDescriptionProps } from './TaskAllocationsDefinitions'

const TaskDescription: React.FC<TaskDescriptionProps> = props => {
  const { item, employees, setShouldRefreshData, setSelectedRowId, hideDetails } = props
  const { taskName, rayonsOrDepartment } = item.item || item
  const [employeesItems, setEmployeesItems] = useState([])
  const [selectedRow, setSelectedRow] = useState(null) // TODO: To add interface when db schema is defined

  useEffect(() => {
    setEmployeesItems(
      toEmployeesItems(item, employees, setShouldRefreshData, setSelectedRowId, hideDetails)
    )
  }, [employees])

  const [modal, setModal] = useState<CRUDAction>(null)

  const openModal = (action): void => setModal(action)
  const closeModal = (): void => setModal(null)

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const selectRow = (row, action) => {
    setSelectedRow(row)
    openModal(action)
  }

  const selectSelectedParentRow = () => {
    setSelectedRowId(item.taskTemplateId)
  }

  return (
    <Grid container flexDirection="column">
      {employees && (
        <Grid container flexDirection="column" pr={2}>
          <Box
            sx={{
              width: isMobile ? '100% !important' : 'auto'
            }}
          >
            <ListTableActionsItems
              items={employeesItems}
              rowActions={
                hideDetails
                  ? []
                  : [
                      {
                        label: 'Editeaza',
                        labelColor: 'white',
                        typographyVariant: 'medium',
                        backgroundColor: '#0970E6',
                        desktopIcon: <EditActionIcon />,
                        onClick: (_e, rowId) =>
                          selectRow(
                            employees.find(item => item.id === rowId),
                            'edit'
                          )
                      },
                      {
                        label: 'Sterge',
                        labelColor: 'white',
                        typographyVariant: 'medium',
                        backgroundColor: '#d9534f',
                        desktopIcon: <DeleteActionIcon />,
                        onClick: (_e, rowId) =>
                          selectRow(
                            employees.find(item => item.id === rowId),
                            'delete'
                          )
                      }
                    ]
              }
              rowActionsWidth="200px"
            />
          </Box>
        </Grid>
      )}

      {!hideDetails && (
        <Grid item my={1} xs={12} style={{ marginRight: '15px' }}>
          <Button
            variant="contained"
            label="Selecteaza angajat"
            onClick={() => openModal('read')}
            style={{ textTransform: 'none', width: isMobile ? '100%' : 'auto' }}
          />
        </Grid>
      )}
      {!hideDetails && (
        <>
          <AssignEmployee
            isModalOpen={modal === 'read'}
            closeModal={closeModal}
            taskName={taskName}
            rayonsOrDepartment={rayonsOrDepartment}
            workloadMeasurementUnit={item.workloadMeasurementUnit}
            setShouldRefreshData={setShouldRefreshData}
            taskTemplateId={item.taskTemplateId}
            setSelectedRowId={setSelectedRowId}
          />
          <EditAllocationModal
            isModalOpen={modal === 'edit'}
            closeModal={closeModal}
            editItem={selectedRow}
            task={item}
            setShouldRefreshData={setShouldRefreshData}
            setSelectedRowId={setSelectedRowId}
            employee={employees.find(item => item.id === selectedRow?.id)}
          />
          <DeleteConfirmationModal
            isModalOpen={modal === 'delete'}
            closeModal={closeModal}
            actionUrl="/volumetry/tasks/:id"
            itemId={`${selectedRow?.id}`}
            content={<Typography>Sunteti sigur ca vreti sa stergeti aceasta alocare?</Typography>}
            setShouldRefreshData={setShouldRefreshData}
            additionalAction={selectSelectedParentRow}
            title="Sterge alocare"
            deleteLabel="Sterge"
          />
        </>
      )}
    </Grid>
  )
}

export default TaskDescription
