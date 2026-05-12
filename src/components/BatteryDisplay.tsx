import React from "react";
import {Battery} from "../models/Battery";
import {Col, Row} from "react-bootstrap";
import BatteryDefinition from "./BatteryDefinition";

interface SetBatteryProps {
    setBattery: (battery: Battery) => void
}

const BatteryDisplay = ({setBattery}: SetBatteryProps) => {
    return <>
        <Row>
            <Col md={4} center>
                <BatteryDefinition setBattery={setBattery}/>
            </Col>
        </Row>
    </>
}

export default BatteryDisplay