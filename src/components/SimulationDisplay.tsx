import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import BatteryDefinition from "./BatteryDefinition";
import {DateNetEnergy} from "../models/NetEnergy";
import ProductionModification from "./ProductionModification";
import {Battery} from "../models/Battery";
import {Simulation} from "../models/Simulation";

interface SetBatteryProps {
    energies: DateNetEnergy[]
    setEnergies: (energies: DateNetEnergy[]) => void
}

const SimulationDisplay = ({energies, setEnergies}: SetBatteryProps) => {
    const [simulation, _] = useState(new Simulation(new Battery(0), 1))

    return <>
        <Row>
            <Col md={4} center>
                <BatteryDefinition simulation={simulation} energies={energies} setEnergies={setEnergies}/>
            </Col>
            <Col md={4} center>
                <ProductionModification simulation={simulation} energies={energies} setEnergies={setEnergies}/>
            </Col>
        </Row>
    </>
}

export default SimulationDisplay