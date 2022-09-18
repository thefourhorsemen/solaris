import React from "react";
import {NetEnergy} from "../common/NetEnergy";
import NetEnergiesChart from "./NetEnergiesChart";
import NetEnergiesKpi from "./NetEnergiesKpi";
import NetEnergiesDailyChart from "./NetEnergiesDailyChart";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const EnergiesDisplay = ({energies}: NetEnergiesProps) => {
  return (
      <>
        <NetEnergiesChart energies={energies}/>
        <NetEnergiesDailyChart energies={energies}/>
        <NetEnergiesKpi energies={energies}/>
      </>
  )
}

export default EnergiesDisplay