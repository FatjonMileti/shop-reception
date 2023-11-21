import { Box } from '@mui/system'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { BooleanText } from 'components/core-ui/BooleanText'
import { ImageCell } from 'components/core-ui/ImageCell'

export const columns = () => {
  const stickyColumns = [
    {
      title: 'Produs',
      field: 'productName',
      align: 'left',
      sticky: true,
      render: row => (
        <ImageCell imageUrl={row.productImageUrl} value={row.productName} />
      )
    },
    {
      title: 'Cod METI',
      field: 'productMetiCode',
      align: 'left',
      sticky: true
    }
  ]

  const oneTimeColumns = [
    {
      title: 'Medie vanzari',
      field: 'average',
      align: 'left',
      minWidth: "140px"
    },
    {
      title: 'Cantitati propuse',
      field: 'quantityToProduce',
      align: 'left',
      minWidth: '140px'
    },
    {
      title: 'Cantitati modificate',
      field: 'calculation',
      align: 'left',
      minWidth: '140px'
    },
  ]

  // const listColumns = (row) => { 
  //   return row.list.map((el, index) => 
  //     [
  //       {
  //         title: `${el.start.slice(0, -3)}-${el.end.slice(0, -3)} Medie vanzari`,
  //         field: `list[${index}].average`,
  //         align: 'left',
  //         minWidth: "140px"
  //       },
  //       {
  //         title: `${el.start.slice(0, -3)}-${el.end.slice(0, -3)} Cantitati propuse`,
  //         field: `list[${index}].quantityToProduce`,
  //         align: 'left',
  //         minWidth: "140px"
  //       },
  //       {
  //         title: `${el.start.slice(0, -3)}-${el.end.slice(0, -3)} Cantitati modificate`,
  //         field: `list[${index}].calculation`,
  //         align: 'left',
  //         minWidth: "140px"
  //       },
  //       {
  //         title: `${el.start.slice(0, -3)}-${el.end.slice(0, -3)} Vanzari reale`,
  //         field: `list[${index}].realSales`,
  //         align: 'left',
  //         minWidth: "140px"
  //       },
  //       {
  //         title: `${el.start.slice(0, -3)}-${el.end.slice(0, -3)}`,
  //         field: `list[${index}].clearanceSales`,
  //         align: 'left',
  //         minWidth: "140px"
  //       }
  //     ]
  //     )
  //   }
  // console.log(listColumns)
  
  const sixTenColumn = [
    {
      title: '06:00-10:00 Medie vanzari',
      field: 'list[0].average',
      align: 'left',
      minWidth: "140px",
      render: row => 
        <Box>
          {row.list[0].average}
        </Box>
    },
    {
      title: '06:00-10:00 Cantitati propuse',
      field: 'list[0].quantityToProduce',
      align: 'left',
      minWidth: "140px",
      render: row => 
        <Box>
          {row.list[0].quantityToProduce}
        </Box>
    },
    {
      title: '06:00-10:00 Cantitati modificate',
      field: 'list[0].calculation',
      align: 'left',
      minWidth: "140px",
      render: row => 
        <Box>
          {row.list[0].calculation}
        </Box>
    },
    {
      title: '06:00-10:00 Vanzari reale',
      field: 'list[0].realSales',
      align: 'left',
      minWidth: "140px",
      render: row => 
        <Box>
          {row.list[0].realSales}
        </Box>
    },
    {
      title: '06:00-10:00 Vanzari in destocaj',
      field: 'list[0].clearanceSales',
      align: 'left',
      minWidth: "140px",
      render: row => 
        <Box>
          {row.list[0].clearanceSales}
        </Box>
    }
  ]

  // const tenFourteenColumn = [
  //   {
  //     title: '10:00-14:00 Medie vanzari',
  //     field: 'list[1].average',
  //     align: 'left',
  //     minWidth: "140px"
  //   },
  //   {
  //     title: '10:00-14:00 Cantitati propuse',
  //     field: 'list[1].quantityToProduce',
  //     align: 'left',
  //     minWidth: "140px"
  //   },
  //   {
  //     title: '10:00-14:00 Cantitati modificate',
  //     field: 'list[1].calculation',
  //     align: 'left',
  //     minWidth: "140px"
  //   },
  //   {
  //     title: '10:00-14:00 Vanzari reale',
  //     field: 'list[1].realSales',
  //     align: 'left',
  //     minWidth: "140px"
  //   },
  //   {
  //     title: '10:00-14:00 Vanzari in destocaj',
  //     field: 'list[1].clearanceSales',
  //     align: 'left',
  //     minWidth: "140px"
  //   }
  // ]

  // const fourteenEighteenColumn = [
  //     {
  //       title: '14:00-18:00 Medie vanzari',
  //       field: 'list[2].average',
  //       align: 'left',
  //       minWidth: "140px"
  //     },
  //     {
  //       title: '14:00-18:00 Cantitati propuse',
  //       field: 'list[2].quantityToProduce',
  //       align: 'left',
  //       minWidth: "140px"
  //     },
  //     {
  //       title: '14:00-18:00 Cantitati modificate',
  //       field: 'list[2].calculation',
  //       align: 'left',
  //       minWidth: "140px"
  //     },
  //     {
  //       title: '14:00-18:00 Vanzari reale',
  //       field: 'list[2].realSales',
  //       align: 'left',
  //       minWidth: "140px"
  //     },
  //     {
  //       title: '14:00-18:00 Vanzari in destocaj',
  //       field: 'list[2].clearanceSales',
  //       align: 'left',
  //       minWidth: "140px"
  //     }
  // ]

  const finalColumns = [
    {
      title: 'Gama produs',
      field: 'clusterMandatory',
      align: 'left',
      minWidth: '140px',
      isGroup: true,
      render: row => (
        <BooleanText onSuccess='O' onFailure='F' value={row.clusterMandatory} />
      )
    },
    {
      title: 'Oferta in ziua respectiva',
      field: 'inPromotion',
      align: 'left',
      minWidth: '200px',
      render: row => (
        <BooleanIcon icon={'Flag'} value={row.inPromotion} onSuccess='#33691E' onFailure='#E5E5E5'/>
      )
    },
    {
      title: 'Produs nou',
      field: 'newProduct',
      align: 'left',
      render: row => (
        <BooleanIcon icon={'Flag'} value={row.newProduct} onSuccess='#33691E' onFailure='#E5E5E5'/>
      )
    },
    {
      title: 'Ultima pers care a modificat fisierul',
      field: 'username',
      align: 'left',
      minWidth: '200px'
    }
  ]

  return [
    ...stickyColumns, 
    ...oneTimeColumns, 
    ...sixTenColumn,
    // ...listColumns(), 
    ...finalColumns]
}
// export const columns = [
//     {
//       title: 'Produs',
//       field: 'productName',
//       align: 'left',
//       sticky: true,
//       render: row => (
//         <ImageCell imageUrl={row.productImageUrl} value={row.productName} />
//       )
//     },
//     {
//       title: 'Cod METI',
//       field: 'productMetiCode',
//       align: 'left',
//       sticky: true
//     },
//     {
//       title: 'Medie vanzari',
//       field: 'average',
//       align: 'left',
//       minWidth: "140px"
//     },
//     {
//       title: 'Cantitati propuse',
//       field: 'quantityToProduce',
//       align: 'left',
//       minWidth: '140px'
//     },
//     {
//       title: 'Cantitati modificate',
//       field: 'calculation',
//       align: 'left',
//       minWidth: '140px'
//     },
//     {
//       title: 'Vanzari realse',
//       field: 'realSales',
//       align: 'left',
//       minWidth: '140px',
//       isGroup: true
//     },
//     {
//       title: 'Vanzari in destocaj',
//       field: 'clearanceSales',
//       align: 'left',
//       minWidth: '140px',
//       isGroup: true
//     },
//     {
//       title: 'Gama produs',
//       field: 'clusterMandatory',
//       align: 'left',
//       minWidth: '140px',
//       isGroup: true,
//       render: row => (
//         <BooleanText onSuccess='O' onFailure='F' value={row.clusterMandatory} />
//       )
//     },
//     {
//       title: 'Oferta in ziua respectiva',
//       field: 'inPromotion',
//       align: 'left',
//       minWidth: '200px',
//       render: row => (
//         <BooleanIcon icon={'Flag'} value={row.inPromotion} onSuccess='#33691E' onFailure='#E5E5E5'/>
//       )
//     },
//     {
//       title: 'Produs nou',
//       field: 'newProduct',
//       align: 'left',
//       render: row => (
//         <BooleanIcon icon={'Flag'} value={row.newProduct} onSuccess='#33691E' onFailure='#E5E5E5'/>
//       )
//     },
//     {
//       title: 'Ultima pers care a modificat fisierul',
//       field: 'username',
//       align: 'left',
//       minWidth: '200px'
//     }
// ]


