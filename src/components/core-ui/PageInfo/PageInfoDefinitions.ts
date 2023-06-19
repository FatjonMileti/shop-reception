import { Action } from 'components/utils/definitions/Definitions'
import { FormInfoItems } from '../ModalWithForm/ModalForm/ModalInfo/ModalInfoDefinitions'

export interface PageInfoProps {
  action: Action
  formInfoItems: FormInfoItems[]
  title: FormInfoItems
}
