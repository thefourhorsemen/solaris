// @ts-ignore
import {DateNetEnergy, NetEnergy} from "../models/NetEnergy";

const simProduction = (factor: number, dateEnergy: DateNetEnergy): DateNetEnergy => {
    const date = dateEnergy.date
    const energy = dateEnergy.energy

    let production = energy.production;
    production *= factor
    const consumption = energy.consumption;
    let exported = energy.exported
    let imported = energy.imported

    if (production >= consumption) {
        exported = production - consumption
        imported = 0
    } else {
        exported = 0
        imported = consumption - production
    }

    const simEnergy = new NetEnergy(production, consumption, exported, imported, 0, 0, 0)
    return new DateNetEnergy(date, simEnergy)
}

export const simulateProduction = (factor: number, energies: DateNetEnergy[]): DateNetEnergy[] => {
    return energies.map(energy => simProduction(factor, energy))
}