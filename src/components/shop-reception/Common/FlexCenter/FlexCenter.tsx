import React from 'react'
import { Box } from '@mui/material'

interface FlexCenterProps {
  children?: Array<React.ReactNode>
}

const FlexCenter: React.FC<FlexCenterProps> = ({ children }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {children}
    </Box>
  )
}

export default FlexCenter