import React from "react";
import {
  IoBarChartOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoGridOutline
} from "react-icons/io5";
import "./presentation.css"
import {DateRange, DateSelection} from "../models/DateSelection";
import {Button, ButtonGroup, ButtonToolbar, Col, Row} from "react-bootstrap";

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

  const onDateButtonChanges = (val: number) => {
    setDate(date.mutate(DATE_RANGES[val]))
  }

  const onChartButtonChanges = (val: number) => {
  }

  return <>
    <ButtonToolbar className='justify-content-between'>
      <ButtonGroup>
        {DATE_SELECTIONS.map((buttonLabel, i) => (
            <Button color='info'
                    key={i}
                    onClick={() => onDateButtonChanges(i)}>
              {buttonLabel}
            </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup>
        <Button color='info'
                key={0}
                onClick={() => onChartButtonChanges(0)}><IoBarChartOutline/>
        </Button>
        <Button color='info'
                key={1}
                onClick={() => onChartButtonChanges(1)}><IoGridOutline/></Button>
      </ButtonGroup>
    </ButtonToolbar>
    <Row>
      <Col>
        <Button variant="outline-dark" onClick={previous}><IoChevronBackOutline/></Button>
        <label> {date.toString()} </label>
        <Button variant="outline-dark" onClick={next}><IoChevronForwardOutline/></Button>
      </Col>
    </Row>
  </>
}

export default NetEnergiesDate
