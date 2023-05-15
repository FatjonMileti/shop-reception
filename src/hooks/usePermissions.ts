import { useMemo } from 'react'
import { isAllowed } from 'utils/helpers'
import { getUserRoles } from 'utils/authService'

const usePermissions = ({ createRoles, editRoles, deleteRoles }) => {
  const currentUserRoles = useMemo(() => getUserRoles(), [])

  const canCreate = useMemo(
    () => currentUserRoles && isAllowed(createRoles, currentUserRoles),
    [currentUserRoles]
  )

  const canEdit = useMemo(
    () => currentUserRoles && isAllowed(editRoles, currentUserRoles),
    [currentUserRoles]
  )

  const canDelete = useMemo(
    () => currentUserRoles && isAllowed(deleteRoles, currentUserRoles),
    [currentUserRoles]
  )

  return { canCreate, canEdit, canDelete }
}

export default usePermissions
