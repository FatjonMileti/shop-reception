import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import dayjs from 'dayjs'
import { DownloadIcon } from 'icons'
import { formatUIDate } from 'utils/helpers'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

export const columns = (
  downloadSentFile,
  downloadSentFileHistory,
  downloadReceivedFile,
  downloadReceivedFileHistory,
  navigate
) => [
  {
    title: 'Bon Livrare',
    field: 'ticketExternalId',
    align: 'left',
    type: 'string',
    width: '70px',
    disableSorting: true
  },
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },
  {
    title: 'Operator integrare',
    field: 'createdBy',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },
  {
    title: 'Status',
    field: 'fileStatus',
    align: 'left',
    type: 'string',
    width: '70px',
    disableSorting: true,
    render: row => row.fileStatusValue
  },
  {
    title: 'Fișier trimis',
    field: 'sentFilePath',
    align: 'left',
    type: 'string',
    width: '70px',
    disableSorting: true,
    render: row => {
      return row.sentFilePath ? (
        <>
          <span onClick={() => downloadSentFile(row.id)} style={{ cursor: 'pointer' }}>
            <DownloadIcon />
          </span>
          {row.numberOfSentFiles > 1 && (
            <span onClick={() => downloadSentFileHistory(row.id)} style={{ cursor: 'pointer' }}>
              <DownloadIcon />
            </span>
          )}
        </>
      ) : (
        ''
      )
    }
  },
  {
    title: 'Fișier primit',
    field: 'receivedFilePath',
    align: 'left',
    type: 'string',
    width: '70px',
    disableSorting: true,
    render: row => {
      return row.receivedFilePath ? (
        <>
          <span onClick={() => downloadReceivedFile(row.id)} style={{ cursor: 'pointer' }}>
            <DownloadIcon />
          </span>
          {row.numberOfReceivedFile > 1 && (
            <span onClick={() => downloadReceivedFileHistory(row.id)} style={{ cursor: 'pointer' }}>
              <DownloadIcon />
            </span>
          )}
        </>
      ) : (
        ''
      )
    }
  },
  {
    title: 'Datǎ trimitere către Meti',
    field: 'sentTime',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.sentTime)
  },
  {
    title: 'Datǎ primire de la Meti',
    field: 'receivedTime',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.receivedTime)
  },
  {
    title: 'Produse cu diferențe',
    field: 'hasDifference',
    align: 'left',
    type: 'string',
    width: '70px',
    render: row => (
      <Box>
        {row.hasDifference ? (
          <div
            onClick={() => navigate('/shop-reception/reception/productsDifferences')}
            style={{ cursor: 'pointer' }}
          >
            <OpenInNewIcon />
          </div>
        ) : (
          ''
        )}
      </Box>
    ),
    disableSorting: true
    // if true, redirect to produse cu diferente page
  },
  {
    title: 'Produse cu diferente Meti',
    field: 'hasMetiDifference',
    align: 'left',
    type: 'string',
    width: '70px',
    render: row => (
      <Box>
        <IconCell value={row.hasMetiDifference ? 'active' : 'inactive'} />
      </Box>
    ),
    disableSorting: true
  },
  {
    title: 'Export produse neintegrate',
    field: 'hasNotIntegrated',
    align: 'left',
    type: 'string',
    width: '70px',
    render: row => (
      <Box>
        <IconCell value={row.hasNotIntegrated ? 'active' : 'inactive'} />
      </Box>
    ),
    disableSorting: true
  },
  {
    title: 'Erori',
    field: 'hasError',
    align: 'left',
    type: 'string',
    width: '70px',
    render: row => (
      <Box>
        <IconCell value={row.hasError ? 'active' : 'inactive'} />
      </Box>
    ),
    disableSorting: true
  },
  {
    title: 'Detalii',
    field: '',
    align: 'left',
    type: 'string',
    width: '70px',
    disableSorting: true,
    render: row => (
      <Box>
        <div
          onClick={() =>
            navigate(`/shop-reception/reception/metiFiles/${row.id}?shopCode=${row.shopCode}`)
          }
          style={{ cursor: 'pointer' }}
        >
          <OpenInNewIcon />
        </div>
      </Box>
    )
  },
  {
    title: 'Retrimitere',
    field: 'hasRetry',
    align: 'left',
    type: 'string',
    width: '70px',
    render: row => (
      <Box>
        <IconCell value={row.hasRetry ? 'active' : 'inactive'} />
      </Box>
    ),
    disableSorting: true
  }
]

export const drawerFilters = (shopCodes, statusList, ticketExternalId) => [
  {
    name: 'ticketExternalId',
    filter: <Input variant="outlined" label="Bon livrare" type="text" />,
    type: 'text',
    label: 'Bon livrare',
    value: ticketExternalId
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
  },
  {
    name: 'fileStatus',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează status"
        disableClearable
        options={statusList || []}
      />
    ),
    type: 'autocomplete',
    label: 'Status'
  },
  {
    name: 'hasError',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează cu erori"
        disableClearable
        options={[
          { label: 'Da', value: 'true' },
          { label: 'Nu', value: 'false' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Cu erori'
  },
  {
    name: 'hasDifference',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează cu diferente"
        disableClearable
        options={[
          { label: 'Da', value: 'true' },
          { label: 'Nu', value: 'false' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Cu diferente'
  },

  {
    name: 'sentFileDate',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza dată trimitere catre meti"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
      />
    ),
    type: 'date',
    label: 'Dată trimitere catre meti'
  },
  {
    name: 'receivedFileDate',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza dată primire catre meti"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
      />
    ),
    type: 'date',
    label: 'Dată primire catre meti'
  }
]
