import React, {ChangeEvent} from "react";
import {Battery} from "../models/Battery";
import {DateNetEnergy} from "../models/NetEnergy";
import "./BatteryDefinition.css";
import {Simulation} from "../models/Simulation";

interface SetBatteryProps {
    simulation: Simulation
    energies: DateNetEnergy[]
    setEnergies: (energies: DateNetEnergy[]) => void
}

function onBatteryChange(simulation: Simulation, energies: DateNetEnergy[], setEnergies: (energies: DateNetEnergy[]) => void) {
    return (event: ChangeEvent<HTMLInputElement>) => {
        const simulatedEnergies = simulation.updateBattery(new Battery(1000 * event.target.valueAsNumber), energies)
        setEnergies(simulatedEnergies)
    };
}

const BatteryDefinition = ({simulation, energies, setEnergies}: SetBatteryProps) => {
    return <>
        <label className="battery-definition__label" htmlFor="batteryCapacity">Battery capacity in kWh</label>
        <input type="number" id="batteryCapacity" name="batteryCapacity" min="0" max="200" defaultValue="0"
               onChange={onBatteryChange(simulation, energies, setEnergies)}/>
    </>
}

export default BatteryDefinition