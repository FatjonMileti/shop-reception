import * as Yup from 'yup'

export const columns = [
  {
    title: 'Divizie',
    field: 'type',
    align: 'left'
  },
  {
    title: 'Coeficient de crestere',
    field: 'growth',
    align: 'left'
  },
  {
    title: 'Ultima actualizare',
    field: 'username',
    align: 'left'
  },
  {
    title: 'Data / ora',
    field: 'lastChange',
    align: 'left'
  },
]

export const getValidationSchema = () => Yup.object({
    growth: Yup.number().required()
})

export const getInitialValues = editItem => ({
    id: editItem?.id ?? '',
    type: editItem?.type ?? '',
    growth: editItem?.growth ?? '',
    username: editItem?.username ?? '',
    lastChange: editItem?.lastChange ?? ''
})

