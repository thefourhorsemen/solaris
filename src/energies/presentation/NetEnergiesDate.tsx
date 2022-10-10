import React from "react";
import {IoChevronBackOutline, IoChevronForwardOutline} from "react-icons/all";
import "./presentation.css"
import {DateRange, DateSelection} from "../common/DateSelection";
import {MDBBtn, MDBBtnGroup, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";

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
      <MDBContainer>
        <MDBCol>
          <MDBBtn color='light' onClick={previous}><IoChevronBackOutline/></MDBBtn>
          <MDBBtnGroup>
            {DATE_SELECTIONS.map((buttonLabel, i) => (
                <MDBBtn color='info'
                        key={i}
                        name={buttonLabel}
                        onClick={() => onDateButtonChanges(i)}>
                  {buttonLabel}
                </MDBBtn>
            ))}
          </MDBBtnGroup>
          <MDBBtn color='light' onClick={next}><IoChevronForwardOutline/></MDBBtn>
        </MDBCol>
        <MDBRow>
          <label> {date.toString()} </label>
        </MDBRow>
      </MDBContainer>
  )
}

export default NetEnergiesDate
