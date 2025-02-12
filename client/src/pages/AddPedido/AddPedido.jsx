import React, { useEffect, useState } from 'react'
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
import { useValue } from '../../context/ContextProvider'
import { Send } from '@mui/icons-material'
import { createPedido } from '../../actions/pedidos'

const AddPedido = ({ setPage }) => {
  const {
    state: {
      pedidosManager: { details, FechaPedido },
      userManager: { currentUser }
    },
    dispatch
  } = useValue()
  const [activeStep, setActiveStep] = useState(0)
  const [steps, setSteps] = useState([
    { label: 'Date', completed: false },
    { label: 'Details', completed: false }
    // { label: 'Image', completed: true }
  ])
  const [showSubmit, setShowSubmit] = useState(false)
  /* funcion para controlar el botón next para pasar entre Steps del proceso */
  const handleNext = () => {
    /* si el paso activo no es el último */
    if (activeStep < steps.length - 1) {
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
    if (activeStep < steps.length - 1) return false
    /* buscar algun paso sin completar */
    const index = findUnfinished()
    /* si todos los pasos estan completados */
    if (index !== -1) return false
    /* terminado */
    return true
  }
  /* buscar algun paso sin completar */
  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed)
  }

  /* useEffect para controlar el estado completado del step */
  useEffect(() => {
    if (details.title.length > 4 && details.description.length > 9) {
      if (!steps[1].completed) setComplete(1, true)
    } else {
      if (steps[1].completed) setComplete(1, false)
    }
  }, [details])

  /* useEffect para controlar el estado completado del step */
  useEffect(() => {
    if (FechaPedido !== '') {
      if (!steps[0].completed) setComplete(0, true)
    } else {
      if (steps[0].completed) setComplete(0, false)
    }
  }, [FechaPedido])

  /* funcion para modificar el estado completado de un paso */
  const setComplete = (index, status) => {
    setSteps((steps) => {
      steps[index].completed = status
      return [...steps]
    })
  }
  useEffect(() => {
    if (findUnfinished() === -1) {
      if (!showSubmit) setShowSubmit(true)
    } else {
      if (showSubmit) setShowSubmit(false)
    }
  })
  const handleSubmit = () => {
    const pedido = {
      ExpireDate: `${FechaPedido.$D}/${FechaPedido.$M + 1}/${FechaPedido.$y}`,
      title: details.title,
      description: details.description,
      users: currentUser.user._id
    }
    createPedido(pedido, currentUser, dispatch, setPage)
  }
  return (
    <Container sx={{ minHeight: '93vh', fontFamily: 'Nunito', py: 5, pb: 40 }}>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{
          mb: 3,
          textAlign: 'center'
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepButton onClick={() => setActiveStep(index)} />
            {step.label}
          </Step>
        ))}
      </Stepper>
      <Box sx={{ pb: 7 }}>
        {{ 0: <AddDate />, 1: <AddDetails /> }[activeStep]}
        <Stack
          direction='row'
          sx={{ pt: 2, pb: 1, justifyContent: 'space-around' }}
        >
          <Button
            color='inherit'
            disabled={!activeStep}
            onClick={() => setActiveStep((activeStep) => activeStep - 1)}
            sx={{ mb: 0 }}
          >
            Back
          </Button>
          <Button disabled={checkDisabled()} onClick={handleNext}>
            Next
          </Button>
        </Stack>
      </Box>

      {showSubmit && (
        <Stack sx={{ alignItems: 'center' }}>
          <Button
            variant='contained'
            sx={{ backgroundColor: 'var(--ihc-jV-green)' }}
            endIcon={<Send />}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      )}
    </Container>
  )
}

export default AddPedido
