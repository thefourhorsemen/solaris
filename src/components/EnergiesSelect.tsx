import React from "react";
import InputNetEnergiesFile from "./InputNetEnergiesFile";
import {DateNetEnergy} from "../models/NetEnergy";

interface SetNetEnergiesProps {
  setEnergies: (energies: DateNetEnergy[]) => void
}

const EnergiesSelect = ({setEnergies}: SetNetEnergiesProps) => {
  return <InputNetEnergiesFile setEnergies={setEnergies}/>
}

export default EnergiesSelect