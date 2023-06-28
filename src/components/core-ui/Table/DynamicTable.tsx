import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import dayjs from 'dayjs'
import 'dayjs/locale/ro'
import Table from './Table'

const DynamicTable = props => {
  const { columns, frequency, ...rest } = props

  const table = useSelector((state: RootState) => state.table)
  const { filters } = table

  dayjs.locale('ro')

  const dynamicColumns = useMemo(() => {
    return columns.reduce(
      (result, col, index) => {
        if (col.isDynamic) {
          const { filterDep } = col
          const [startDate, endDate] = filterDep.name

          if (startDate && endDate) {
            const startValue = dayjs(filters[startDate])
            const endValue = dayjs(filters[endDate])

            if (endValue.isAfter(startValue) || endValue.isSame(startValue)) {
              const datesArray = []
              let currentDate = startValue

              while (currentDate.isSame(endValue) || currentDate.isBefore(endValue)) {
                const formattedDate = currentDate.format('D MMMM')
                const newColumn = {
                  ...col,
                  title: `${col.title}\r\n${formattedDate}`,
                  field: col.field + `.[${datesArray.length}]`
                }
                datesArray.push(newColumn)
                currentDate = currentDate.add(1, frequency)

                if (currentDate.isAfter(endValue)) {
                  break // Exit the loop if currentDate exceeds endValue
                }
              }

              result.splice(index, 1, ...datesArray)
            }
          }
        }

        return result
      },
      [...columns]
    )
  }, [columns, filters])

  return <Table columns={dynamicColumns} {...rest} />
}

export default DynamicTable
