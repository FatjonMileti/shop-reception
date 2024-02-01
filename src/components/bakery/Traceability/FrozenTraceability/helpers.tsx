import { formatBakeryPayloadDate } from 'utils/helpers'
import { BodyItem } from '../ProductManagementTraceability/AccordionTable'

export const columns: any[] = [
  {
    title: 'Data intrare lot',
    field: 'entryDate'
  },
  {
    title: 'Operator trasabilitate',
    field: 'createdBy',
    render: (row, charge) => <BodyItem name="Operator trasabilitate" value={charge.createdBy} />
  },
  {
    title: 'Ultima modificare',
    field: 'modifiedBy',
    render: (row, charge) => <BodyItem name="Ultima modificare" value={charge.modifiedBy} />
  },
  {
    title: 'Furnizor',
    field: 'supplierName',
    render: row => <BodyItem name="Furnizor" value={row.batch.supplier.supplierName} />
  },
  {
    title: 'Stare termica',
    field: 'thermalCondition'
  },
  {
    title: 'Data introducere',
    field: 'createdDate',
    render: (row, charge) => (
      <BodyItem name="Data introducere" value={formatBakeryPayloadDate(charge.createdDate)} />
    )
  },
  {
    title: 'Data ultimei modificari',
    field: 'modifiedDate',
    render: (row, charge) => (
      <BodyItem
        name="Data ultimei modificari"
        value={formatBakeryPayloadDate(charge.modifiedDate)}
      />
    )
  },
  {
    title: 'DLC sec. lot',
    field: 'openingDate',
    render: row => <BodyItem name="DLC sec. lot" value={row.batch.openingDate} />
  },
  {
    title: 'Conform',
    field: 'conform'
  },
  {
    title: 'Verificare de catre validator trasabilitate',
    field: 'verified'
  },
  {
    title: 'DLC MP',
    field: 'dlc',
    render: row => <BodyItem name="DLC MP" value={formatBakeryPayloadDate(row.batch.expireDate)} />
  },
  {
    title: 'Motiv neconformitate',
    field: 'nonComplianceReason',
    render: (row, charge) => (
      <BodyItem name="Motiv neconformitate" value={charge.nonComplianceReason} />
    )
  },
  {
    title: 'Validator trasabilitate',
    field: 'verifiedBy',
    render: (row, charge) => <BodyItem name="Validator trasabilitate" value={charge.verifiedBy} />
  },
  {
    title: 'Destinatia prod. neconform',
    field: 'productDestination',
    render: (row, charge) => (
      <BodyItem name="Validator trasabilitate" value={charge.productDestination} />
    )
  },
  {
    title: 'Data verificare trasabilitate',
    field: 'verifiedDate',
    render: (row, charge) => (
      <BodyItem name="Data verificare trasabilitate" value={charge.verifiedDate} />
    )
  }
]
