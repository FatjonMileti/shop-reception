import { AutocompleteOption, EmployeeManagementItem } from 'components/volumetry/interfaces'

export const toCollaboratorPayload = (values: EmployeeManagementItem) =>
  ({
    id: values.id,
    fullName: values.fullName,
    genericDepartment: (values.genericDepartment as AutocompleteOption).value,
    jobTitle: (values.jobTitle as AutocompleteOption).value,
    employer: values.employer,
    location: values.location
  } as EmployeeManagementItem)
