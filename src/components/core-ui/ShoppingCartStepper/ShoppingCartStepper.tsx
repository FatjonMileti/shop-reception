import { Box, Typography, Stepper, Step, StepLabel, Stack } from '@mui/material'
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { useMediaQuery } from '@mui/material'

export interface ShoppingCartStepperProps {
  activeStep: number
}

const ShoppingCartStepper = (props: ShoppingCartStepperProps) => {
  const { activeStep } = props
  const isXs = useMediaQuery('(max-width:624px)')

  const steps = [
    { title:'Validare produse', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { title:'Selecteaza client', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { title:'Detalii plata si livrare', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { title:'Plasare comanda', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { title:'Verificare bon', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { title:'Finalizare factura', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }
  ];

  if(!isXs) {
    return <Stepper sx={{mt:3,mb:3}} activeStep={activeStep} alternativeLabel>
              {steps.map((step) => (
                <Step key={step.title || ''}>
                  <StepLabel>{step.title || ''}</StepLabel>
                </Step>
              ))}
            </Stepper>
  } else {

    return  <Stack direction={'row'} spacing={4} sx={{ml:3}} style={{  }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <Box sx={{ position: 'relative' }}>
                    <CircularProgress
                      variant="determinate"
                      sx={{
                        color: (theme) =>
                          theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                      }}
                      size={60}
                      thickness={5}
                      {...props}
                      value={100}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={Math.round((activeStep+1)*100/steps.length)}
                      disableShrink
                      sx={{
                        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                          strokeLinecap: 'round',
                        },
                      }}
                      size={60}
                      thickness={4}
                      {...props}
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
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                      sx={{ fontSize:'20px' }}
                    >{activeStep+1}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography style={{ fontWeight:'bold' }}>{steps[activeStep] ? steps[activeStep].title : ''}</Typography>
                  <Typography style={{ color: '#727272', fontSize:'14px' }}>{steps[activeStep] ? steps[activeStep].description : ''}</Typography>
                </Box>
            </Stack>

  }
  
}

export default ShoppingCartStepper
