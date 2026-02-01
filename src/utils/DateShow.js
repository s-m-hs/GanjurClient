import React from 'react'
import { Calendar } from 'react-modern-calendar-datepicker'; 
import 'react-modern-calendar-datepicker/lib/DatePicker.css'; 
export default function DateShow() {
    const today = { 
        year: 1402, 
        month: 8, 
        day: 7, 
      }; 
  return (
    <Calendar 
      value={today} 
      shouldHighlightWeekends 
      calendarClassName="persian-calendar" 
      locale="fa" 
    />   )
}
