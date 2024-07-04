import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { ViewActionIcon } from 'icons'

export const columns = (setModal, selectRow) => [
  {
    title: 'Cod Magazin',
    field: 'metiCode',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Nume',
    field: 'metiName',
    align: 'left',
    type: 'string',
    width: '200px'
  },
  {
    title: 'Tip Magazin',
    field: 'metiType',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Versiune METI',
    field: 'metiVersion',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cod AD',
    field: 'adCode',
    align: 'left',
    type: 'string',
    width: '50px'
  },
  {
    title: 'Abatere receptie produse (grame)',
    field: 'receptionDeviation',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Regiune',
    field: 'regionName',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },
  {
    title: 'IP SFTP',
    field: 'sftpIp',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cale SFTP',
    field: 'sftpPath',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Permite editare cantitǎți recepționate',
    field: 'canEditQuantities',
    align: 'left',
    type: 'string',
    render: row => (
      <Box>
        <IconCell value={row.active ? 'active' : 'inactive'} />
      </Box>
    ),
    width: '100px'
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
    ),
    width: '100px'
  },
  {
    title: 'Adresa',
    field: 'address',
    align: 'left',
    type: 'string',
    width: '150px'
  },
  {
    title: 'Oras',
    field: 'city',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Judet/Sector',
    field: 'town',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Nr.ord.reg.com./an',
    field: 'regNumber',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'C.I.F',
    field: 'CIF',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Sediul',
    field: 'office',
    align: 'left',
    type: 'string',
    width: '300px'
  },
  {
    title: 'Banca',
    field: 'bankName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Contul',
    field: 'bankAccount',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Capital social subscris varsat',
    field: 'capital',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Intervale orare',
    field: 'hourlyIntervals',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px',
    render: row => (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          selectRow(row.id)
          setModal('interval')
        }}
      >
        <ViewActionIcon />
      </div>
    )
  }
]

export const drawerFilters = (shopCodes, metiShops, metiVersions, shopTypes, parentSocieties) => [
  {
    name: 'shopCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează magazin"
        disableClearable
        options={shopCodes || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează magazin'
  },

  {
    name: 'metiVersion',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează versiune"
        disableClearable
        options={metiVersions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează versiune'
  },

  {
    name: 'regionId',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează regiune"
        disableClearable
        options={metiShops || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează regiune'
  },

  {
    name: 'active',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Activ/inactiv"
        disableClearable
        options={[
          {
            value: 'true',
            label: 'Activ'
          },

          {
            value: 'false',
            label: 'Inactiv'
          }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Activ/inactiv'
  },

  {
    name: 'shopType',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza tip magazin"
        disableClearable
        options={shopTypes || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza tip magazin'
  },

  {
    name: 'parentSociety',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza societatea"
        disableClearable
        options={parentSocieties || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza societatea'
  }
]
