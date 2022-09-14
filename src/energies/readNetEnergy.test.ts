import {readNetEnergy} from "./readNetEnergy";
import path from "path";
import fs from "fs";
import {NetEnergy} from "./NetEnergy";
import {DateTime} from "luxon";

test('parse date with a peculiar format', () => {
  const expected = new Date("2022-08-14T16:15:00.000Z")
  const actual = DateTime.fromFormat('2022-08-14 18:15:00 +0200', 'yyyy-MM-dd hh:mm:ss ZZZ').toJSDate()
  expect(actual).toEqual(expected)
})

test('read a csv containg net energy entries', () => {
  const expecteds: NetEnergy[] = [{
    consumption: 645,
    date: new Date("2022-08-14T16:15:00.000Z"),
    exported: 0,
    imported: 379,
    production: 266
  }, {
    consumption: 632,
    date: new Date("2022-08-14T16:30:00.000Z"),
    exported: 0,
    imported: 452,
    production: 180
  }]

  const file = path.resolve(__dirname, 'sample-net-energy.csv')
  const fileContent = fs.readFileSync(file, {encoding: 'utf-8'})

  const actuals = readNetEnergy(fileContent)
  expect(actuals).toEqual(expecteds)
})

