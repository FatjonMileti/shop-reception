import React from 'react'
import { Modal } from 'components/core-ui/Modal'
import { EditActionIcon } from '../../../../../icons'
import { Grid } from '@mui/material'
import { SelectProduct } from './SelectProduct'

interface AddReceivedProductProps {
  isModalOpen: boolean
  closeModal: () => void
}
export const AddReceivedProduct = ({ isModalOpen, closeModal }: AddReceivedProductProps) => {



  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={
        <span style={{ display: 'flex', columnGap: '16px', alignItems: 'center' }}>
          Adauga lot nou receptionat
          <EditActionIcon />
        </span>
      }
      modalWidth="50%"
    >
      <SelectProduct />

    </Modal>
  )
}
