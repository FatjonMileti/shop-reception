import { AutocompleteOption, EmployeeManagementItem } from 'components/volumetry/interfaces'

export const toCollaboratorPayload = (
  values: any,
  editItem: any,
  departmentsOptions: AutocompleteOption[]
) => {
  return {
    id: values.id,
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName,
    email: values.email,
    genericDepartmentId: editItem
      ? departmentsOptions.find(department => department.label === values.genericDepartment.label).value
      : (values.genericDepartment as AutocompleteOption)?.value,
    workerTypeId: (values.workerType as AutocompleteOption)?.value,
    employer: values.employer
  }
}
