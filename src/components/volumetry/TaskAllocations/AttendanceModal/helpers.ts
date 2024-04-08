import * as Yup from 'yup'
import dayjs from 'dayjs'

const employeesSchema = Yup.object().shape({
  workerId: Yup.number().required(),
  isPresent: Yup.boolean(),
  shiftStart: Yup.date().when('isPresent', ([isPresent], schema) =>
    isPresent ? schema.required('Acest camp este obligatoriu') : schema.nullable()
  ),
  shiftEnd: Yup.date().when(['isPresent', 'shiftStart'], ([isPresent, shiftStart], schema) =>
    isPresent
      ? schema
          .required('Acest camp este obligatoriu')
          .test(
            'notAfterShiftStart',
            'Ora sfarsit de tura trebuie sa fie dupa cea de inceput de tura',
            shiftEnd => {
              return dayjs(shiftEnd).isAfter(shiftStart)
            }
          )
      : schema.nullable()
  )
})

export const validationSchema = Yup.object().shape({
  employees: Yup.array().of(employeesSchema)
})