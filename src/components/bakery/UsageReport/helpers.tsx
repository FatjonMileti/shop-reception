import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import dayjs from 'dayjs'
import { UsageReportItem } from '../interfaces'


export const stickyColumns = [
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

export const columns = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => {
  let currentDate = startDate
  // let currentDate = dayjs(startDate)

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

  let printCandentierColumns = []
  let modifyCadentierColumns = []
  let modifyStoreGrowthColumns = []
  let modifyProductGrowthColumns = []
  let loginColumns = []
  
  
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    const day = dayjs(currentDate).format('D')
    const month = dayjs(currentDate).format('MMMM')
    
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
          <IconCell value={row.applicationReportDynamicDtos[0].printCadentier ? 'active' : 'inactive'}/>
        </Box>
      )
    });

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
            <IconCell value={row.applicationReportDynamicDtos[0].modifyCadentier ? 'active' : 'inactive'} />
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
            <IconCell value={row.applicationReportDynamicDtos[0].modifyStoreGrowth ? 'active' : 'inactive'} />
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
      render: row => {console.log(row); return (
          <Box>
            <IconCell value={row.applicationReportDynamicDtos[0].modifyProductGrowth ? 'active' : 'inactive'} />
          </Box>
      )}
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
            <IconCell value={row.applicationReportDynamicDtos[0].login ? 'active' : 'inactive'} />
          </Box>
      )
    })

    currentDate = currentDate.add(1, 'day');
  }

  return [...stickyColumns, ...printCandentierColumns, ...modifyCadentierColumns, ...modifyStoreGrowthColumns, ...modifyProductGrowthColumns, ...loginColumns]
}

//  export const columns = [
//     {
//       title: 'Magazin',
//       field: 'storeName',
//       align: 'left',
//       sticky: true,
//     },
//     {
//       title: 'Utilizator',
//       field: 'username',
//       align: 'left',
//       sticky: true,
//     },
//     {
//       title: 'Data ultimei accesari',
//       field: 'lastAccess',
//       align: 'left',
//       sticky: true,
//     },
//     {
//       title: 'Data ultimei modificari',
//       field: 'lastChange',
//       align: 'left',
//       sticky: true,
//     },
//     {
//       title: 'Descarcare Cadantier',
//       field: 'printCadentier',
//       align: 'center',
//       minWidth: '160px',
//       filterDep: {
//         name: ["startDate", "endDate"],
//         type: 'daily'
//       },
//       isDynamic: true,
//       render: row => (
//         <Box>
//           <IconCell value={row.applicationReportDynamicDtos[0].printCadentier ? 'active' : 'inactive'}/>
//         </Box>
//       )
//     },
//     {
//         title: 'Modificare cadantier',
//         field: 'modifyCadentier',
//         align: 'center',
//         minWidth: '200px',
//         filterDep: {
//           name: ["startDate", "endDate"],
//           type: 'daily'
//         },
//         isDynamic: true,
//         render: row => (
//             <Box>
//               <IconCell value={row.applicationReportDynamicDtos[0].modifyCadentier ? 'active' : 'inactive'} />
//             </Box>
//         )
//     },
//     {
//         title: 'Coeficient de crestere magazin',
//         field: 'modifyStoreGrowth',
//         align: 'center',
//         minWidth: '250px',
//         filterDep: {
//           name: ["startDate", "endDate"],
//           type: 'daily'
//         },
//         isDynamic: true,
//         render: row => (
//             <Box>
//               <IconCell value={row.applicationReportDynamicDtos[0].modifyStoreGrowth ? 'active' : 'inactive'} />
//             </Box>
//         )
//     },
//     {
//         title: 'Coeficient de crestere produse',
//         field: 'modifyProductGrowth',
//         align: 'center',
//         minWidth: '250px',
//         filterDep: {
//           name: ["startDate", "endDate"],
//           type: 'daily'
//         },
//         isDynamic: true,
//         render: row => {console.log(row); return (
//             <Box>
//               <IconCell value={row.applicationReportDynamicDtos[0].modifyProductGrowth ? 'active' : 'inactive'} />
//             </Box>
//         )}
//     },
//     {
//         title: 'Accesare applicatie',
//         field: 'login',
//         align: 'center',
//         minWidth: '180px',
//         filterDep: {
//           name: ["startDate", "endDate"],
//           type: 'daily'
//         },
//         isDynamic: true,
//         render: row => (
//             <Box>
//               <IconCell value={row.applicationReportDynamicDtos[0].login ? 'active' : 'inactive'} />
//             </Box>
//         )
//     }
// ]


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