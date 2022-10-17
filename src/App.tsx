import React, {useState} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import {NetEnergy} from "./energies/common/NetEnergy"
import EnergiesSelect from "./energies/selection/EnergiesSelect"
import About from "./About";
import NoMatch from "./NoMatch";
import EnergiesDisplay from "./energies/presentation/EnergiesDisplay";
import {Card} from "react-bootstrap";

function App() {
  const initialState: NetEnergy[] = []
  const [netEnergies, setNetEnergies] = useState(initialState)

  const decorate = (element: JSX.Element) => {
    return <Card className="text-center">
      <Card.Header>Track and optimize your solar panels production</Card.Header>
      <Card.Body>{element}</Card.Body>
      <Card.Footer style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0
      }}>Solaris copyright @ {new Date().getFullYear()}</Card.Footer>
    </Card>
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={decorate(<EnergiesSelect setEnergies={setNetEnergies}/>)}/>
          <Route path="/display" element={decorate(<EnergiesDisplay energies={netEnergies}/>)}/>
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<NoMatch/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
