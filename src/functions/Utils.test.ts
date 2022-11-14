import {groupBy, transformMap} from "./Util";
import {DateNetEnergy, NetEnergy} from "../models/NetEnergy";

// TODO
test('day string', () => {
  const energy1 = new DateNetEnergy(new Date("2022-08-14T16:15:00.000Z"), new NetEnergy(266, 645, 0, 379))
  const energy2 = new DateNetEnergy(new Date("2022-08-14T17:15:00.000Z"), new NetEnergy(266, 645, 0, 379))

  const energies = [energy1, energy2]

  const result = groupBy(energies, energy => Date.UTC(energy.date.getFullYear(), energy.date.getMonth(), energy.date.getDate()), energy => energy)
  console.log(result)

  const newVar = (s: number[], v: DateNetEnergy) => [s[0] + v.energy.production, s[1] + v.energy.consumption, s[2] + v.energy.exported, s[3] + v.energy.imported]
  const init = [0, 0, 0, 0]
  const metrics = transformMap(result, values => values.reduce(newVar, init))
  metrics.forEach((v, k) => console.log(new Date(k)))
  console.log(metrics)
})