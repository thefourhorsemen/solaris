import React, {ChangeEvent} from "react";
import {Battery} from "../models/Battery";
import {DateNetEnergy} from "../models/NetEnergy";
import {simulateBattery} from "../functions/simulateBattery";
import "./BatteryDefinition.css";

interface SetBatteryProps {
    energies: DateNetEnergy[]
    setEnergies: (energies: DateNetEnergy[]) => void
}

function onBatteryChange(energies: DateNetEnergy[], setEnergies: (energies: DateNetEnergy[]) => void) {
    return (event: ChangeEvent<HTMLInputElement>) => {
        const energiesWithBatterySimulation = simulateBattery(new Battery(1000 * event.target.valueAsNumber), energies)
        setEnergies(energiesWithBatterySimulation)
    };
}

const BatteryDefinition = ({energies, setEnergies}: SetBatteryProps) => {
    return <>
        <label className="battery-definition__label" htmlFor="batteryCapacity">Battery capacity in kWh</label>
        <input type="number" id="batteryCapacity" name="batteryCapacity" min="0" max="200" defaultValue="0"
               onChange={onBatteryChange(energies, setEnergies)}/>
    </>
}

export default BatteryDefinition