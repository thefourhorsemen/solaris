import React, {useState} from 'react';
import './App.css';
import {NetEnergy} from "./energies/common/NetEnergy";
import EnergiesSelect from "./energies/selection/EnergiesSelect";
import EnergiesDisplay from "./energies/presentation/EnergiesDisplay";

function App() {
  const initialState: NetEnergy[] = []
  const [netEnergies, setNetEnergies] = useState(initialState);

  return (
      <div className="App">
        <div className="container">
          <div className="inner">
            <EnergiesSelect setEnergies={setNetEnergies}/>
            <EnergiesDisplay energies={netEnergies}/>
          </div>
        </div>
      </div>
  )
}

export default App;
