export const columns = [
    {
      title: 'Regiune',
      field: 'name',
      align: 'left',      
    },
    {
      title: 'Coeficient',
      field: 'growth',
      align: 'left',
    },
    {
      title: 'Ultima actualizare',
      field: 'username',
      align: 'left',
    },
    {
      title: 'Ultima modificare',
      field: 'lastChange',
      align: 'left',
    }
]

export const getInitialValues = editItem => ({
  divisionType: editItem?.divisionType ?? '',
  growth: editItem?.growth ?? '',
  id: editItem?.id ?? '',
  lastChange: editItem?.lastChange ?? '',
  name: editItem?.name ?? '',
  username: editItem?.username ?? ''
})

