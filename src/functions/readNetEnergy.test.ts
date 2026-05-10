import {readNetEnergy} from "./readNetEnergy";
import path from "path";
import fs from "fs";
import {DateTime} from "luxon";
import {DateNetEnergy, NetEnergy} from "../models/NetEnergy";

test('parse date with a peculiar format', () => {
    const expected = new Date("2022-08-14T16:15:00.000Z")
    const actual = DateTime.fromFormat('2022-08-14 18:15:00 +0200', 'yyyy-MM-dd hh:mm:ss ZZZ').toJSDate()
    expect(actual).toEqual(expected)
})

test('parse date with an other peculiar format', () => {
    const expected = new Date("2024-05-16T21:45:00.000Z")
    const actual = DateTime.fromFormat('05/16/2024 21:45', 'MM/dd/yyyy hh:mm', {zone: "utc"}).toJSDate()
    expect(actual).toEqual(expected)
})

test('read a csv containg net energy entries', () => {
    const expecteds: DateNetEnergy[] = [
        new DateNetEnergy(new Date("2022-08-14T16:15:00.000Z"), new NetEnergy(266, 645, 0, 379)),
        new DateNetEnergy(new Date("2022-08-14T16:30:00.000Z"), new NetEnergy(180, 632, 0, 452))]

    const file = path.resolve(__dirname, 'sample-net-energy.csv')
    const fileContent = fs.readFileSync(file, {encoding: 'utf-8'})

    const actuals = readNetEnergy(fileContent)
    expect(actuals).toEqual(expecteds)
})

test('read a csv containg net energy entries with an other date format', () => {
    const expecteds: DateNetEnergy[] = [
        new DateNetEnergy(new Date("2024-05-17T18:15:00.000Z"), new NetEnergy(159, 69, 90, 0)),
        new DateNetEnergy(new Date("2024-05-17T18:30:00.000Z"), new NetEnergy(199, 241, 0, 42))]

    const file = path.resolve(__dirname, 'sample-coutume.csv')
    const fileContent = fs.readFileSync(file, {encoding: 'utf-8'})

    const actuals = readNetEnergy(fileContent)
    expect(actuals).toEqual(expecteds)
})

