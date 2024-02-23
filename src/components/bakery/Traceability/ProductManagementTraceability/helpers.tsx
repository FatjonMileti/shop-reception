import { BodyItem, Column } from './AccordionTable'
import { BooleanIcon } from '../../../core-ui/BooleanIcon'
import { DescriptionText } from '../../../core-ui/DescriptionText'
import React from 'react'

export const columns: Column[] = [
  {
    title: 'Cod EAN',
    field: 'eanCodes'
  },
  {
    title: 'Cod PLU',
    field: 'pluCode'
  },
  {
    title: 'Cod APPEL PRIX',
    field: 'appelCodes'
  },
  {
    title: 'Raion',
    field: 'familyModuleName'
  },
  {
    title: 'UB',
    field: 'unitBusiness'
  },
  {
    title: 'Status',
    field: 'status'
  },
  {
    title: 'Furnizor',
    field: 'suppliers'
  },
  {
    title: 'Lot',
    field: 'batch',
    render: row => (
      <BodyItem
        name="Lot"
        value={
          <BooleanIcon value={row.batch} icon="Flag" onFailure="#FFFFFF" onSuccess="#33691E" />
        }
      />
    )
  },
  {
    title: 'Metoda fabricatie',
    field: 'fabricationMethod',
    render: row => (
      <BodyItem
        name="Metoda fabricatie"
        value={<DescriptionText value={row.fabricationMethod} />}
      />
    )
  },
  {
    field: 'clusterName',
    render: data => <BodyItem name="Cluster" value={data.clusterName} />
  },
  {
    field: 'clusterMandatory',
    render: data => (
      <BodyItem
        name="Obligatoriu"
        value={
          <BooleanIcon
            value={data.clusterMandatory}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    field: 'scheduleProduct',
    render: data => (
      <BodyItem
        name="Produs cadentier"
        value={
          <BooleanIcon
            value={data.scheduleProduct}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    field: 'minStock',
    title: 'Stoc minim prezentare'
  },
  {
    render: data => (
      <BodyItem
        name="Produs nou"
        value={
          <BooleanIcon
            value={data.newProduct}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    ),
    field: 'newProduct'
  }
]

export const headerItems: Column[] = [
  {
    title: 'Cod METI',
    field: 'metiCode'
  },
  {
    title: 'Familie',
    field: 'familyName'
  },
  {
    title: 'Subfamilie',
    field: 'subfamily'
  }
]