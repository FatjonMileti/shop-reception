import { useEffect, useMemo } from 'react'
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

          const startValue = filters[startDate] ? dayjs(filters[startDate]) : dayjs(new Date())
          const endValue = filters[endDate]
            ? dayjs(filters[endDate])
            : dayjs(new Date()).add(1, 'day')

          if (endValue.isAfter(startValue) || endValue.isSame(startValue)) {
            const datesArray = []
            let currentDate = startValue

            while (
              currentDate.isSame(endValue) ||
              currentDate.isBefore(endValue) ||
              currentDate.isSame(startValue)
            ) {
              const formattedDate = currentDate.format('D MMMM')
              const newColumn = {
                align: col.align,
                type: col.type,
                render: col.render,
                collapsible: true,
                title: `${col.title} ${formattedDate}`,
                field: col.field + `.[${datesArray.length}]`
              }
              datesArray.push(newColumn)
              currentDate = currentDate.add(1, 'day')

              if (currentDate.isAfter(endValue)) {
                break // Exit the loop if currentDate exceeds endValue
              }
            }

            result.push(...datesArray.sort((a, b) => a - b))
          }
        }

        return result
      },
      [...columns.filter(col => !col.isDynamic)]
    )
  }, [columns, filters])

  return <Table columns={dynamicColumns} {...rest} />
}

export default DynamicTable
