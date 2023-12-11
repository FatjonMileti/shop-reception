import { Box, Typography, Stepper, Step, StepLabel, Stack } from '@mui/material'
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress'
import { useMediaQuery } from '@mui/material'
import { shoppingCartSteps } from './helpers'

export interface ShoppingCartStepperProps {
  activeStep: number
}

const ShoppingCartStepper = (props: ShoppingCartStepperProps) => {
  const { activeStep } = props
  const isXS = useMediaQuery('(max-width:624px)')

  return (
    <>
      {isXS ? (
        <Stack direction={'row'} spacing={4} sx={{ ml: 3 }} style={{}}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <Box sx={{ position: 'relative' }}>
              <CircularProgress
                {...props}
                variant="determinate"
                sx={{
                  color: theme => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
                }}
                size={60}
                thickness={5}
                value={100}
              />
              <CircularProgress
                {...props}
                variant="determinate"
                value={Math.round(((activeStep + 1) * 100) / shoppingCartSteps.length)}
                disableShrink
                sx={{
                  color: theme => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                  animationDuration: '550ms',
                  position: 'absolute',
                  left: 0,
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round'
                  }
                }}
                size={60}
                thickness={4}
              />
            </Box>
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{ fontSize: '20px' }}
              >
                {activeStep + 1}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography style={{ fontWeight: 'bold' }}>
              {shoppingCartSteps[activeStep] ? shoppingCartSteps[activeStep].title : ''}
            </Typography>
            <Typography style={{ color: '#727272', fontSize: '14px' }}>
              {shoppingCartSteps[activeStep] ? shoppingCartSteps[activeStep].description : ''}
            </Typography>
          </Box>
        </Stack>
      ) : (
        <Stepper sx={{ mt: 3, mb: 3 }} activeStep={activeStep} alternativeLabel>
          {shoppingCartSteps.map(step => (
            <Step key={step.title || ''}>
              <StepLabel>{step.title || ''}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </>
  )
}

export default ShoppingCartStepper
