// @ts-ignore
import {parse} from "papaparse"
import {DateNetEnergy} from "../models/NetEnergy";

export const readNetEnergy = (content: string | ArrayBuffer): DateNetEnergy[] => {
  const data = parse(content)
  const rows: string[][] = data.data
  rows.shift()

  return rows.filter(element => element.length === 5).map(element => DateNetEnergy.of(element))
}