import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {IoFolderOpenOutline} from "react-icons/all";
import {readNetEnergy} from "./energies/readNetEnergy";
import {NetEnergy} from "./energies/NetEnergy";
import NetEnergiesTable from "./energies/NetEnergiesTable";

function App() {
  // data state variable defaulted to an empty array
  const initialState: NetEnergy[] = []
  const [netEnergies, setNetEnergies] = useState(initialState);

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = (e) => {
      // @ts-ignore
      const content = e.target.result
      // @ts-ignore
      const energies = readNetEnergy(content)
      setNetEnergies(energies)
    }
    // @ts-ignore
    reader.readAsText(event.target.files[0])
  }

  return (
      <div className="App">
        <div className="file-input">
          <label htmlFor="file-input"><IoFolderOpenOutline/> Select the csv file ...
          </label>
          <input id="file-input" type="file" onChange={changeHandler}/>
        </div>

        <div className="container">
          <NetEnergiesTable energies={netEnergies}/>
        </div>
      </div>
  );
}

export default App;
