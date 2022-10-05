import React from "react";
import ButtonGroup from "../../component/ButtonGroup";
import {IoChevronBackOutline, IoChevronForwardOutline} from "react-icons/all";
import "./presentation.css"
import {DateRange, DateSelection} from "../common/DateSelection";

const DATE_SELECTIONS = Object.keys(DateRange).filter((v) => isNaN(Number(v)))
const DATE_RANGES = [DateRange.Day, DateRange.Week, DateRange.Month, DateRange.Year]

interface NetEnergiesDateProps {
  date: DateSelection,
  setDate: (date: DateSelection) => void
}

const NetEnergiesDate = ({date, setDate}: NetEnergiesDateProps) => {
  const previous = () => {
    setDate(date.previous())
  }

  const next = () => {
    setDate(date.next())
  }

  const onDateButtonChanges = (id: number) => {
    setDate(date.mutate(DATE_RANGES[id]))
  }

  return (
      <>
        <ButtonGroup buttons={DATE_SELECTIONS} selectButton={onDateButtonChanges}/>
        <div>
          <button onClick={previous}><IoChevronBackOutline size="20px"/></button>
          <label> {date.toString()} </label>
          <button onClick={next}><IoChevronForwardOutline size="20px"/></button>
        </div>
      </>
  )
}

export default NetEnergiesDate
