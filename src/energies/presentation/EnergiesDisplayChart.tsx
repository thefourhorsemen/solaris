import React from "react";
import {NetEnergy} from "../common/NetEnergy";
import NetEnergiesKpiChart from "./NetEnergiesKpiChart";
import NetEnergiesDetailChart from "./NetEnergiesDetailChart";
import {DateSelection} from "../common/DateSelection";
import {groupBy, transformMap} from "../common/Util";

interface NetEnergiesProps {
  date: DateSelection,
  energies: NetEnergy[];
}

// TODO refactor it
const selectEnergies = (date: DateSelection, energies: NetEnergy[]): NetEnergy[] => {
  const netEnergies = energies.filter(energy => date.match(energy.date)) || []

  const grouped = groupBy(netEnergies, energy => {
    const grouper = date.grouper()
    return grouper(energy.date)
  })

  const reduction = (s: number[], v: NetEnergy) => [s[0] + v.production, s[1] + v.consumption, s[2] + v.exported, s[3] + v.imported]
  const init = [0, 0, 0, 0]
  const consolidated = transformMap(grouped, values => values.reduce(reduction, init))

  const result: NetEnergy[] = []
  consolidated.forEach((v, k) => result.push(new NetEnergy(new Date(k), v[0], v[1], v[2], v[3])))
  return result
}

const EnergiesDisplayChart = ({date, energies}: NetEnergiesProps) => {
  const selectedEnergies = selectEnergies(date, energies)
  if (selectedEnergies.length === 0) {
    return (<></>)
  }
  return (
      <div className='rowC'>
        <NetEnergiesDetailChart energies={selectedEnergies}/>
        <NetEnergiesKpiChart energies={selectedEnergies}/>
      </div>
  )
}

export default EnergiesDisplayChart