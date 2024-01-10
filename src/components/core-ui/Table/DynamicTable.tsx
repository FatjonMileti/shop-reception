import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import dayjs from 'dayjs'
import 'dayjs/locale/ro'
import Table from './Table'
import { formatPayloadDate } from "../../../utils/helpers";

const DynamicTable = props => {
  const { columns, frequency, extraUrlParams, ...rest } = props

  const startDate = extraUrlParams.find(item => item.name === 'startDate')?.value
  const endDate = extraUrlParams.find(item => item.name === 'endDate')?.value

  dayjs.locale('ro')

  const dynamicColumns = useMemo(() => {
    return columns.reduce(
      (result, col) => {
        if (col.isDynamic) {
          if(!startDate || !endDate){
            return columns
          }

          const startValue = startDate ? dayjs(startDate) : dayjs(new Date());
          const endValue = endDate ? dayjs(endDate) : dayjs(new Date());

          if (endValue.isAfter(startValue, 'day') || endValue.isSame(startValue, 'day')) {
            const datesArray = []
            let currentDate = startValue

            while (
              currentDate.isSame(endValue, 'day') ||
              currentDate.isBefore(endValue)
            ) {
              const formattedDate = currentDate.format('D MMMM')
              const newColumn = {
                ...col,
                collapsible: true,
                title: `${col.title} ${formattedDate}`,
                field: `applicationReportDynamicDtos.[${datesArray.length}].${col.field}`,
                originalField: col.field,
                find: { date: formatPayloadDate(currentDate) },
                disableSorting: true,
              }
              datesArray.push(newColumn)
              currentDate = currentDate.add(1, 'day')

              if (currentDate.isAfter(endValue, 'day')) {
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
  }, [columns, rest])

  return <Table columns={dynamicColumns} extraUrlParams={extraUrlParams} {...rest} />
}

export default DynamicTable
