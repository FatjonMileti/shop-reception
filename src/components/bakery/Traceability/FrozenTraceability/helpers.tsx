import { formatBakeryPayloadDate, formatPayloadDate } from 'utils/helpers'
import { BodyItem } from '../ProductManagementTraceability/AccordionTable'
import { IconCell } from '../../../core-ui/IconCell'
import { BooleanIcon } from '../../../core-ui/BooleanIcon'
import { ImageCell } from '../../../core-ui/ImageCell'
import { ThermalCondition } from 'components/bakery/interfaces'
import { BatchStatus } from '../interfaces'

export const columns: any[] = [
  {
    title: 'Data intrare in raion',
    field: 'batch.entryDate',
    render: row => (
      <BodyItem name="Data intrare in raion" value={formatPayloadDate(row?.batch?.entryDate)} />
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
    title: 'Lot',
    field: 'batch.batchQuantity',
    render: row => <BodyItem name="Lot" value={row?.batch?.batchQuantity} />
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
      <BodyItem name="Data expirare" value={formatPayloadDate(row?.batch?.expireDate)} />
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
    title: 'Poza eticheta',
    field: 'imageUrl',
    render: row => (
      <BodyItem name="Poza eticheta" value={<ImageCell value={''} imageUrl={row?.imageUrl} />} />
    )
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
        value={formatPayloadDate(row?.batch?.createdDate)}
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
        value={formatPayloadDate(row?.batch?.modifiedDate)}
      />
    )
  }
  // ------------------------

  // {
  //   title: 'Data intrare lot',
  //   field: 'entryDate',
  // },
  // {
  //   title: 'Operator trasabilitate',
  //   field: 'createdBy',
  //   render: (row, charge) => <BodyItem name="Operator trasabilitate" value={charge.createdBy} />
  // },
  // {
  //   title: 'Ultima modificare',
  //   field: 'modifiedBy',
  //   render: (row, charge) => <BodyItem name="Ultima modificare" value={charge.modifiedBy} />
  // },
  // {
  //   title: 'Furnizor',
  //   field: 'supplierName',
  //   render: row => <BodyItem name="Furnizor" value={row.batch.supplier.supplierName} />
  // },
  // {
  //   title: 'Stare termica',
  //   field: 'thermalCondition'
  // },
  // {
  //   title: 'Data introducere',
  //   field: 'createdDate',
  //   render: (row, charge) => (
  //     <BodyItem name="Data introducere" value={formatBakeryPayloadDate(charge.createdDate)} />
  //   )
  // },
  // {
  //   title: 'Data ultimei modificari',
  //   field: 'modifiedDate',
  //   render: (row, charge) => (
  //     <BodyItem
  //       name="Data ultimei modificari"
  //       value={formatBakeryPayloadDate(charge.modifiedDate)}
  //     />
  //   )
  // },
  // {
  //   title: 'DLC sec. lot',
  //   field: 'openingDate',
  //   render: row => <BodyItem name="DLC sec. lot" value={row.batch.openingDate} />
  // },
  // {
  //   title: 'Conform',
  //   field: 'conform'
  // },
  // {
  //   title: 'Verificare de catre validator trasabilitate',
  //   field: 'verified'
  // },
  // {
  //   title: 'DLC MP',
  //   field: 'dlc',
  //   render: row => <BodyItem name="DLC MP" value={formatBakeryPayloadDate(row.batch.expireDate)} />
  // },
  // {
  //   title: 'Motiv neconformitate',
  //   field: 'nonComplianceReason',
  //   render: (row, charge) => (
  //     <BodyItem name="Motiv neconformitate" value={charge.nonComplianceReason} />
  //   )
  // },
  // {
  //   title: 'Validator trasabilitate',
  //   field: 'verifiedBy',
  //   render: (row, charge) => <BodyItem name="Validator trasabilitate" value={charge.verifiedBy} />
  // },
  // {
  //   title: 'Destinatia prod. neconform',
  //   field: 'productDestination',
  //   render: (row, charge) => (
  //     <BodyItem name="Validator trasabilitate" value={charge.productDestination} />
  //   )
  // },
  // {
  //   title: 'Data verificare trasabilitate',
  //   field: 'verifiedDate',
  //   render: (row, charge) => (
  //     <BodyItem name="Data verificare trasabilitate" value={charge.verifiedDate} />
  //   )
  // }
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
    field: 'verified'
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
  { title: 'Cod PLU', field: '-' },
  {
    title: 'Data productiei',
    field: 'productionDate'
  }
]

export const selectBatchColumns: any[] = [
  {
    title: 'Data intrare',
    field: 'entryDate',
    align: 'left',
    type: 'string',
    width: '100px',
    render: (row: any) => formatBakeryPayloadDate(row.entryDate)
  },
  {
    title: 'Nr. lot',
    field: 'batchName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Furnizor',
    field: 'supplier.supplierName',
    align: 'left',
    render: (row: any) => row.supplier.supplierName,
    type: 'string',
    width: '250px'
  },
  {
    title: 'Data expirare',
    field: 'expireDate',
    align: 'left',
    type: 'string',
    width: '100px',
    render: (row: any) => formatBakeryPayloadDate(row.expireDate)
  },
  {
    title: 'Cantitate intrata',
    field: 'batchQuantity',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cantitate consumata',
    field: 'consumedAmount',
    align: 'left',
    type: 'string',
    width: '100px',
    render: (row: any) => row.consumedAmount || ''
  },
  {
    title: 'Nr. zile DLC',
    field: 'dlcDays',
    align: 'left',
    type: 'string',
    width: '110px',
    render: (row: any) => row.dlcDays || ''
  }
]
