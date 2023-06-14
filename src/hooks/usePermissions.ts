import { useMemo } from 'react'
import { isAllowed } from 'utils/helpers'
import { getUserRoles } from 'utils/authService'
import { ROLE_ALL } from 'utils/constants'

const usePermissions = ({ createRoles, viewRoles, editRoles, deleteRoles }) => {
  const currentUserRoles = useMemo(() => getUserRoles(), [])

  const canCreate = useMemo(
    () => currentUserRoles && isAllowed(createRoles, currentUserRoles) || createRoles?.includes(ROLE_ALL),
    [currentUserRoles]
  )

  const canView = useMemo(
    () => currentUserRoles && isAllowed(viewRoles, currentUserRoles) || viewRoles?.includes(ROLE_ALL),
    [currentUserRoles]
  )

  const canEdit = useMemo(
    () => currentUserRoles && isAllowed(editRoles, currentUserRoles) || editRoles?.includes(ROLE_ALL),
    [currentUserRoles]
  )

  const canDelete = useMemo(
    () => currentUserRoles && isAllowed(deleteRoles, currentUserRoles) || deleteRoles?.includes(ROLE_ALL),
    [currentUserRoles]
  )

  return { canCreate, canView, canEdit, canDelete }
}

export default usePermissions
