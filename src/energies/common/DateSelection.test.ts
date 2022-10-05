import {DateRange, DateSelection} from "./DateSelection";

test('day string', () => {
  const selection = new DateSelection(DateRange.Day, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.toString()).toEqual("Wed, Aug 10, 2022")
})

test('week string', () => {
  const selection = new DateSelection(DateRange.Week, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.toString()).toEqual("Aug 08, 2022 -> Aug 14, 2022")
})

test('month string', () => {
  const selection = new DateSelection(DateRange.Month, new Date("2022-08-14T16:15:00.000Z"))

  expect(selection.toString()).toEqual("August 2022")
})

test('year string', () => {
  const selection = new DateSelection(DateRange.Year, new Date("2022-08-14T16:15:00.000Z"))

  expect(selection.toString()).toEqual("2022")
})

test('next day', () => {
  const selection = new DateSelection(DateRange.Day, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.next()).toEqual(new DateSelection(DateRange.Day, new Date("2022-08-11T16:15:00.000Z")))
})

test('previous day', () => {
  const selection = new DateSelection(DateRange.Day, new Date("2022-08-01T16:15:00.000Z"))

  expect(selection.previous()).toEqual(new DateSelection(DateRange.Day, new Date("2022-07-31T16:15:00.000Z")))
})

test('next week', () => {
  const selection = new DateSelection(DateRange.Week, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.next()).toEqual(new DateSelection(DateRange.Week, new Date("2022-08-17T16:15:00.000Z")))
})

test('previous week', () => {
  const selection = new DateSelection(DateRange.Week, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.previous()).toEqual(new DateSelection(DateRange.Week, new Date("2022-08-03T16:15:00.000Z")))
})

test('next month', () => {
  const selection = new DateSelection(DateRange.Month, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.next()).toEqual(new DateSelection(DateRange.Month, new Date("2022-09-10T16:15:00.000Z")))
})

test('previous month', () => {
  const selection = new DateSelection(DateRange.Month, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.previous()).toEqual(new DateSelection(DateRange.Month, new Date("2022-07-10T16:15:00.000Z")))
})

test('next year', () => {
  const selection = new DateSelection(DateRange.Year, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.next()).toEqual(new DateSelection(DateRange.Year, new Date("2023-08-10T16:15:00.000Z")))
})

test('previous year', () => {
  const selection = new DateSelection(DateRange.Year, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.previous()).toEqual(new DateSelection(DateRange.Year, new Date("2021-08-10T16:15:00.000Z")))
})

test('match day', () => {
  const selection = new DateSelection(DateRange.Day, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.match(new Date("2022-08-10T20:15:00.000Z"))).toEqual(true)
})

test('do not match day', () => {
  const selection = new DateSelection(DateRange.Day, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.match(new Date("2022-08-11T20:15:00.000Z"))).toEqual(false)
})

test('match week', () => {
  const selection = new DateSelection(DateRange.Week, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.match(new Date("2022-08-08T20:15:00.000Z"))).toEqual(true)
})

test('do not match week', () => {
  const selection = new DateSelection(DateRange.Week, new Date("2022-08-10T16:15:00.000Z"))

  expect(selection.match(new Date("2022-08-01T20:15:00.000Z"))).toEqual(false)
})

test('match month', () => {
  const selection = new DateSelection(DateRange.Month, new Date("2022-08-14T16:15:00.000Z"))

  expect(selection.match(new Date("2022-08-30T20:15:00.000Z"))).toEqual(true)
})

test('do not match month', () => {
  const selection = new DateSelection(DateRange.Month, new Date("2022-08-14T16:15:00.000Z"))

  expect(selection.match(new Date("2022-07-30T20:15:00.000Z"))).toEqual(false)
})

test('match year', () => {
  const selection = new DateSelection(DateRange.Year, new Date("2022-08-14T16:15:00.000Z"))

  expect(selection.match(new Date("2022-01-10T20:15:00.000Z"))).toEqual(true)
})

test('do not match year', () => {
  const selection = new DateSelection(DateRange.Year, new Date("2022-08-14T16:15:00.000Z"))

  expect(selection.match(new Date("2023-01-10T20:15:00.000Z"))).toEqual(false)
})

test('from day to week', () => {
  const selection = new DateSelection(DateRange.Day, new Date("2022-08-14T16:15:00.000Z"))
  const expected = new DateSelection(DateRange.Week, new Date("2022-08-14T16:15:00.000Z"))

  expect(selection.mutate(DateRange.Week)).toEqual(expected)
})

test('day grouper', () => {
  const date = new Date("2022-08-14T16:15:00.000Z")
  const selection = new DateSelection(DateRange.Day, date)

  const grouper = selection.grouper();
  expect(new Date(grouper(date))).toEqual(date)
})

test('week grouper', () => {
  const date = new Date("2022-08-14T16:15:00.000Z")
  const selection = new DateSelection(DateRange.Week, date)

  const grouper = selection.grouper();
  expect(new Date(grouper(date))).toEqual(new Date("2022-08-14T00:00:00.000Z"))
})

test('month grouper', () => {
  const date = new Date("2022-08-14T16:15:00.000Z")
  const selection = new DateSelection(DateRange.Month, date)

  const grouper = selection.grouper();
  expect(new Date(grouper(date))).toEqual(new Date("2022-08-14T00:00:00.000Z"))
})

test('year grouper', () => {
  const date = new Date("2022-08-14T16:15:00.000Z")
  const selection = new DateSelection(DateRange.Year, date)

  const grouper = selection.grouper();
  expect(new Date(grouper(date))).toEqual(new Date("2022-08-01T00:00:00.000Z"))
})
