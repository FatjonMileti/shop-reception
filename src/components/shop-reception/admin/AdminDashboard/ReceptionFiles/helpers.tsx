import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import dayjs from 'dayjs'
import { DownloadIcon } from 'icons'
import { formatPayloadDate, formatUIDate } from 'utils/helpers'

export const columns = (setExportSelectedRowId, selectRow) => [
  {
    title: 'Bon livrare',
    field: 'externalTicketId',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Magazin',
    field: 'shopNames',
    align: 'left',
    type: 'string',
    width: '500px',
    disableSorting: true
  },
  {
    title: 'Datǎ',
    field: 'createdDate',
    align: 'left',
    type: 'string',
    render: row => formatUIDate(row.createdDate)
  },
  {
    title: 'Succes',
    field: 'success',
    align: 'left',
    type: 'string',
    render: row => (
      <Box>
        <IconCell value={row.success ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Motiv eșuare',
    field: 'failureReason',
    align: 'left',
    type: 'string',
    render: row => row.value
  },
  {
    title: 'Descarca fișierul',
    field: 'fileDownloaded',
    align: 'left',
    type: 'string',
    render: row => (
      <div
        onClick={() => setExportSelectedRowId(row.id)}
        style={{ cursor: 'pointer', fontSize: '24px' }}
      >
        <DownloadIcon />
      </div>
    ),
    disableSorting: true
  },
  {
    title: 'Reprocesare',
    field: 'reprocessing',
    align: 'left',
    type: 'string',
    render: row =>
      row.reimportAllowed ? (
        <div onClick={() => selectRow(row.id)} style={{ cursor: 'pointer', fontSize: '24px' }}>
          <DownloadIcon />
        </div>
      ) : (
        <></>
      ),
    disableSorting: true
  }
]

export const drawerFilters = (shopCodes, depositOptions, reasonsOptions) => [
  {
    name: 'ticketNumber',
    filter: <Input variant="outlined" label="Bon livrare" type="text" />,
    type: 'text',
    label: 'Bon livrare'
  },
  {
    name: 'depositCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează depozit"
        disableClearable
        options={depositOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Depozit'
  },
  {
    name: 'date',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza data"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
        adapterLocale="ro"
        modalLabel="Selecteaza data"
        closeButtonLabel="Anuleaza"
        confirmButtonLabel="Confirma"
      />
    ),
    type: 'date',
    label: 'Data'
  },
  {
    name: 'success',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează succes"
        disableClearable
        options={[
          { value: 'true', label: 'Da' },
          { value: 'false', label: 'Nu' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Succes'
  },
  {
    name: 'reason',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Motiv esuare"
        disableClearable
        options={reasonsOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Motiv esuare'
  },
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
    label: 'Magazin'
  }
]
