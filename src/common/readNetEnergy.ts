import path from "path"
import * as fs from "fs"
// @ts-ignore
import {parse} from "papaparse"

export type NetEnergy = {
  date: Date
  production: number
  consumption: number
  exported: number
  imported: number
};

function toNetEnergy(row: string[]) {
  const energy: NetEnergy = {
    date: new Date(row[0]),
    production: parseInt(row[1]),
    consumption: parseInt(row[2]),
    exported: parseInt(row[3]),
    imported: parseInt(row[4])
  }
  return energy
}

export function readNetEnergy(fileName: string) {
  const file = path.resolve(__dirname, fileName)
  const fileContent = fs.readFileSync(file, {encoding: 'utf-8'})
  const data = parse(fileContent)
  const rows = data.data;
  rows.shift();
  
  return rows.filter((element: string[]) => {
    return element.length === 5
  }).map(toNetEnergy)
}
