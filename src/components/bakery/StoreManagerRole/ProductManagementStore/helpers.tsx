import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { DescriptionText } from 'components/core-ui/DescriptionText'
import { ImageCell } from 'components/core-ui/ImageCell'
import * as Yup from 'yup'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    width: '200px',
    sticky: true,
    render: row => <ImageCell imageUrl={row.imageUrl} value={row.productName} />
  },
  {
    title: 'Cod METI',
    field: 'metiCode',
    align: 'left',
    width: '200px',
    sticky: true
  },
  {
    title: 'Cod EAN',
    field: 'eanCodes',
    align: 'left'
  },
  {
    title: 'Cod PLU',
    field: 'pluCode',
    align: 'left',
    minWidth: '150px'
  },
  {
    title: 'Cod APPEL PRIX',
    field: 'appelCodes',
    align: 'left',
    minWidth: '200px'
  },
  {
    title: 'Raion',
    field: 'familyModuleName',
    align: 'left'
  },
  {
    title: 'Familie',
    field: 'familyName',
    align: 'left'
  },
  {
    title: 'Subfamilie',
    field: 'subfamily',
    align: 'left'
  },
  {
    title: 'UB',
    field: 'unitBusiness',
    align: 'left'
  },
  {
    title: 'Status',
    field: 'status',
    align: 'center'
  },
  {
    title: 'Furnizor',
    field: 'provider',
    align: 'left'
  },
  {
    title: 'Metoda fabricatie',
    field: 'fabricationMethod',
    align: 'left',
    minWidth: '200px',
    render: row => <DescriptionText value={row.fabricationMethod} />
  },
  {
    title: 'Cluster',
    field: 'clusterName',
    align: 'left'
  },
  {
    title: 'Obligatoriu',
    field: 'clusterMandatory',
    align: 'center',
    render: row => (
      <BooleanIcon
        value={row.clusterMandatory}
        icon="CheckCircleOutline"
        onFailure="#E5E5E5"
        onSuccess="#33691E"
      />
    )
  },
  {
    title: 'Produs cadentier',
    field: 'scheduleProduct',
    align: 'center',
    minWidth: '200px',
    render: row => (
      <BooleanIcon
        value={row.scheduleProduct}
        icon="CheckCircleOutline"
        onFailure="#E5E5E5"
        onSuccess="#33691E"
      />
    )
  },
  {
    title: 'Stoc minim prezentare',
    field: 'minStock',
    align: 'left',
    minWidth: '250px'
  },
  {
    title: 'Produs nou',
    field: 'newProduct',
    align: 'center',
    minWidth: '150px',
    render: row => (
      <BooleanIcon
        value={row.newProduct}
        icon="CheckCircleOutline"
        onFailure="#E5E5E5"
        onSuccess="#33691E"
      />
    )
  }
]

export const getInitialValues = editItem => ({
  scheduleProduct: editItem?.scheduleProduct ?? '',
  minStock: editItem?.minStock ?? ''
})

export const editStoreValidationSchema = Yup.object().shape({
  minStock: Yup.string(),
  scheduleProduct: Yup.string()
});
