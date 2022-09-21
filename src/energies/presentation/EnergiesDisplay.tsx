import React from "react";
import {NetEnergy} from "../common/NetEnergy";
import NetEnergiesChart from "./NetEnergiesChart";
import NetEnergiesKpi from "./NetEnergiesKpi";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const EnergiesDisplay = ({energies}: NetEnergiesProps) => {
  return (
      <>
        <NetEnergiesKpi energies={energies}/>
        <NetEnergiesChart energies={energies}/>
      </>
  )
}

export default EnergiesDisplay