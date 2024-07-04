import * as Yup from 'yup'
import { Checkbox, TimePicker } from '@fullscreendigital/carrefour-dex-fe'
import { toTableRowItems } from './serializers'

export const getValidationSchema = (editItem: AdminStore) =>
  Yup.object().shape({
    code: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string()
    }),
    metiVersion: Yup.object().shape({
      label: Yup.string().required('Campul este obligatoriu.'),
      value: Yup.string().required('Campul este obligatoriu.')
    }),
    adCode: Yup.string().required(),
    parentSociety: Yup.object().shape({
      label: Yup.string().required('Campul este obligatoriu.'),
      value: Yup.string().required('Campul este obligatoriu.')
    }),
    receptionDeviation: Yup.number().required('Campul este obligatoriu.'),
    sftpIp: Yup.string().required('Campul este obligatoriu.'),
    sftpPath: Yup.string().required('Campul este obligatoriu.'),
    depositIds: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string().required('Campul este obligatoriu.'),
          value: Yup.string().required('Campul este obligatoriu.')
        })
      )
      .required('Campul este obligatoriu.'),
    address: Yup.string().required('Campul este obligatoriu.'),
    city: Yup.string().required('Campul este obligatoriu.'),
    town: Yup.string().required('Campul este obligatoriu.'),

    canEditQuantities: Yup.boolean(),
    canCallReturnTruck: Yup.boolean(),
    active: Yup.boolean().required('Campul este obligatoriu.')
  })

export const getInitialValues = (editItem: AdminStore) => {
  return {
    id: editItem?.id || null,
    code: { label: editItem?.metiCode, value: editItem?.metiCode } || '',
    metiVersion: { label: editItem?.metiVersion, value: editItem?.metiVersion } || '',
    adCode: editItem?.adCode || '',
    parentSociety: { label: editItem?.parentSociety, value: editItem?.parentSociety } || '',
    receptionDeviation: editItem?.receptionDeviation || '',
    sftpIp: editItem?.sftpIp || '',
    sftpPath: editItem?.sftpPath || '',
    address: editItem?.address || '',
    city: editItem?.city || '',
    town: editItem?.town || '',
    canEditQuantities: editItem?.canEditQuantities || false,
    canCallReturnTruck: editItem?.canCallReturnTruck || false,
    active: editItem?.active || false
  }
}

export const getColumns = (formik, setTableItems) => [
  {
    title: 'Receptioneaza',
    field: 'receiveFromDeposit',
    render: row => (
      <Checkbox
        checked={row.receiveFromDeposit}
        onChange={() => {
          const updatedValues = formik.values.map(item => {
            if (item.depositId === row.depositId) {
              return {
                ...item,
                receiveFromDeposit: !item.receiveFromDeposit
              }
            }
            return item
          })
          setTableItems(toTableRowItems(updatedValues))
          formik.setValues(updatedValues)
        }}
      />
    )
  },
  {
    title: 'Cod depozit',
    field: 'depositCode',
    render: row => row.depositCode
  },
  {
    title: 'Nume',
    field: 'depositName',
    render: row => row.depositName
  },
  {
    title: 'Luni',
    field: 'monday',
    render: row => (
      <Checkbox
        checked={row.monday}
        onChange={() => {
          const updatedValues = formik.values.map(item => {
            if (item.depositId === row.depositId) {
              return {
                ...item,
                monday: !item.monday
              }
            }
            return item
          })
          setTableItems(toTableRowItems(updatedValues))
          formik.setValues(updatedValues)
        }}
        disabled={!row.receiveFromDeposit}
      />
    )
  },
  {
    title: 'Marti',
    field: 'tuesday',
    render: row => (
      <Checkbox
        checked={row.tuesday}
        onChange={() => {
          const updatedValues = formik.values.map(item => {
            if (item.depositId === row.depositId) {
              return {
                ...item,
                tuesday: !item.tuesday
              }
            }
            return item
          })
          setTableItems(toTableRowItems(updatedValues))
          formik.setValues(updatedValues)
        }}
        disabled={!row.receiveFromDeposit}
      />
    )
  },
  {
    title: 'Miercuri',
    field: 'wednesday',
    render: row => (
      <Checkbox
        checked={row.wednesday}
        onChange={() => {
          const updatedValues = formik.values.map(item => {
            if (item.depositId === row.depositId) {
              return {
                ...item,
                wednesday: !item.wednesday
              }
            }
            return item
          })
          setTableItems(toTableRowItems(updatedValues))
          formik.setValues(updatedValues)
        }}
        disabled={!row.receiveFromDeposit}
      />
    )
  },
  {
    title: 'Joi',
    field: 'thursday',
    render: row => (
      <Checkbox
        checked={row.thursday}
        onChange={() => {
          const updatedValues = formik.values.map(item => {
            if (item.depositId === row.depositId) {
              return {
                ...item,
                thursday: !item.thursday
              }
            }
            return item
          })
          setTableItems(toTableRowItems(updatedValues))
          formik.setValues(updatedValues)
        }}
        disabled={!row.receiveFromDeposit}
      />
    )
  },
  {
    title: 'Vineri',
    field: 'friday',
    render: row => (
      <Checkbox
        checked={row.friday}
        onChange={() => {
          const updatedValues = formik.values.map(item => {
            if (item.depositId === row.depositId) {
              return {
                ...item,
                friday: !item.friday
              }
            }
            return item
          })
          setTableItems(toTableRowItems(updatedValues))
          formik.setValues(updatedValues)
        }}
        disabled={!row.receiveFromDeposit}
      />
    )
  },
  {
    title: 'Sambata',
    field: 'saturday',
    render: row => (
      <Checkbox
        checked={row.saturday}
        onChange={() => {
          const updatedValues = formik.values.map(item => {
            if (item.depositId === row.depositId) {
              return {
                ...item,
                saturday: !item.saturday
              }
            }
            return item
          })
          setTableItems(toTableRowItems(updatedValues))
          formik.setValues(updatedValues)
        }}
        disabled={!row.receiveFromDeposit}
      />
    )
  },
  {
    title: 'Duminica',
    field: 'sunday',
    render: row => (
      <Checkbox
        checked={row.sunday}
        onChange={() => {
          const updatedValues = formik.values.map(item => {
            if (item.depositId === row.depositId) {
              return {
                ...item,
                sunday: !item.sunday
              }
            }
            return item
          })
          setTableItems(toTableRowItems(updatedValues))
          formik.setValues(updatedValues)
        }}
        disabled={!row.receiveFromDeposit}
      />
    )
  },
  {
    title: 'Start',
    field: 'startInterval',
    render: row => (
      <TimePicker
        value={row.startInterval}
        onChange={newStartInterval => {
          const updatedValues = formik.values.map(item => {
            if (item.depositId === row.depositId) {
              return {
                ...item,
                startInterval: newStartInterval
              }
            }
            return item
          })
          setTableItems(toTableRowItems(updatedValues))
          formik.setValues(updatedValues)
        }}
      />
    )
  },
  {
    title: 'Stop',
    field: 'endInterval',
    render: row => (
      <TimePicker
        value={row.endInterval}
        onChange={newEndInterval => {
          const updatedValues = formik.values.map(item => {
            if (item.depositId === row.depositId) {
              return {
                ...item,
                endInterval: newEndInterval
              }
            }
            return item
          })
          setTableItems(toTableRowItems(updatedValues))
          formik.setValues(updatedValues)
        }}
      />
    )
  }
]
