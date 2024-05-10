import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { DownloadIcon } from 'icons'

const acceptValues = [
  { label: 'Da', value: 'DA' },
  { label: 'Nu', value: 'NU' }
]

export const getColumns = ({
  downloadImages,
  showMessage,
  updateAccepted,
  showResponsibility,
  depositUserClassified,
  responsibleOptions,
  updateResponsible,
  showAccept
}) => [
  {
    title: 'Tip ambalaj',
    field: 'supportTypeName'
  },
  {
    title: 'Cod ambalaj',
    field: 'supportTypeCode'
  },
  {
    title: 'Cantitate aviz magazin',
    field: 'supportNumber'
  },
  {
    title: 'Cantitate receptionata în depozit',
    field: 'supportConfirmedNumber'
  },
  {
    title: 'Diferenta',
    field: 'difference'
  },
  {
    title: 'Imagini receptie hub',
    field: 'hasHubImages',
    render: row =>
      row.hasHubImages ? (
        <div onClick={() => downloadImages(row.id, 'hub')}>
          <DownloadIcon />
        </div>
      ) : (
        <div />
      )
  },
  {
    title: 'Imagini receptie depozit',
    field: 'hasDepositImages',
    render: row =>
      row.hasDepositImages ? (
        <div onClick={() => downloadImages(row.id, 'deposit')}>
          <DownloadIcon />
        </div>
      ) : (
        <div />
      )
  },
  {
    title: 'Imagini magazin',
    field: 'hasShopImages',
    render: row =>
      row.hasShopImages ? (
        <div onClick={() => downloadImages(row.id, 'shop')}>
          <DownloadIcon />
        </div>
      ) : (
        <div />
      )
  },
  ...(showMessage
    ? [
        {
          title: 'Comentariu magazin',
          field: 'shopComment'
        }
      ]
    : []),
  ...(showAccept
    ? [
        {
          title: 'Accepta',
          field: 'accepted',
          render: row =>
            row.canUpload ? (
              <Input
                label=""
                type="select"
                values={acceptValues}
                variant="outlined"
                width="100%"
                value={row.accepted === true ? 'DA' : row.accepted === false ? 'NU' : ''}
                onChange={event => updateAccepted({ value: event.target, supportId: row.id })}
              />
            ) : (
              <div>{row.accepted === true ? 'Da' : row.accepted === false ? 'Nu' : ''}</div>
            )
        }
      ]
    : []),
  ...(showResponsibility
    ? [
        {
          title: 'Responsabilitate',
          field: 'accepted',
          render: row =>
            depositUserClassified ? (
              <AsyncAutocomplete
                variant="outlined"
                name="responsible"
                label=""
                value={null}
                options={responsibleOptions || []}
                onChange={value => updateResponsible({ value: value.value, supportId: row.id })}
              />
            ) : (
              <div>{row.responsibility || ''}</div>
            )
        }
      ]
    : [])
]

export const getDownloadUrl = (supportId, type) =>
  `/shop-reception/return-litigation/details/supports/${supportId}/download-archive?type=${type}`

export const toLitigationDataPayload = list =>
  list.map(item => ({ supportId: item.id, responsible: item.responsibility }))
