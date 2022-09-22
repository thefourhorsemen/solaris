import React from "react";
import {NetEnergy} from "../common/NetEnergy";
import NetEnergiesKpiChart from "./NetEnergiesKpiChart";
import NetEnergiesDetailChart from "./NetEnergiesDetailChart";

interface NetEnergiesProps {
  date: Date,
  energies: NetEnergy[];
}

const day = (date: Date): string => {
  return date && date.toDateString() || "no date"
}

const selectEnergies = (date: Date, energies: NetEnergy[]): NetEnergy[] => {
  return energies.filter(energy => energy.date.toDateString() === day(date)) || []
}

const EnergiesDisplayChart = ({date, energies}: NetEnergiesProps) => {
  const selectedEnergies = selectEnergies(date, energies)
  if (selectedEnergies.length === 0) {
    return (<></>)
  }
  return (
      <>
        <NetEnergiesDetailChart energies={selectedEnergies}/>
        <NetEnergiesKpiChart energies={selectedEnergies}/>
      </>
  )
}

export default EnergiesDisplayChart