// @ts-ignore
import {DateNetEnergy, NetEnergy} from "../models/NetEnergy";
// @ts-ignore
import {Battery} from "../models/Battery";

const simBattery = (battery: Battery, dateEnergy: DateNetEnergy): DateNetEnergy => {
    const date = dateEnergy.date
    const energy = dateEnergy.energy

    const exported = energy.exported
    if (exported > 0) {
        const stored = battery.put(exported)
        const notStored = exported - stored
        const batEnergy = new NetEnergy(energy.production, energy.consumption, notStored, energy.imported)
        return new DateNetEnergy(date, batEnergy)
    }

    const imported = energy.imported
    if (imported > 0) {
        const released = battery.get(imported)
        const notReleased = imported - released
        const batEnergy = new NetEnergy(energy.production, energy.consumption, energy.exported, notReleased)
        return new DateNetEnergy(date, batEnergy)
    }

    return dateEnergy;
}

export const simulateBattery = (battery: Battery, energies: DateNetEnergy[]): DateNetEnergy[] => {
    battery.reset()
    return energies.map(energy => simBattery(battery, energy))
}