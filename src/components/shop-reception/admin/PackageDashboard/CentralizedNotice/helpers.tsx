import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TableFiltersType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table'
import { AsyncAutocompleteOption } from 'components/core-ui/AsyncAutocomplete/AsyncAutocompleteDefinitions'

const packageReturnOptions = [
  { value: 'Da', label: 'Da' },
  { value: 'Nu', label: 'Nu' }
]

export const getFilters = ({
  shopOptions,
  hubOptions,
  depositOptions
}: {
  shopOptions: AsyncAutocompleteOption[]
  hubOptions: AsyncAutocompleteOption[]
  depositOptions: AsyncAutocompleteOption[]
}): TableFiltersType[] => [
  {
    name: 'shopCode',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza magazin"
        options={shopOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza magazin'
  },
  {
    name: 'hubId',
    value: undefined,
    filter: (
      <Autocomplete variant="outlined" label="Selecteaza Hub" options={hubOptions || []} multiple />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Hub'
  },
  {
    name: 'depositId',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza Depozit"
        options={depositOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Depozit'
  },
  {
    name: 'packageReturn',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza retur ambalaje"
        options={packageReturnOptions}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza retur ambalaje'
  },
  {
    name: 'truckNumberHub',
    value: '',
    label: 'Numar camion hub',
    type: 'text',
    filter: <Input type="text" name="truckNumberHub" label="Numar camion hub" variant="outlined" />
  },
  {
    name: 'noticeNumber',
    value: '',
    label: 'Aviz magazin',
    type: 'text',
    filter: <Input type="text" name="noticeNumber" label="Aviz magazin" variant="outlined" />
  },
  {
    name: 'driverNameHub',
    value: '',
    label: 'Nume sofer hub',
    type: 'text',
    filter: <Input type="text" name="driverNameHub" label="Nume sofer hub" variant="outlined" />
  },
  {
    name: 'driverNameShop',
    value: '',
    label: 'Nume sofer magazin',
    type: 'text',
    filter: (
      <Input type="text" name="driverNameShop" label="Nume sofer magazin" variant="outlined" />
    )
  },
  {
    name: 'createdHub',
    value: null,
    filter: (
      <DatePicker
        label="Selecteaza data hub de la "
        variant="outlined"
        value={null}
        onChange={() => {}}
        required
        adapterLocale="ro"
        modalLabel="Selecteaza data"
        closeButtonLabel="Anuleaza"
        confirmButtonLabel="Confirma"
      />
    ),
    type: 'date',
    label: 'Selecteaza data hub de la'
  },
  {
    name: 'createdToHub',
    value: null,
    filter: (
      <DatePicker
        label="Selecteaza datahub pana la "
        variant="outlined"
        value={null}
        onChange={() => {}}
        required
        adapterLocale="ro"
        modalLabel="Selecteaza data"
        closeButtonLabel="Anuleaza"
        confirmButtonLabel="Confirma"
      />
    ),
    type: 'date',
    label: 'Selecteaza data hub pana la'
  },
  {
    name: 'createdShop',
    value: null,
    filter: (
      <DatePicker
        label="Selecteaza data magazin de la "
        variant="outlined"
        value={null}
        onChange={() => {}}
        required
        adapterLocale="ro"
        modalLabel="Selecteaza data"
        closeButtonLabel="Anuleaza"
        confirmButtonLabel="Confirma"
      />
    ),
    type: 'date',
    label: 'Selecteaza data magazin de la'
  },
  {
    name: 'createdToShop',
    value: null,
    filter: (
      <DatePicker
        label="Selecteaza data magazin pana la "
        variant="outlined"
        value={null}
        onChange={() => {}}
        required
        adapterLocale="ro"
        modalLabel="Selecteaza data"
        closeButtonLabel="Anuleaza"
        confirmButtonLabel="Confirma"
      />
    ),
    type: 'date',
    label: 'Selecteaza data magazin pana la'
  }
]
