import { Checkbox, TimePicker } from '@fullscreendigital/carrefour-dex-fe'
import { toTableRowItems } from './serializers'

export const columns = (formik, setTableItems) => [
  {
    title: 'Receptioneaza',
    field: 'receiveFromDeposit',
    align: 'left',
    type: 'string',
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
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume',
    field: 'depositName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Luni',
    field: 'monday',
    align: 'left',
    type: 'string',
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
      />
    )
  },
  {
    title: 'Marti',
    field: 'tuesday',
    align: 'left',
    type: 'string',
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
      />
    )
  },
  {
    title: 'Miercuri',
    field: 'wednesday',
    align: 'left',
    type: 'string',
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
      />
    )
  },
  {
    title: 'Joi',
    field: 'thursday',
    align: 'left',
    type: 'string',
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
      />
    )
  },
  {
    title: 'Vineri',
    field: 'friday',
    align: 'left',
    type: 'string',
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
      />
    )
  },
  {
    title: 'Sambata',
    field: 'saturday',
    align: 'left',
    type: 'string',
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
      />
    )
  },
  {
    title: 'Duminica',
    field: 'sunday',
    align: 'left',
    type: 'string',
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
      />
    )
  },
  {
    title: 'Start',
    field: 'startInterval',
    align: 'left',
    type: 'string',
    width: '200px',
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
    align: 'left',
    type: 'string',
    width: '200px',
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
