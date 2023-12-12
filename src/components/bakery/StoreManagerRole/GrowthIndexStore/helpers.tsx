import * as Yup from 'yup'
import { GrowthIndex } from './interfaces'

export const columns = [
  {
    title: 'Magazin',
    field: 'name',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Coeficient',
    field: 'growth',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Ultima actualizare',
    field: 'username',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Ultima modificare',
    field: 'lastChange',
    align: 'left',
    type: 'date'
  }
]

export const getInitialValues = (editItem?: Partial<GrowthIndex>): GrowthIndex =>  ({
  id: editItem?.id ?? '',
  name: editItem?.name ?? '',
  growth: editItem?.growth ?? 0,
  username: editItem?.username ?? '',
  lastChange: editItem?.lastChange ?? '',
  divisionType: editItem?.divisionType ?? ''
})

export const editGrowthIndexValidationSchema = Yup.object().shape({
  growth: Yup.number().required()
})