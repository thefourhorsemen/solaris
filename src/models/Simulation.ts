import {Battery} from "./Battery";
import {DateNetEnergy} from "./NetEnergy";
import {simulateBattery} from "../functions/simulateBattery";
import {simulateProduction} from "../functions/simulateProduction";

export class Simulation {
    battery: Battery
    productionFactor: number

    constructor(battery: Battery, productionFactor: number) {
        this.battery = battery
        this.productionFactor = productionFactor
    }

    updateBattery(battery: Battery, energies: DateNetEnergy[]) {
        this.battery = battery;
        return this.update(energies)
    }

    updateProduction(productionFactor: number, energies: DateNetEnergy[]) {
        this.productionFactor = productionFactor;
        return this.update(energies)
    }

    private update(energies: DateNetEnergy[]) {
        return simulateBattery(this.battery, simulateProduction(this.productionFactor, energies));
    }

}
