import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

import { useValue } from '../../../context/ContextProvider'
export default function PedidoDate() {
  const { dispatch } = useValue()

  const handleDateChange = (date) => {
    dispatch({ type: 'UPDATE_FECHA_PEDIDO', payload: date })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label='Fecha fin de solicitudes'
        defaultValue={dayjs()}
        onChange={(date) => handleDateChange(date)}
        minDate={dayjs()}
        maxDate={dayjs().add(1, 'year')}
      />
    </LocalizationProvider>
  )
}
