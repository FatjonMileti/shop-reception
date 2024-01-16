import { Autocomplete, Input } from "@fullscreendigital/carrefour-dex-fe"
import { AutocompleteOption } from "../interfaces"

export const columns = [
  {
    title: 'Nume task',
    field: 'name',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Volum de lucru',
    field: 'workVolume',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Alocare nr. angajati',
    field: 'allocatedWorkers',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Estimare ore',
    field: 'timeEstimation',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Ore alocate standard',
    field: 'standardAllocatedHours',
    align: 'left',
    type: 'string'
  }
]