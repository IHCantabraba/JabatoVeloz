import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useState } from 'react'
export default function CustomDate({ propRef, labelProp }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        inputRef={propRef}
        label={labelProp}
        defaultValue={dayjs()}
        onChange={(date) => handleDateChange(date)}
      />
    </LocalizationProvider>
  )
}
