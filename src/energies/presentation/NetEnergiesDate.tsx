import React from "react";

interface NetEnergiesDateProps {
  date: Date,
  setDate: (date: Date) => void
}

const day = (date: Date): string => {
  return date && date.toDateString() || "no date"
}

const NetEnergiesDate = ({date, setDate}: NetEnergiesDateProps) => {
  const previous = () => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() - 1)
    setDate(newDate)
  }

  const next = () => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + 1)
    setDate(newDate)
  }

  return (
      <>
        <div>
          <button>Day</button>
          <button>Week</button>
          <button>Month</button>
          <button>Year</button>
        </div>
        <div>
          <button onClick={previous}>Previous</button>
          <label> {day(date)} </label>
          <button onClick={next}>Next</button>
        </div>
      </>
  )
}

export default NetEnergiesDate
