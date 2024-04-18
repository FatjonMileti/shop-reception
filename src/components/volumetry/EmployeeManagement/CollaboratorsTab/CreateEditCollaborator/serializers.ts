import { AutocompleteOption, EmployeeManagementItem } from 'components/volumetry/interfaces'

export const toCollaboratorPayload = (
  values: any,
  editItem: any,
  departmentsOptions: AutocompleteOption[],
  jobTitlesOptions: AutocompleteOption[]
) => {
  return {
    id: values.id,
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName,
    jobTitle: editItem
      ? departmentsOptions.find(department => department.label === values.genericDepartment.label)
          .value
      : (values.genericDepartment as AutocompleteOption)?.value,
    genericDepartmentId: editItem
      ? jobTitlesOptions.find(jobTitle => jobTitle.label === values.jobTitle.label).value
      : (values.jobTitle as AutocompleteOption)?.value,
    workerTypeId: (values.workerType as AutocompleteOption)?.value,
    employer: values.employer
  }
}
