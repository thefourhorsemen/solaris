import React from "react";
import {Battery} from "../models/Battery";

interface SetBatteryProps {
    setBattery: (battery: Battery) => void
}

const BatteryDefinition = ({setBattery}: SetBatteryProps) => {
    return <>
        <label htmlFor="batteryCapacity">Battery capacity in kWh</label>
        <input type="number" id="batteryCapacity" name="batteryCapacity" min="0" max="200" defaultValue="0"
               onChange={(event) => setBattery(new Battery(1000 * event.target.valueAsNumber))}/>
    </>
}

export default BatteryDefinition