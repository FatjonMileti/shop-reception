import * as Yup from 'yup'

export const getValidationSchema = (editItem: TransportResponsible) =>
  Yup.object().shape({
    id: Yup.number().required(),
    firstName: Yup.string().required("Câmpul Prenume este obligatoriu "),
    name: Yup.string().required("Câmpul de nume este obligatoriu"),
    emails: Yup.string().required("Câmpul pentru e-mailuri este obligatoriu"),
  })

export const getInitialValues = (editItem: TransportResponsible) => {
  return {
    id: editItem?.id || null,
    firstName: editItem?.firstName || null,
    name: editItem?.name || null,
    emails: editItem?.emails || null,
  }
}
