import {readNetEnergy} from "./readNetEnergy";
import path from "path";
import fs from "fs";
import {DateTime} from "luxon";
import {NetEnergy} from "../models/NetEnergy";

test('parse date with a peculiar format', () => {
  const expected = new Date("2022-08-14T16:15:00.000Z")
  const actual = DateTime.fromFormat('2022-08-14 18:15:00 +0200', 'yyyy-MM-dd hh:mm:ss ZZZ').toJSDate()
  expect(actual).toEqual(expected)
})

test('read a csv containg net energy entries', () => {
  const expecteds: NetEnergy[] = [
    new NetEnergy(new Date("2022-08-14T16:15:00.000Z"), 266, 645, 0, 379),
    new NetEnergy(new Date("2022-08-14T16:30:00.000Z"), 180, 632, 0, 452)]

  const file = path.resolve(__dirname, 'sample-net-energy.csv')
  const fileContent = fs.readFileSync(file, {encoding: 'utf-8'})

  const actuals = readNetEnergy(fileContent)
  expect(actuals).toEqual(expecteds)
})

