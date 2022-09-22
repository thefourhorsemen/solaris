import React, {useState} from "react";
import {NetEnergy} from "../common/NetEnergy";
import NetEnergiesDate from "./NetEnergiesDate";
import EnergiesDisplayChart from "./EnergiesDisplayChart";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const EnergiesDisplay = ({energies}: NetEnergiesProps) => {

  const [currentDate, setCurrentDate] = useState(energies[energies.length - 1].date)

  return (
      <>
        <NetEnergiesDate date={currentDate} setDate={setCurrentDate}/>
        <EnergiesDisplayChart date={currentDate} energies={energies}/>
      </>
  )
}

export default EnergiesDisplay