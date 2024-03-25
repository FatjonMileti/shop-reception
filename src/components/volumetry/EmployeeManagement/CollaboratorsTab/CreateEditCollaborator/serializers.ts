import { AutocompleteOption, EmployeeManagementItem } from 'components/volumetry/interfaces'

export const toCollaboratorPayload = (values: any) => ({
  id: values.id,

  firstName: values.firstName,
  lastName: values.lastName,
  middleName: values.middleName,
  email: values.email,
  genericDepartmentId: (values.genericDepartment as AutocompleteOption)?.value,
  workerTypeId: (values.workerType as AutocompleteOption)?.value,
  employer: values.employer
})
