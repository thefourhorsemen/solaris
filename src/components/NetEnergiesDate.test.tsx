import React from "react";
import {render} from "@testing-library/react";
import NetEnergiesDate from "./NetEnergiesDate";
import {DateRange, DateSelection} from "../models/DateSelection";
import {ChartType} from "../models/ChartType";

test('display the specified date', () => {
  let date = new DateSelection(DateRange.Day, new Date("2011-10-10T14:48:00"))
  const setDate = (newDate: DateSelection) => {
    date = newDate
  }

  const setChartType = (chartType: ChartType) => {
    // nothing to do
  }

  const component = render(<NetEnergiesDate date={date} setDate={setDate}
                                            setChartType={setChartType}/>)
  expect(component.queryByText('Mon, Oct 10, 2011')).toBeInTheDocument()
})

test('set the next day after click on next', () => {
  // TODO to be fixed
  // let date = new DateSelection(DateRange.Day, new Date("2011-10-10T14:48:00"))
  // const setDate = (newDate: DateSelection) => {
  //   date = newDate
  // }
  // const component = render(<NetEnergiesDate date={date} setDate={setDate}/>)
  // userEvent.click(component.getByRole('button', {name: /Next/i}))
  // expect(date).toEqual(new Date("2011-10-11T14:48:00"))
})

test('set the previous day after click on previous', () => {
  // TODO to be fixed
  // let date = new DateSelection(DateRange.Day, new Date("2011-10-10T14:48:00"))
  // const setDate = (newDate: DateSelection) => {
  //   date = newDate
  // }
  // const component = render(<NetEnergiesDate date={date} setDate={setDate}/>)
  // userEvent.click(component.getByRole('button', {name: /Previous/i}))
  // expect(date).toEqual(new Date("2011-10-09T14:48:00"))
})