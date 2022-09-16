import React, {useState} from 'react';
import './App.css';
import {NetEnergy} from "./energies/NetEnergy";
import NetEnergiesTable from "./energies/NetEnergiesTable";
import InputNetEnergiesFile from "./energies/InputNetEnergiesFile";

function App() {
  const initialState: NetEnergy[] = []
  const [netEnergies, setNetEnergies] = useState(initialState);

  return (
      <div className="App">
        <div className="container">
          <div className="inner">
            <InputNetEnergiesFile setEnergies={setNetEnergies}/>
            <NetEnergiesTable energies={netEnergies}/>
          </div>
        </div>
      </div>
  )
}

export default App;
