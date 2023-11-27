export const columns = [
  {
    title: 'Nume user',
    field: 'lastName',
    align: 'left'
  },
  {
    title: 'Prenume User',
    field: 'firstName',
    align: 'left'
  },
  {
    title: 'Magazin',
    field: 'storeName',
    align: 'left'
  },
  {
    title: 'Regiune',
    field: 'regionName',
    align: 'left',
    collapsible: true
  },
]

export const statuses = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
]

export const traineeTypes = [
    { label: 'TRAINEE_SUPER', value: 'TRAINEE_SUPER' }, 
    { label: 'TRAINEE_HYPER', value: 'TRAINEE_HYPER' },
    { label: 'TRAINEE_HYPER_SUPER', value: 'TRAINEE_HYPER_SUPER'}
]

export const getInitialValues = editItem => ({
    id: editItem?.id ?? '',
    oidcId: editItem?.oidcId ?? '',
    username: editItem?.username ?? '',
    enable: editItem?.enable ? 'Active' : 'Inactive',
    email: editItem?.email ?? '',
    firstName: editItem?.firstName ?? '',
    lastName: editItem?.lastName ?? '',
    structureRoles: editItem?.structureRoles ?? []
})