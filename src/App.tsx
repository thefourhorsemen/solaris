import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {IoFolderOpenOutline} from "react-icons/all";
import {readNetEnergy} from "./energies/readNetEnergy";
import {NetEnergy} from "./energies/NetEnergy";

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
          <h1>Simple Inventory Table</h1>
          <table>
            <thead>
            <tr>
              <th>Production</th>
              <th>Consumption</th>
              <th>Imported</th>
              <th>Exported</th>
            </tr>
            </thead>
            <tbody>
            {
              netEnergies.map((item) => (
                  <tr>
                    <td>{item.production}</td>
                    <td>{item.consumption}</td>
                    <td>{item.imported}</td>
                    <td>{item.exported}</td>
                    <td/>
                  </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default App;
