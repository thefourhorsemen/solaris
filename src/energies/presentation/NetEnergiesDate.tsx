import React from "react";
import {IoChevronBackOutline, IoChevronForwardOutline} from "react-icons/all";
import "./presentation.css"
import {DateRange, DateSelection} from "../common/DateSelection";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";

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
      <Container>
        <Col>
          <Button variant="outline-dark" onClick={previous}><IoChevronBackOutline/></Button>
          <ButtonGroup>
            {DATE_SELECTIONS.map((buttonLabel, i) => (
                <Button color='info'
                        key={i}
                        name={buttonLabel}
                        onClick={() => onDateButtonChanges(i)}>
                  {buttonLabel}
                </Button>
            ))}
          </ButtonGroup>
          <Button variant="outline-dark" onClick={next}><IoChevronForwardOutline/></Button>
        </Col>
        <Row>
          <label> {date.toString()} </label>
        </Row>
      </Container>
  )
}

export default NetEnergiesDate
