import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { ModalInfo } from '../ModalWithForm/ModalForm/ModalInfo'
import { useNotification } from 'hooks'
import s from './UserModal.modules.scss'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Close } from '@mui/icons-material'
import { useImmer } from 'use-immer'
import { useMediaQuery, CircularProgress } from '@mui/material'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { StructureItem } from '../StructureItem'

const sx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#fff',
  p: 4,
  maxHeight: '683px',
  overflowY: 'auto',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px'
}

const infoItems = [
  {
    name: 'firstName',
    label: 'Nume'
  },
  {
    name: 'lastName',
    label: 'Prenume'
  }
]

function UserModal(props) {
  const { isModalOpen, closeModal, editedItemId, formItems } = props
  const [isLoading, setIsLoading] = useState(true)
  const [editItem, setEditItem] = useImmer(null)
  const [roles, setRoles] = useState([])
  const { showNotification } = useNotification()

  const closeModalAndResetForm = () => {
    closeModal()
    setEditItem(null)
    setIsLoading(true)
  }

  const removeAddStructure = id => {
    setEditItem(prevState => {
      const existingStructureIndex = prevState.structureRoles.findIndex(role => role.roleId === id)
      const structureClone = [...prevState.structureRoles]

      if (existingStructureIndex !== -1) {
        structureClone.splice(existingStructureIndex, 1)
      } else {
        structureClone.push({ roleId: id })
      }

      return {
        ...prevState,
        structureRoles: structureClone
      }
    })
  }

  const onStructureChange = payload => {
    const {
      structure: { value: structureId },
      roleId
    } = payload
    const existingStructureIndex = editItem.structureRoles.findIndex(role => role.roleId === roleId)

    setEditItem(prevState => {
      const structureClone = [...prevState.structureRoles]

      if (existingStructureIndex !== -1) {
        const updateItem = {
          ...structureClone[existingStructureIndex],
          roleId: roleId,
          structureId: structureId
        }
        structureClone.splice(existingStructureIndex, 1, updateItem)
      } else {
        structureClone.push({ roleId, structureId })
      }

      return {
        ...prevState,
        structureRoles: structureClone
      }
    })
  }

  useEffect(() => {
    if (isModalOpen && editedItemId) {
      ;(async () => {
        try {
          const result = await makeCoreGetRequest(`/user/${editedItemId}`)
          setEditItem(result)

          const rolesResult = await makeCoreGetRequest('/role')
          setRoles(rolesResult)
        } catch (error) {
          showNotification({
            message: `Error while fetching item. ${error?.message}`,
            type: 'error'
          })
        } finally {
          setTimeout(() => setIsLoading(false), 500)
        }
      })()
    } else {
      setEditItem({})
      if (isModalOpen) {
        setTimeout(() => setIsLoading(false), 500)
      }
    }
  }, [isModalOpen, editedItemId])

  const saveData = async () => {
    setIsLoading(true)
    try {
      const payload = editItem
      await makeCorePutRequest(`/user/${editedItemId}`, payload)
      showNotification({
        message: 'Item saved successfully',
        type: 'success'
      })
    } catch (error) {
      showNotification({
        message: `Error while saving item. ${error?.message}`,
        type: 'error'
      })
    }

    closeModalAndResetForm()
    setIsLoading(false)
  }

  const isXs = useMediaQuery('(max-width:624px)')
  const isMd = useMediaQuery('(max-width:936px)')

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isModalOpen}
      onClose={closeModalAndResetForm}
    >
      <Box
        sx={{
          ...sx,
          width: isXs ? 'calc(100% - 24px)' : isMd ? '80%' : '30%'
        }}
      >
        <IconButton
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          withBackground
          onClick={closeModalAndResetForm}
        >
          <Close />
        </IconButton>
        {(isLoading && (
          <div style={{ display: 'flex' }}>
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          </div>
        )) || (
          <div>
            <form>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography component="h2" variant="medium">
                    <span className={s.modalTitle}>Edit user</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <ModalInfo formInfoItems={infoItems} editItem={editItem} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  {roles?.map(role => {
                    const isChecked = editItem?.structureRoles?.some(
                      structureRole => structureRole.roleId === role.id
                    )
                    const selectedValue = editItem?.structureRoles?.find(
                      structureRole => structureRole.roleId === role.id
                    )
                    const action = {
                      url: `/structure/role/${role.id}`,
                      type: 'GET',
                      valueKey: 'id',
                      labelKey: 'name'
                    }
                    return (
                      <StructureItem
                        key={role.id}
                        removeAddStructure={removeAddStructure}
                        defaultChecked={isChecked}
                        onChange={onStructureChange}
                        roleName={{ value: role.id, label: role.name }}
                        selectLabel="Structura asociata"
                        value={selectedValue}
                        action={action}
                      />
                    )
                  })}
                  <Input
                    onChange={(e: any) =>
                      setEditItem(prevState => ({ ...prevState, isEnable: e.target.value }))
                    }
                    type="select"
                    name="isEnable"
                    variant="standard"
                    width="45%"
                    label="Status"
                    values={[
                      {
                        value: 'true',
                        label: 'Activ'
                      },
                      {
                        value: 'false',
                        label: 'Inactiv'
                      }
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} className={s.modalButtons}>
                  <Button label="Cancel" variant="outlined" onClick={closeModal} />
                  <Button variant="contained" label="Save" onClick={saveData} />
                </Grid>
              </Grid>
            </form>
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default UserModal
