import React, {Suspense, useState} from 'react'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom"
import './App.css'
import {NetEnergy} from "./models/NetEnergy"
import {Card} from "react-bootstrap";
import LoadingSpinner from "./components/LoadingSpinner";

const EnergiesSelect = React.lazy(() => import('./components/EnergiesSelect'))
const EnergiesDisplay = React.lazy(() => import('./components/EnergiesDisplay'))
const NoMatch = React.lazy(() => import('./components/NoMatch'))
const About = React.lazy(() => import('./components/About'))

const App = () => {
  const decorate = (element: JSX.Element) => {
    return <Card className="text-center">
      <Card.Header>Track and optimize your solar panels production (<NavLink
          to="/">home</NavLink>)</Card.Header>
      <Card.Body>{element}</Card.Body>
      <Card.Footer style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0
      }}>Solaris Copyright @ {new Date().getFullYear()}</Card.Footer>
    </Card>
  }

  const initialState: NetEnergy[] = []
  const [netEnergies, setNetEnergies] = useState(initialState)

  return (
      <BrowserRouter>
        <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
          <Routes>
            <Route path="/" element={decorate(<EnergiesSelect setEnergies={setNetEnergies}/>)}/>
            <Route path="/display" element={decorate(<EnergiesDisplay energies={netEnergies}/>)}/>
            <Route path="/about" element={<About/>}/>
            <Route path="*" element={<NoMatch/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

export default App
