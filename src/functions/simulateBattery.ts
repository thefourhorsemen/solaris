// @ts-ignore
import {DateNetEnergy, NetEnergy} from "../models/NetEnergy";
// @ts-ignore
import {Battery} from "../models/Battery";

const simBattery = (battery: Battery, dateEnergy: DateNetEnergy): DateNetEnergy => {
    const date = dateEnergy.date
    const energy = dateEnergy.energy

    let exported = energy.exported
    let imported = energy.imported
    let stored = 0
    let released = 0

    if (exported > 0) {
        stored = battery.put(exported)
        exported -= stored
    }

    if (imported > 0) {
        released = battery.get(imported)
        imported -= released
    }

    const simEnergy = new NetEnergy(energy.production, energy.consumption, exported, imported, stored, released, battery.soc())
    return new DateNetEnergy(date, simEnergy)
}

export const simulateBattery = (battery: Battery, energies: DateNetEnergy[]): DateNetEnergy[] => {
    return energies.map(energy => simBattery(battery, energy))
}