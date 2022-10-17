import {groupBy, transformMap} from "./Util";
import {NetEnergy} from "../models/NetEnergy";

// TODO
test('day string', () => {
  const energy1 = new NetEnergy(new Date("2022-08-14T16:15:00.000Z"), 266, 645, 0, 379)
  const energy2 = new NetEnergy(new Date("2022-08-14T17:15:00.000Z"), 266, 645, 0, 379)

  const energies = [energy1, energy2]

  const result = groupBy(energies, energy => Date.UTC(energy.date.getFullYear(), energy.date.getMonth(), energy.date.getDate()))
  console.log(result)

  const newVar = (s: number[], v: NetEnergy) => [s[0] + v.production, s[1] + v.consumption, s[2] + v.exported, s[3] + v.imported]
  const init = [0, 0, 0, 0]
  const metrics = transformMap(result, values => values.reduce(newVar, init))
  metrics.forEach((v, k) => console.log(new Date(k)))
  console.log(metrics)
})