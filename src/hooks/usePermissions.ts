import { useMemo } from 'react'
import { isAllowed } from 'utils/helpers'
import { getUserRoles } from 'utils/authService'
import { ROLE_ALL } from 'utils/constants'

const usePermissions = ({ createRoles, viewRoles, editRoles, deleteRoles }) => {
  const currentUserRoles = useMemo(() => getUserRoles(), [])

  const canCreate = useMemo(
    () => createRoles?.includes(ROLE_ALL) || currentUserRoles && isAllowed(createRoles, currentUserRoles),
    [currentUserRoles]
  )

  const canView = useMemo(
    () => viewRoles?.includes(ROLE_ALL) || currentUserRoles && isAllowed(viewRoles, currentUserRoles),
    [currentUserRoles]
  )

  const canEdit = useMemo(
    () => editRoles?.includes(ROLE_ALL) || currentUserRoles && isAllowed(editRoles, currentUserRoles),
    [currentUserRoles]
  )

  const canDelete = useMemo(
    () => deleteRoles?.includes(ROLE_ALL) || currentUserRoles && isAllowed(deleteRoles, currentUserRoles),
    [currentUserRoles]
  )

  return { canCreate, canView, canEdit, canDelete }
}

export default usePermissions
