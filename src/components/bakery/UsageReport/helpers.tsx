import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import dayjs from 'dayjs'
import { useMemo } from 'react';
import { formatMonthsToRO, formatPayloadDate } from 'utils/helpers';

export const ColumnsComponent = ( startDate: dayjs.Dayjs, endDate: dayjs.Dayjs ) => {
  const memoizedColumns = useMemo(() => columns(startDate, endDate), [startDate, endDate]);

  return (memoizedColumns);
};

export const columns = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => {
  let currentDate = startDate
  let printCandentierColumns = []
  let modifyCadentierColumns = []
  let modifyStoreGrowthColumns = []
  let modifyProductGrowthColumns = []
  let loginColumns = []
  
  const stickyColumns = [
    {
      title: 'Magazin',
      field: 'storeName',
      align: 'left',
      sticky: true,
    },
    {
      title: 'Utilizator',
      field: 'username',
      align: 'left',
      sticky: true,
    },
    {
      title: 'Data ultimei accesari',
      field: 'lastAccess',
      align: 'left',
      sticky: true,
    },
    {
      title: 'Data ultimei modificari',
      field: 'lastChange',
      align: 'left',
      sticky: true,
    },
  ]

  while (dayjs(currentDate).isBefore(endDate) || dayjs(currentDate).isSame(endDate, 'day')) {
    const dayIndex = currentDate.clone()
    const day = dayjs(currentDate).format('D')
    const month = formatMonthsToRO(dayjs(currentDate).format('MMMM'))

    printCandentierColumns.push({
      title: `Descarcare Cadantier ${day} ${month}`,
      field: 'printCadentier',
      align: 'center',
      minWidth: '160px',
      filterDep: {
        name: ["startDate", "endDate"],
        type: 'daily'
      },
      isDynamic: true,
      render: row => (
        <Box>
          <IconCell 
            key={`descarcareCadentier${day}${month}`} 
            value={row.applicationReportDynamicDtos.find(dto => dto.date === formatPayloadDate(dayIndex))?.printCadentier ? 'active' : 'inactive'} />
        </Box>
      )
    })
    modifyCadentierColumns.push({
      title: `Modificare cadantier ${day} ${month}`,
      field: 'modifyCadentier',
      align: 'center',
      minWidth: '200px',
      filterDep: {
        name: ["startDate", "endDate"],
        type: 'daily'
      },
      isDynamic: true,
      render: row => (
          <Box>
            <IconCell key={`modificareCadentier${day}${month}`} value={row.applicationReportDynamicDtos.find(dto => dto.date === formatPayloadDate(dayIndex))?.modifyCadentier ? 'active' : 'inactive'} />
          </Box>
      )
    })
    modifyStoreGrowthColumns.push({
      title: `Coeficient de crestere magazin ${day} ${month}`,
      field: 'modifyStoreGrowth',
      align: 'center',
      minWidth: '250px',
      filterDep: {
        name: ["startDate", "endDate"],
        type: 'daily'
      },
      isDynamic: true,
      render: row => (
          <Box>
            <IconCell key={`coeficientCrestereMagazin${day}${month}`} value={row.applicationReportDynamicDtos.find(dto => dto.date === formatPayloadDate(dayIndex))?.modifyStoreGrowth ? 'active' : 'inactive'} />
          </Box>
      )
    })
    modifyProductGrowthColumns.push({
      title: `Coeficient de crestere produse ${day} ${month}`,
      field: 'modifyProductGrowth',
      align: 'center',
      minWidth: '250px',
      filterDep: {
        name: ["startDate", "endDate"],
        type: 'daily'
      },
      isDynamic: true,
      render: row => (
          <Box>
            <IconCell key={`coeficientCrestereProduse${day}${month}`} value={row.applicationReportDynamicDtos.find(dto => dto.date === formatPayloadDate(dayIndex))?.modifyProductGrowth ? 'active' : 'inactive'} />
          </Box>
      )
    })
    loginColumns.push({
      title: `Accesare applicatie ${day} ${month}`,
      field: 'login',
      align: 'center',
      minWidth: '180px',
      filterDep: {
        name: ["startDate", "endDate"],
        type: 'daily'
      },
      isDynamic: true,
      render: row => (
          <Box>
            <IconCell key={`login${day}${month}`} value={row.applicationReportDynamicDtos.find(dto => dto.date === formatPayloadDate(dayIndex))?.login ? 'active' : 'inactive'} />
          </Box>
      )
    })

    currentDate = dayjs(currentDate).add(1, 'day')
  }
  return [...stickyColumns, ...printCandentierColumns, ...modifyCadentierColumns, ...modifyStoreGrowthColumns, ...modifyProductGrowthColumns, ...loginColumns];
};

export const formatAndDownloadResponse = fileObject => {
  const { data, headers } = fileObject
  let fileName
  try {
    fileName = headers.get('Content-Disposition').split(';')[1].split('filename=')[1]
  } catch (error) {
    fileName = 'test.xlsx'
  }
  const blobUrl = URL.createObjectURL(data)

  const link = document.createElement('a')
  link.href = blobUrl
  link.download = fileName
  link.click()

  URL.revokeObjectURL(blobUrl)
}