import {DateNetEnergy, NetEnergy} from "../models/NetEnergy";
import {simulateProduction} from "./simulateProduction";

test('simulate an increase of production', () => {
    const energies: DateNetEnergy[] = [
        new DateNetEnergy(new Date("2022-08-14T16:15:00.000Z"), new NetEnergy(266, 645, 0, 379, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T16:30:00.000Z"), new NetEnergy(180, 632, 0, 452, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T16:45:00.000Z"), new NetEnergy(271, 72, 199, 0, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T17:00:00.000Z"), new NetEnergy(467, 99, 368, 0, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T17:15:00.000Z"), new NetEnergy(266, 645, 0, 379, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T17:30:00.000Z"), new NetEnergy(180, 632, 0, 452, 0, 0, 0))]

    const actuals = simulateProduction(1.5, energies)

    const expecteds: DateNetEnergy[] = [
        new DateNetEnergy(new Date("2022-08-14T16:15:00.000Z"), new NetEnergy(399, 645, 0, 246, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T16:30:00.000Z"), new NetEnergy(270, 632, 0, 362, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T16:45:00.000Z"), new NetEnergy(406.5, 72, 334.5, 0, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T17:00:00.000Z"), new NetEnergy(700.5, 99, 601.5, 0, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T17:15:00.000Z"), new NetEnergy(399, 645, 0, 246, 0, 0, 0)),
        new DateNetEnergy(new Date("2022-08-14T17:30:00.000Z"), new NetEnergy(270, 632, 0, 362, 0, 0, 0))]

    expect(actuals).toEqual(expecteds)
})

