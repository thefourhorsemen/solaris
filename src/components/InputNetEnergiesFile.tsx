import React, {ChangeEvent} from "react";
import {IoFolderOpenOutline} from "react-icons/io5";
import {DateNetEnergy} from "../models/NetEnergy";
import {useNavigate} from "react-router-dom";
import {readNetEnergy} from "../functions/readNetEnergy";

interface SetNetEnergiesProps {
  setEnergies: (energies: DateNetEnergy[]) => void
}

const InputNetEnergiesFile = ({setEnergies}: SetNetEnergiesProps) => {
  let navigate = useNavigate();

  const inputHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const files = Array.from(event.target.files || []).map(file => {
      // Define a new file reader
      const reader = new FileReader()
      // Create a new promise
      return new Promise(resolve => {
        // Resolve the promise after reading file
        reader.onload = () => resolve(reader.result)
        // Read the file as a text
        reader.readAsText(file)
      });
    });

    // At this point you'll have an array of results
    const contents = await Promise.all(files);
    // @ts-ignore
    const energies = contents.map(content => readNetEnergy(content)).reduce((a, b) => a.concat(b))
    setEnergies(energies)
    navigate('/display')
  }

  return <>
    <div className="file-input">
      <label htmlFor="file-input"><IoFolderOpenOutline size="100px"/></label>
      <input id="file-input" type="file" onInput={inputHandler} multiple={true}/>
    </div>
  </>
}

export default InputNetEnergiesFile