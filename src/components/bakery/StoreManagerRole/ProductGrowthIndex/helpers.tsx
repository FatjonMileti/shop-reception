import { Box } from '@mui/material'
import { ImageCell } from 'components/core-ui/ImageCell'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import * as Yup from 'yup'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    render: (row: any) => (
      <Box>
        <ImageCell value={row.productName} imageUrl={row.imageUrl} />
      </Box>
    ),
    width: '170px',
  },
  {
    title: 'Cod METI',
    field: 'metiCode',
    align: 'left',
    width: '150px',
  },

  {
    title: 'Familie',
    field: 'familyName',
    align: 'left',
    width: '150px'
  },
  {
    title: 'Cod familie',
    field: 'familyCode',
    align: 'left',
    width: '140px'
  },
  {
    title: 'Coeficient general',
    field: 'generalGrowth',
    align: 'left',
    width: '140px'
  },
  {
    title: 'Ultima actualizare',
    field: 'username',
    align: 'left',
    width: '140px'
  },
  {
    title: 'Ultima modificare',
    field: 'lastChange',
    align: 'left',
    width: '140px'
  },
  {
    title: 'Coeficient',
    field: 'growth',
    align: 'left',
    disableSorting: true,
    minWidth: '140px',
    isGroup: true,
  },
]

export const drawerFilters = (familiesQuery) => [
  {
    name: 'family',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Familie"
        options={familiesQuery.data || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Familie'
  }
]

export const getInitialValues = editItem => ({
  id: editItem?.id ?? '',
  productName: editItem?.productName ?? '',
  imageUrl: editItem?.imageUrl ?? '',
  metiCode: editItem?.metiCode ?? 0,
  familyCode: editItem?.familyCode ?? 0,
  generalGrowth: editItem?.generalGrowth ?? 0,
  username: editItem?.username ?? '',
  lastChange: editItem?.lastChange ?? '',
  map: editItem?.map ?? {
    interval1: {
      timeSlotId: editItem?.map?.interval1?.timeSlotId ?? '',
      start: editItem?.map?.interval1?.start ?? '',
      end: editItem?.map?.interval1?.end ?? '',
      name: editItem?.map?.interval1?.name ?? '',
      growth: editItem?.map?.interval1?.growth ?? 0
    },
    interval2: {
      timeSlotId: editItem?.map?.interval2?.timeSlotId ?? '',
      start: editItem?.map?.interval2?.start ?? '',
      end: editItem?.map?.interval2?.end ?? '',
      name: editItem?.map?.interval2?.name ?? '',
      growth: editItem?.map?.interval2?.growth ?? 0
    },
    interval3: {
      timeSlotId: editItem?.map?.interval3?.timeSlotId ?? '',
      start: editItem?.map?.interval3?.start ?? '',
      end: editItem?.map?.interval3?.end ?? '',
      name: editItem?.map?.interval3?.name ?? '',
      growth: editItem?.map?.interval3?.growth ?? 0
    },
    interval4: {
      timeSlotId: editItem?.map?.interval4?.timeSlotId ?? '',
      start: editItem?.map?.interval4?.start ?? '',
      end: editItem?.map?.interval4?.end ?? '',
      name: editItem?.map?.interval4?.name ?? '',
      growth: editItem?.map?.interval4?.growth ?? 0
    },
    interval5: {
      timeSlotId: editItem?.map?.interval5?.timeSlotId ?? '',
      start: editItem?.map?.interval5?.start ?? '',
      end: editItem?.map?.interval5?.end ?? '',
      name: editItem?.map?.interval5?.name ?? '',
      growth: editItem?.map?.interval5?.growth ?? 0
    }
  }
})

export const getValidationSchema = () => Yup.object().shape({
  generalGrowth: Yup.number().required('Growth must be a number').transform(
    (originalValue) =>
      isNaN(originalValue) ? undefined : Number(originalValue)
  ),
  map: Yup.object().shape({
    interval1: Yup.object().shape({
      growth: Yup.number().required('Interval must be a number').transform(
        (originalValue) =>
          isNaN(originalValue) ? undefined : Number(originalValue)
      ),
    }),
    interval2: Yup.object().shape({
      growth: Yup.number().required('Interval must be a number').transform(
        (originalValue) =>
          isNaN(originalValue) ? undefined : Number(originalValue)
      ),
    }),
    interval3: Yup.object().shape({
      growth: Yup.number().required('Interval must be a number').transform(
        (originalValue) =>
          isNaN(originalValue) ? undefined : Number(originalValue)
      ),
    }),
    interval4: Yup.object().shape({
      growth: Yup.number().required('Interval must be a number').transform(
        (originalValue) =>
          isNaN(originalValue) ? undefined : Number(originalValue)
      ),
    }),
    interval5: Yup.object().shape({
      growth: Yup.number().required('Interval must be a number').transform(
        (originalValue) =>
          isNaN(originalValue) ? undefined : Number(originalValue)
      ),
    }),
  })
});
