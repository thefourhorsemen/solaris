import React, {useState} from "react";
import {NetEnergy} from "../models/NetEnergy";
import NetEnergiesDate from "./NetEnergiesDate";
import EnergiesDisplayChart from "./EnergiesDisplayChart";
import {DateRange, DateSelection} from "../models/DateSelection";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const EnergiesDisplay = ({energies}: NetEnergiesProps) => {
  if (energies.length === 0) {
    return <div>Nothing to display</div>
  }

  const [currentDate, setCurrentDate] = useState(new DateSelection(DateRange.Day, energies[energies.length - 1].date))
  return <>
    <NetEnergiesDate date={currentDate} setDate={setCurrentDate}/>
    <EnergiesDisplayChart date={currentDate} energies={energies}/>
  </>
}

export default EnergiesDisplay