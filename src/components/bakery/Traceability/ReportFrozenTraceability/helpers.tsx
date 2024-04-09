import { formatBakeryPayloadDate } from 'utils/helpers'
import { BodyItem } from '../ProductManagementTraceability/AccordionTable'
import { IconCell } from '../../../core-ui/IconCell'
import React from 'react'
import { BooleanIcon } from '../../../core-ui/BooleanIcon'
import { ThermalCondition } from '../../interfaces'
import dayjs from 'dayjs'
import { BatchStatus } from '../interfaces'

export const columns: any[] = [
  {
    title: 'Data intrare in raion',
    field: 'batch.entryDate',
    render: row => (
      <BodyItem
        name="Data intrare in raion"
        value={formatBakeryPayloadDate(row?.batch?.entryDate)}
      />
    )
  },
  {
    title: 'Cod Meti',
    field: 'batch.product.metiCode',
    render: row => <BodyItem name="Cod Meti" value={row?.batch?.product?.metiCode} />
  },
  {
    title: 'Produs',
    field: 'batch.product.name',
    render: row => <BodyItem name="Produs" value={row?.batch?.product?.name} />
  },
  {
    title: 'Lot',
    render: row => <BodyItem name="Lot" value={row?.batch?.batchName} />
  },
  {
    title: 'Familie produs',
    field: 'batch.product.familyName',
    render: row => <BodyItem name="Familie produs" value={row?.batch?.product?.familyName} />
  },
  {
    title: 'Subfamilie',
    field: 'batch.product.subfamily',
    render: row => <BodyItem name="Subfamilie" value={row?.batch?.product?.subfamily} />
  },
  {
    title: 'Furnizor (Cod Meti)',
    field: 'batch.supplier.supplierCode',
    render: row => (
      <BodyItem name="Furnizor (Cod Meti)" value={row?.batch?.supplier?.supplierCode} />
    )
  },
  {
    title: 'Furnizor',
    field: 'batch.supplier.supplierName',
    render: row => <BodyItem name="Furnizor" value={row?.batch?.supplier?.supplierName} />
  },
  {
    field: 'batch.hasExpireDate',
    render: row => (
      <BodyItem
        name="Expira (Bifa)"
        value={
          <BooleanIcon
            value={row?.batch?.hasExpireDate}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    field: 'batch.expireDate',
    render: row => (
      <BodyItem name="Data expirare" value={formatBakeryPayloadDate(row?.batch?.expireDate)} />
    )
  },
  {
    field: 'batch.hasSecondaryDlc',
    render: row => (
      <BodyItem
        name="DLC Secundar (Bifa)"
        value={
          <BooleanIcon
            value={row?.batch?.hasSecondaryDlc}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    title: 'Cantitate intrata',
    field: 'batch.batchQuantity',
    render: row => <BodyItem name="Cantitate intrata" value={row?.batch?.batchQuantity} />
  },
  {
    title: 'UM (Meti)',
    field: 'product.metricUnit',
    render: row => <BodyItem name="UM (Meti)" value={row?.batch?.product?.metricUnit} />
  },
  {
    title: 'User creare linie receptie',
    field: 'createdBy'
  },
  {
    field: 'batch.createdDate',
    render: row => (
      <BodyItem
        name="Data creare linie receptie"
        value={formatBakeryPayloadDate(row?.batch?.createdDate)}
      />
    )
  },
  {
    title: 'Cantitate consumata',
    field: 'batch.consumedAmount',
    render: row => <BodyItem name="Cantitate consumata" value={row?.batch?.consumedAmount} />
  },
  {
    title: 'Nr. zile valabilitate DLC secundar',
    field: 'batch.dlcDays',
    render: row => (
      <BodyItem
        name="Nr. zile valabilitate DLC secundar"
        value={
          row?.batch?.dlcDays === 0 || typeof row?.batch?.dlcDays === 'undefined'
            ? ''
            : row?.batch?.dlcDays
        }
      />
    )
  },
  {
    title: 'Status lot',
    field: 'batchStatus',
    render: row => <BodyItem name="Status lot" value={BatchStatus[row?.batch?.batchStatus] || ''} />
  },
  // TODO check this field
  // {
  //   title: 'Motiv inchidere lot',
  //   field: 'closeReason',
  //   render: row => (
  //     <BodyItem name="Motiv inchidere lot" value={row?.batch?.closeReason} />
  //   )
  // },
  {
    render: row => (
      <BodyItem
        name="Verificare de catre validator trasabilitate ( bifa )"
        value={
          <BooleanIcon
            value={row?.batch?.isVerified}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    title: 'Validator trasabilitate',
    field: 'batch.verifiedBy',
    render: row => <BodyItem name="Validator trasabilitate" value={row?.batch?.verifiedBy} />
  },
  // TODO check this field
  // {
  //   title: 'Data verificare trasabilitate',
  //   field: 'verifiedDate',
  //   render: row => (
  //     <BodyItem
  //       name="Data verificare trasabilitate"
  //       value={<>{formatPayloadDate(row.verifiedDate)}</>}
  //     />
  //   )
  // },
  {
    title: 'Ultima modificare',
    field: 'batch.modifiedBy',
    render: row => <BodyItem name="Ultima modificare" value={row?.batch?.modifiedBy} />
  },
  {
    title: 'Data ultimei modificari',
    field: 'batch.modifiedDate',
    render: row => (
      <BodyItem
        name="Data ultimei modificari"
        value={formatBakeryPayloadDate(row?.batch?.modifiedDate)}
      />
    )
  },
  {
    title: 'Data deschiderii',
    field: 'batch.openingDate',
    render: row => (
      <BodyItem
        name="Data deschiderii"
        value={row.batch?.hasSecondaryDlc ? formatBakeryPayloadDate(row?.openingDate) : ''}
      />
    )
  },
  {
    title: 'DLC secundar',
    render: row => (
      <BodyItem
        name="DLC secundar"
        value={
          row.batch?.hasSecondaryDlc
            ? formatBakeryPayloadDate(dayjs(row.openingDate).add(row.batch?.dlcDays, 'days'))
            : ''
        }
      />
    )
  },
  {
    title: 'Cant.fab.lot',
    render: row => <BodyItem name="Cant.fab.lot" value={row?.quantity} />
  }
]

export const mainItemBodyColumns = [
  {
    title: 'Operator productie',
    field: 'productionOperator'
  },
  {
    title: 'Stare termica',
    field: 'thermalCondition',
    render: row => <BodyItem name="Stare termica" value={ThermalCondition[row.thermalCondition]} />
  },
  {
    title: 'Conform',
    field: 'conform',
    render: row => (
      <BodyItem name="Conform" value={<IconCell value={row.conform ? 'active' : 'inactive'} />} />
    )
  },
  {
    title: 'Motiv neconformitate',
    field: 'nonComplianceReason'
  },
  {
    title: 'Destinatia prod. neconform',
    field: 'productDestination'
  },
  {
    title: 'Operator trasabilitate',
    field: 'createdBy'
  },
  {
    title: 'Data introducere',
    field: 'createdDate',
    render: row => (
      <BodyItem name="Data introducere" value={formatBakeryPayloadDate(row.createdDate)} />
    )
  },
  {
    title: 'Verificare de catre validator trasabilitate',
    field: 'isVerified',
    render: row => (
      <BodyItem name="Verificare de catre validator trasabilitate" value={<IconCell value={row.isVerified ? 'active' : 'inactive'} />} />
    )
  },
  {
    title: 'Validator trasabilitate',
    field: 'verifiedBy'
  },
  {
    title: 'Data verificare trasabilitate',
    field: 'verifiedDate'
  },
  {
    title: 'Ultima modificare',
    field: 'modifiedBy'
  },
  {
    title: 'Data ultimei modificari',
    field: 'modifiedDate',
    render: row => (
      <BodyItem name="Data ultimei modificari" value={formatBakeryPayloadDate(row.modifiedDate)} />
    )
  },
  {
    title: 'Sarja',
    field: 'chargeNumber'
  },
  { title: 'Cantitate sarja', field: 'quantity' },
  {
    title: 'Cod PLU',
    render: row => <BodyItem name="Cod PLU" value={row.product?.pluCode || ''} />
  },
  {
    title: 'Data productiei',
    field: 'productionDate',
    render: row => (
      <BodyItem name="Data productiei" value={formatBakeryPayloadDate(row.productionDate)} />
    )
  },
  {
    title: 'DLC',
    render: row => (
      <BodyItem
        name="DLC"
        value={
          row?.product?.dlcDays
            ? formatBakeryPayloadDate(dayjs(row.productionDate).add(row?.product?.dlcDays, 'days'))
            : ''
        }
      />
    )
  }
]
