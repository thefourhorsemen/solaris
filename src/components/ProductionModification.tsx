import React, {ChangeEvent} from "react";
import {DateNetEnergy} from "../models/NetEnergy";
import {Simulation} from "../models/Simulation";

interface SetBatteryProps {
    simulation: Simulation
    energies: DateNetEnergy[]
    setEnergies: (energies: DateNetEnergy[]) => void
}

function onProductionChange(simulation: Simulation, energies: DateNetEnergy[], setEnergies: (energies: DateNetEnergy[]) => void) {
    return (event: ChangeEvent<HTMLInputElement>) => {
        const simulatedEnergies = simulation.updateProduction(event.target.valueAsNumber, energies);
        setEnergies(simulatedEnergies)
    };
}

const ProductionModification = ({simulation, energies, setEnergies}: SetBatteryProps) => {
    return <>
        <label className="production-modification__label" htmlFor="productionModification">Production factor</label>
        <input type="number" id="productionModification" name="productionModification"
               defaultValue="1"
               onChange={onProductionChange(simulation, energies, setEnergies)}/>
    </>
}

export default ProductionModification