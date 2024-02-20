import * as Yup from 'yup'

export const getValidationSchema = (editItem: SeriesNumber) =>
  Yup.object().shape({
    id: Yup.number().required(),
    series: Yup.string().required("Seria este un câmp obligatoriu"),
    startInterval: Yup.number().required("Inceput de interval este un câmp obligatoriu"),
    currentNumber: Yup.number().required("Numar Curent este un câmp obligatoriu"),
    year: Yup.number().required("An este un câmp obligatoriu"),
    society: Yup.string().required("Societatea este un câmp obligatoriu"),
  })

export const getInitialValues = (editItem: SeriesNumber) => {
  console.log(editItem);
  
  return {
    id: editItem?.id || null,
    series: editItem?.series || null,
    startInterval: editItem?.startInterval || 0,
    currentNumber: editItem?.currentNumber || 0,
    year: editItem?.year || 0,
    society: editItem?.society || null,
  }
}
