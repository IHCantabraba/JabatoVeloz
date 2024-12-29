import React, { useState } from 'react'
import {
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Box,
  Stepper
} from '@mui/material'
import AddDate from './AddDate/AddDate'
import AddDetails from './AddDetails/AddDetails'

const AddPedido = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [step, setSteps] = useState([
    { label: 'Date', completed: false },
    { label: 'Details', completed: false }
    // { label: 'Image', completed: true }
  ])

  /*  */
  const handleNext = () => {
    /* si el paso activo no es el último */
    if (activeStep < step.length - 1) {
      /* setear el indice al paso anterior mas 1 */
      setActiveStep((activeStep) => activeStep + 1)
    } else {
      /* si es el último, buscar pasos sin finalizar */
      const setIndex = findUnfinished()
      /* setear el indice */
      setActiveStep(setIndex)
    }
  }
  /* comprobar si hay que deshabilitar boton */
  const checkDisabled = () => {
    /* comprobar si el paso activo no es el ultimo */
    /* si no es el último, se para la ejecucion */
    if (activeStep < step.length - 1) return false
    /* buscar algun paso sin completar */
    const index = findUnfinished()
    /* si todos los pasos estan completados */
    if (index !== -1) return false
    /* todo terminado */
    return true
  }
  /* buscar algun paso sin completar */
  const findUnfinished = () => {
    return step.findIndex((step) => !step.completed)
  }
  return (
    <Container>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{ mb: 3 }}
      >
        {step.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepButton onClick={() => setActiveStep(index)} />
            {step.label}
          </Step>
        ))}
      </Stepper>
      <Box>{{ 0: <AddDate />, 1: <AddDetails /> }[activeStep]}</Box>
      <Stack
        direction='row'
        sx={{ pt: 2, pb: 7, justifyContent: 'space-around' }}
      >
        <Button
          color='inherit'
          disabled={!activeStep}
          onClick={() => setActiveStep((activeStep) => activeStep - 1)}
        >
          Back
        </Button>
        <Button disabled={checkDisabled()} onClick={handleNext}>
          Next
        </Button>
      </Stack>
    </Container>
  )
}

export default AddPedido
