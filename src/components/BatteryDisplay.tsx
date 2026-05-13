import React from "react";
import {Col, Row} from "react-bootstrap";
import BatteryDefinition from "./BatteryDefinition";
import {DateNetEnergy} from "../models/NetEnergy";

interface SetBatteryProps {
    energies: DateNetEnergy[]
    setEnergies: (energies: DateNetEnergy[]) => void
}

const BatteryDisplay = ({energies, setEnergies}: SetBatteryProps) => {
    return <>
        <Row>
            <Col md={4} center>
                <BatteryDefinition energies={energies} setEnergies={setEnergies}/>
            </Col>
        </Row>
    </>
}

export default BatteryDisplay