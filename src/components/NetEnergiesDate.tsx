import React from "react";
import {
  IoBarChartOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoGridOutline
} from "react-icons/io5";
import {Button, ButtonGroup, ButtonToolbar, Col, Row} from "react-bootstrap";
import "./NetEnergiesDate.css";
import {ChartType} from "../models/ChartType";
import {DateRange, DateSelection} from "../models/DateSelection";

const DATE_SELECTIONS = Object.keys(DateRange).filter((v) => isNaN(Number(v)))
const DATE_RANGES = [DateRange.Day, DateRange.Week, DateRange.Month, DateRange.Year, DateRange.All]
const CHART_TYPES = [ChartType.MEASURE, ChartType.AVERAGE]

interface NetEnergiesDateProps {
  date: DateSelection,
  setDate: (date: DateSelection) => void,
  setChartType: (type: ChartType) => void
}

const NetEnergiesDate = ({date, setDate, setChartType}: NetEnergiesDateProps) => {
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
    setChartType(CHART_TYPES[val])
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
        <label className="net-energies-date__label"> {date.toString()} </label>
        <Button variant="outline-dark" onClick={next}><IoChevronForwardOutline/></Button>
      </Col>
    </Row>
  </>
}

export default NetEnergiesDate
