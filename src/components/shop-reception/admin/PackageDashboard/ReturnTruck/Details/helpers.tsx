export const getColumns = isForShop =>
  isForShop
    ? [
        {
          title: 'Magazin',
          field: 'shopName'
        },
        {
          title: 'Cod METI magazin',
          field: 'shopCode'
        },
        {
          title: 'Cod ambalaj incarcat',
          field: 'supportCode'
        },
        {
          title: 'Tip ambalaj incarcat',
          field: 'supportName'
        },
        {
          title: 'Cantitate incarcata',
          field: 'supportNumber'
        },
        {
          title: 'Numar aviz magazin',
          field: 'noticeNumber'
        },
        {
          title: 'Data expediţie magazin',
          field: 'expeditionDate'
        },
        {
          title: 'Aviz magazin conform',
          field: 'noticeConform'
        },
        {
          title: 'Numar nou aviz',
          field: 'conformNoticeNumber'
        },
        {
          title: 'Cantitate descarcata',
          field: 'confirmedSupportNumber'
        },
        {
          title: 'Data verificare',
          field: 'receptionDate'
        },
        {
          title: 'Operator verificare',
          field: 'receptionOperator'
        }
      ]
    : [
        {
          title: 'Magazin',
          field: 'shopName'
        },
        {
          title: 'Cod METI magazin',
          field: 'shopCode'
        },
        {
          title: 'Cod ambalaj incarcat',
          field: 'supportCode'
        },
        {
          title: 'Tip ambalaj incarcat',
          field: 'supportName'
        },
        {
          title: 'Cantitate incarcata',
          field: 'supportNumber'
        },
        {
          title: 'Numar aviz magazin',
          field: 'noticeNumber'
        },
        {
          title: 'Data expeditie magazin',
          field: 'expeditionDate'
        },
        {
          title: 'Numar aviz hub',
          field: 'hubNoticeNumber'
        },
        {
          title: 'Data expeditie hub',
          field: 'hubExpeditionDate'
        },
        {
          title: 'Aviz hub conform',
          field: 'hubNoticeConform'
        },
        {
          title: 'Numar nou aviz hub',
          field: ''
        },
        {
          title: 'Cantitate descarcata',
          field: 'confirmedSupportNumber'
        },
        {
          title: 'Data verificare',
          field: 'receptionDate'
        },
        {
          title: 'Operator verificare',
          field: 'receptionOperator'
        }
      ]
