import React from "react";
import {NetEnergy} from "../common/NetEnergy";
import NetEnergiesKpiChart from "./NetEnergiesKpiChart";
import NetEnergiesDetailChart from "./NetEnergiesDetailChart";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const EnergiesDisplay = ({energies}: NetEnergiesProps) => {
  return (
      <>
        <NetEnergiesKpiChart energies={energies}/>
        <NetEnergiesDetailChart energies={energies}/>
      </>
  )
}

export default EnergiesDisplay