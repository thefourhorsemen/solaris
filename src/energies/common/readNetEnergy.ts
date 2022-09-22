// @ts-ignore
import {parse} from "papaparse"
import {NetEnergy} from "./NetEnergy";

export const readNetEnergy = (content: string): NetEnergy[] => {
  const data = parse(content)
  const rows = data.data
  rows.shift()

  return rows.filter((element: string[]) => {
    return element.length === 5
  }).map((element: string[]) => NetEnergy.of(element))
}