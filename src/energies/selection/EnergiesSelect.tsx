import React from "react";
import InputNetEnergiesFile from "./InputNetEnergiesFile";
import {NetEnergy} from "../common/NetEnergy";

interface SetNetEnergiesProps {
  setEnergies: (energies: NetEnergy[]) => void
}

const EnergiesSelect = ({setEnergies}: SetNetEnergiesProps) => {
  return (
      <>
        <InputNetEnergiesFile setEnergies={setEnergies}/>
      </>
  )
}

export default EnergiesSelect