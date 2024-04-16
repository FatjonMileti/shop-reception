import { Autocomplete } from "@fullscreendigital/carrefour-dex-fe";
import { Box } from "@mui/material";
import { IconCell } from "components/core-ui/IconCell";

export const columns = [
  {
    title: 'Tip magazin',
    field: 'shopType',
    align: 'left',
    type: 'string',
    render: row => row.shopType?.value
  },
  {
    title: 'Regiune',
    field: 'regionName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Cod magazin',
    field: 'shopCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume magazin',
    field: 'shopName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip scanare',
    field: 'scanType',
    align: 'left',
    type: 'string',
    render: row => row.type?.value
  },
  {
    title: 'Datǎ start',
    field: 'start',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Datǎ Sfarșit',
    field: 'end',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Activ',
    field: 'active',
    align: 'left',
    type: 'string',
    render: row => (
      <Box>
        <IconCell value={row.active ? 'active' : 'inactive'} />
      </Box>
    )
  }
]

export const drawerFilters = (shopTypes, regionTypes, scanTypes) => [
  {
    name: 'shopCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează magazin"
        disableClearable
        options={shopTypes}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează magazin'
  },
  {
    name: 'region',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează regiune"
        disableClearable
        options={regionTypes}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează regiune'
  },
  {
    name: 'scanType',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează tip scanare"
        disableClearable
        options={scanTypes}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează tip scanare'
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
          {value: 'active', label: 'Activ'},
          {value: 'inactive', label: 'Inactiv'},
          
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Activ'
  },

 
]
