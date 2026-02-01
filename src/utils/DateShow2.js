import React from "react"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export default function DateShow2() {
  return (
    <Calendar
      calendar={persian}
      locale={persian_fa}
      style={{
        backgroundColor: "aliceblue",
        // height: "15px",
        borderRadius: "8px",
        fontSize: "14px",
        padding: "3px 10px"
      }}
    />
  )
}