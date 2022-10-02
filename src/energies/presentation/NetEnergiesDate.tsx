import React from "react";
import ButtonGroup from "../../component/ButtonGroup";
import {IoChevronBackOutline, IoChevronForwardOutline} from "react-icons/all";
import "./presentation.css"

const DATE_SELECTIONS = ["Day", "Week", "Month", "Year"];

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

  const onDateButtonChanges = (id: number) => {
    console.log(DATE_SELECTIONS[id])
  }

  return (
      <>
        <ButtonGroup buttons={DATE_SELECTIONS} selectButton={onDateButtonChanges}/>
        <div>
          <button onClick={previous}><IoChevronBackOutline size="20px"/></button>
          <label> {day(date)} </label>
          <button onClick={next}><IoChevronForwardOutline size="20px"/></button>
        </div>
      </>
  )
}

export default NetEnergiesDate
