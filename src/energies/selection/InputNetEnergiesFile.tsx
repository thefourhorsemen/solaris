import React, {ChangeEvent} from "react";
import {readNetEnergy} from "../common/readNetEnergy";
import {IoFolderOpenOutline} from "react-icons/all";
import {NetEnergy} from "../common/NetEnergy";
import {useNavigate} from "react-router-dom";

interface SetNetEnergiesProps {
  setEnergies: (energies: NetEnergy[]) => void
}

const InputNetEnergiesFile = ({setEnergies}: SetNetEnergiesProps) => {
  let navigate = useNavigate();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = (e) => {
      // @ts-ignore
      const content = e.target.result
      // @ts-ignore
      const energies = readNetEnergy(content)
      setEnergies(energies)

      navigate('/display')
    }
    // @ts-ignore
    reader.readAsText(event.target.files[0])
  }

  return (
      <>
        <div className="file-input">
          <label htmlFor="file-input"><IoFolderOpenOutline/> Select the csv file ...
          </label>
          <input id="file-input" type="file" onChange={changeHandler}/>
        </div>
      </>
  )
}

export default InputNetEnergiesFile