import { TaskManagementItem } from "components/volumetry/interfaces"
import { useNotification } from "hooks"
import { useMemo } from "react"
import { getInitialValues, getValidationSchema } from "./helpers"

interface NewTaskProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: TaskManagementItem | number
}

const NewTask: React.FC<NewTaskProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  return (

  )
}

export default NewTask