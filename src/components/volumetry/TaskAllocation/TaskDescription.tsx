import { Button, ListTableActionsItems } from '@fullscreendigital/carrefour-dex-fe'
import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AssignEmployee from './AssignEmployee'
import Employee from './Employee'
import { toEmployeesItems } from './serializers'
import { DeleteActionIcon, EditActionIcon } from 'icons'
import { EditAllocationModal } from './EditAllocationModal'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'

interface TaskDescriptionProps {
  item: any // TODO: To add type when db schema is defined
  shouldRefreshData: boolean
  setShouldRefreshData: (status: boolean) => void
  employees?: any[] // TODO: To add type when db schema is defined
}

const TaskDescription: React.FC<TaskDescriptionProps> = props => {
  const { item, employees, shouldRefreshData, setShouldRefreshData } = props

  const { taskName, department } = item.item || item
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [employeesItems, setEmployeesItems] = useState([])
  const [selectedRow, setSelectedRow] = useState(null) // TODO: To add interface when db schema is defined
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  useEffect(() => {
    setEmployeesItems(toEmployeesItems(item, employees))
  }, [employees])

  const openModal = (): void => setIsModalOpen(true)
  const closeModal = (): void => setIsModalOpen(false)

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

  const openEditModal = (): void => setIsEditModalOpen(true)

  const closeEditModal = (): void => setIsEditModalOpen(false)

  const openDeleteModal = (): void => setIsDeleteModalOpen(true)

  const closeDeleteModal = (): void => setIsDeleteModalOpen(false)

  const selectRow = (row, action) => {
    setSelectedRow(row)
    action === 'edit' ? openEditModal() : openDeleteModal()
  }

  return (
    <Grid container flexDirection="column">
      {employees && (
        <Grid container flexDirection="column" pr={2}>
          <ListTableActionsItems
            items={employeesItems}
            rowActions={[
              {
                label: 'Editeaza',
                labelColor: 'white',
                typographyVariant: 'medium',
                backgroundColor: '#0970E6',
                desktopIcon: <EditActionIcon />,
                onClick: (e, rowId) =>
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
                onClick: (e, rowId) =>
                  selectRow(
                    employees.find(item => item.id === rowId),
                    'delete'
                  )
              }
            ]}
            rowActionsWidth="200px"
          />
        </Grid>
      )}

      <Grid item my={1} xs={12} style={{ marginRight: '15px' }}>
        <Button
          variant="contained"
          label="Selecteaza angajat"
          onClick={() => openModal()}
          style={{ textTransform: 'none', width: isMobile ? '100%' : 'auto' }}
        />
      </Grid>

      <AssignEmployee
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        taskName={taskName}
        department={department.name}
        prodStandardUM={item.prodStandardUM}
      />
      <EditAllocationModal
        isModalOpen={isEditModalOpen}
        closeModal={closeEditModal}
        editItem={selectedRow}
        task={item}
        setShouldRefreshData={setShouldRefreshData}
      />
      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        actionUrl="/volumetry/taskAllocation/details/:id"
        itemId={`${selectedRow?.id}`}
        content={<Typography>Sunteti sigur ca vreti sa stergeti aceasta alocare?</Typography>}
        setShouldRefreshData={setShouldRefreshData}
        title="Sterge alocare"
      />
    </Grid>
  )
}

export default TaskDescription
