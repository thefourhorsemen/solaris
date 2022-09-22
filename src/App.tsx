import React, {useState} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import {NetEnergy} from "./energies/common/NetEnergy"
import EnergiesSelect from "./energies/selection/EnergiesSelect"
import About from "./About";
import NoMatch from "./NoMatch";
import EnergiesDisplay from "./energies/presentation/EnergiesDisplay";

function App() {
  const initialState: NetEnergy[] = []
  const [netEnergies, setNetEnergies] = useState(initialState)

  const main = <div className="App">
    <div className="container">
      <h1> Track and optimize your solar panels production
        <div className="inner">
          <EnergiesSelect setEnergies={setNetEnergies}/>
        </div>
      </h1>
    </div>
  </div>

  const histogram = <div className="App">
    <div className="container">
      <div className="inner">
        <EnergiesDisplay energies={netEnergies}/>
      </div>
    </div>
  </div>

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={main}/>
          <Route path="/display" element={histogram}/>
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<NoMatch/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
