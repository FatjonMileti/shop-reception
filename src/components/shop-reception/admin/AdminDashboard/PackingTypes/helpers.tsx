import { Autocomplete, Input } from '@fullscreendigital/carrefour-dex-fe'
import Barcode from 'react-jsbarcode'
import s from '../../../commonStyles.modules.scss'
import { IconCell } from 'components/core-ui/IconCell'

export const columns = [
  {
    title: 'Cod ambalaj',
    field: 'code',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Coduri suplimentare',
    field: 'externalCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Denumire',
    field: 'name',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Principal',
    field: 'main',
    align: 'left',
    type: 'string',
    render: row => <IconCell value={row.main ? 'active' : 'inactive'} />
  },
  {
    title: 'Combinație',
    field: 'combined',
    align: 'left',
    type: 'string',
    render: row => <IconCell value={row.combined ? 'active' : 'inactive'} />
  },
  {
    title: 'Activ',
    field: 'active',
    align: 'left',
    type: 'string',
    render: row => <IconCell value={row.active ? 'active' : 'inactive'} />
  },
  {
    title: 'Returnabil',
    field: 'returnable',
    align: 'left',
    type: 'string',
    render: row => <IconCell value={row.returnable ? 'active' : 'inactive'} />
  },
  {
    title: 'Cod de bare generat',
    field: 'alternativeCodes',
    align: 'left',
    type: 'string',
    disableSorting: true,
    render: row =>
      row?.alternativeCodes ? (
        <Barcode
          value={row?.alternativeCodes}
          // options={{ displayValue: false }}
          className={s.barcode}
        />
      ) : (
        <></>
      )
  }
]

export const drawerFilters = [
  {
    name: 'externalCode',
    filter: <Input variant="outlined" label="Cod ambalaj" type="text" />,
    type: 'text',
    label: 'Cod ambalaj'
  },

  {
    name: 'name',
    filter: <Input variant="outlined" label="Denumire" type="text" />,
    type: 'text',
    label: 'Denumire'
  },
  {
    name: 'main',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Principal"
        disableClearable
        options={[
          {
            value: 'true',
            label: 'Da'
          },

          {
            value: 'false',
            label: 'Nu'
          }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Principal'
  },

  {
    name: 'combined',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Combinatie"
        disableClearable
        options={[
          {
            value: 'true',
            label: 'Da'
          },

          {
            value: 'false',
            label: 'Nu'
          }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Combinatie'
  },

  {
    name: 'active',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Activ"
        disableClearable
        options={[
          {
            value: 'true',
            label: 'Da'
          },

          {
            value: 'false',
            label: 'Nu'
          }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'active'
  },
  {
    name: 'returnable',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Returnabil"
        disableClearable
        options={[
          {
            value: 'true',
            label: 'Da'
          },

          {
            value: 'false',
            label: 'Nu'
          }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Returnabil'
  }
]
