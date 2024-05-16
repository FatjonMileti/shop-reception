import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { DownloadIcon } from 'icons'

export const getColumns = downloadImage => [
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'HUB',
    field: 'hubName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Societate',
    field: 'parentSociety',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip suport',
    field: 'supportType',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Inventar Calitativ',
    field: 'intactNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Sold teoretic Calitativ',
    field: 'computedIntactNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Inventar Defect',
    field: 'brokenNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Imagine defect',
    field: 'defectPictureId',
    align: 'left',
    type: 'string',
    render: row =>
      row.defectPictureId ? (
        <div onClick={() => downloadImage(row.defectPictureId)}>
          <DownloadIcon />
        </div>
      ) : (
        <div />
      )
  },
  {
    title: 'Diferenta',
    field: 'computedDifference',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Stoc final dupa inventar',
    field: 'computedTotalStock',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Responsabil inventar',
    field: 'createdBy',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data inventar',
    field: 'createdDate',
    align: 'left',
    type: 'string'
  }
]

export const getFilters = ({
  shopOptions,
  hubOptions,
  supportTypeOptions,
  parentSocietyOptions
}) => [
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
    label: 'Selecteaza depozit'
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
    name: 'supportTypeId',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza Tip Suport"
        options={supportTypeOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Tip Suport'
  },
  {
    name: 'parentSociety',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza Societate"
        options={parentSocietyOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Societate'
  }
]
