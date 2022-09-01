import {NetEnergy, readNetEnergy} from "./readNetEnergy";

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
  expect(readNetEnergy('sample-net-energy.csv')).toEqual(expecteds)
});

