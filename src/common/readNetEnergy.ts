// @ts-ignore
import {parse} from "papaparse"

export type NetEnergy = {
  date: Date
  production: number
  consumption: number
  exported: number
  imported: number
};

export function readNetEnergy(content: string): NetEnergy[] {
  const data = parse(content)
  const rows = data.data;
  rows.shift()

  return rows.filter((element: string[]) => {
    return element.length === 5
  }).map(toNetEnergy)
}

function toNetEnergy(row: string[]): NetEnergy {
  const energy: NetEnergy = {
    date: new Date(row[0]),
    production: parseInt(row[1]),
    consumption: parseInt(row[2]),
    exported: parseInt(row[3]),
    imported: parseInt(row[4])
  }
  return energy
}