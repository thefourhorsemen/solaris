import {simulateBattery} from "./simulateBattery";
import {DateNetEnergy, NetEnergy} from "../models/NetEnergy";
import {Battery} from "../models/Battery";

test('simulate the use of a battery', () => {
    const energies: DateNetEnergy[] = [
        new DateNetEnergy(new Date("2022-08-14T16:15:00.000Z"), new NetEnergy(266, 645, 0, 379, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T16:30:00.000Z"), new NetEnergy(180, 632, 0, 452, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T16:45:00.000Z"), new NetEnergy(271, 72, 199, 0, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T17:00:00.000Z"), new NetEnergy(467, 99, 368, 0, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T17:15:00.000Z"), new NetEnergy(266, 645, 0, 379, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T17:30:00.000Z"), new NetEnergy(180, 632, 0, 452, 0, 0, 0))]

    const actuals = simulateBattery(new Battery(5000), energies)

    const expecteds: DateNetEnergy[] = [
        new DateNetEnergy(new Date("2022-08-14T16:15:00.000Z"), new NetEnergy(266, 645, 0, 379, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T16:30:00.000Z"), new NetEnergy(180, 632, 0, 452, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T16:45:00.000Z"), new NetEnergy(271, 72, 0, 0, 199, 0, 0.0398)),
        new DateNetEnergy(new Date("2022-08-14T17:00:00.000Z"), new NetEnergy(467, 99, 0, 0, 368, 0, 0.1134)),
        new DateNetEnergy(new Date("2022-08-14T17:15:00.000Z"), new NetEnergy(266, 645, 0, 0, 0, 379, 0.0376)),
        new DateNetEnergy(new Date("2022-08-14T17:30:00.000Z"), new NetEnergy(180, 632, 0, 264, 0, 188, 0))]

    expect(actuals).toEqual(expecteds)
})

