import dayjs, {OpUnitType} from 'dayjs'
import {DateTimeFormatOptions} from "luxon";

export enum DateRange {
  Day = 1, Week, Month, Year
}

export class DateSelection {
  range: DateRange
  reference: Date

  constructor(range: DateRange, reference: Date) {
    this.range = range
    this.reference = reference
  }

  previous(): DateSelection {
    switch (this.range) {
      case DateRange.Day:
        return DateSelection.previousDay(this)
      case DateRange.Week:
        return DateSelection.previousWeek(this)
      case DateRange.Month:
        return DateSelection.previousMonth(this)
      case DateRange.Year:
        return DateSelection.previousYear(this)
    }
  }

  next(): DateSelection {
    switch (this.range) {
      case DateRange.Day:
        return DateSelection.nextDay(this)
      case DateRange.Week:
        return DateSelection.nextWeek(this)
      case DateRange.Month:
        return DateSelection.nextMonth(this)
      case DateRange.Year:
        return DateSelection.nextYear(this)
    }
  }

  mutate(range: DateRange): DateSelection {
    return new DateSelection(range, this.reference)
  }

  match(date: Date): boolean {
    switch (this.range) {
      case DateRange.Day:
        return DateSelection.matchDay(this.reference, date)
      case DateRange.Week:
        return DateSelection.matchWeek(this.reference, date)
      case DateRange.Month:
        return DateSelection.matchMonth(this.reference, date)
      case DateRange.Year:
        return DateSelection.matchYear(this.reference, date)
    }
  }

  grouper(): (date: Date) => number {
    switch (this.range) {
      case DateRange.Day:
        return (date: Date) => date.getTime()
      case DateRange.Week:
      case DateRange.Month:
        return (date: Date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      case DateRange.Year:
        return (date: Date) => Date.UTC(date.getFullYear(), date.getMonth())
    }
  }

  toString(): string {
    switch (this.range) {
      case DateRange.Day:
        return DateSelection.day(this.reference)
      case DateRange.Week:
        return DateSelection.week(this.reference)
      case DateRange.Month:
        return DateSelection.month(this.reference)
      case DateRange.Year:
        return DateSelection.year(this.reference)
    }
  }

  private static previousDay(date: DateSelection): DateSelection {
    const newDate = new Date(date.reference)
    newDate.setDate(date.reference.getDate() - 1)
    return new DateSelection(date.range, newDate)
  }

  private static previousWeek(date: DateSelection): DateSelection {
    const newDate = new Date(date.reference)
    newDate.setDate(date.reference.getDate() - 7)
    return new DateSelection(date.range, newDate)
  }

  private static previousMonth(date: DateSelection): DateSelection {
    const newDate = new Date(date.reference)
    newDate.setMonth(date.reference.getMonth() - 1)
    return new DateSelection(date.range, newDate)
  }

  private static previousYear(date: DateSelection): DateSelection {
    const newDate = new Date(date.reference)
    newDate.setFullYear(date.reference.getFullYear() - 1)
    return new DateSelection(date.range, newDate)
  }

  private static nextDay(date: DateSelection): DateSelection {
    const newDate = new Date(date.reference)
    newDate.setDate(date.reference.getDate() + 1)
    return new DateSelection(date.range, newDate)
  }

  private static nextWeek(date: DateSelection): DateSelection {
    const newDate = new Date(date.reference)
    newDate.setDate(date.reference.getDate() + 7)
    return new DateSelection(date.range, newDate)
  }

  private static nextMonth(date: DateSelection): DateSelection {
    const newDate = new Date(date.reference)
    newDate.setMonth(date.reference.getMonth() + 1)
    return new DateSelection(date.range, newDate)
  }

  private static nextYear(date: DateSelection): DateSelection {
    const newDate = new Date(date.reference)
    newDate.setFullYear(date.reference.getFullYear() + 1)
    return new DateSelection(date.range, newDate)
  }

  private static matchDay(reference: Date, value: Date): boolean {
    return DateSelection.match(reference, value, 'day')
  }

  private static matchWeek(reference: Date, value: Date): boolean {
    // FIXME match week in european way instead of english way from sunday to saturday
    return DateSelection.match(reference, value, 'week')
  }

  private static matchMonth(reference: Date, value: Date): boolean {
    return DateSelection.match(reference, value, 'month')
  }

  private static matchYear(reference: Date, value: Date): boolean {
    return DateSelection.match(reference, value, 'year')
  }

  private static match(reference: Date, value: Date, unit?: OpUnitType): boolean {
    const referenceDay = dayjs(reference)
    const aday = dayjs(value)
    return referenceDay.isSame(aday, unit)
  }

  private static day(date: Date): string {
    const options: DateTimeFormatOptions = {
      day: '2-digit',
      weekday: 'short',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleString('en-US', options)
  }

  private static week(date: Date): string {
    const options: DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };

    var curr = new Date(date)
    var first = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1))

    var last = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7))
    return first.toLocaleString('en-US', options) + ' -> ' + last.toLocaleString('en-US', options)
  }

  private static month(date: Date): string {
    return date.toLocaleString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

  private static year(date: Date): string {
    return date.toLocaleString('en-US', {
      year: 'numeric',
    })
  }
}