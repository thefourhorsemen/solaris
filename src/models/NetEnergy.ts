import {DateTime, Settings} from "luxon"

export class DateNetEnergy {
    date: Date
    energy: NetEnergy

    constructor(date: Date, energy: NetEnergy) {
        this.date = date
        this.energy = energy
    }

    static of(row: string[]): DateNetEnergy {
        const date = this.date(row[0]).toJSDate()
        const production = parseInt(row[1])
        const consumption = parseInt(row[2])
        const exported = parseInt(row[3])
        const imported = parseInt(row[4])
        return new DateNetEnergy(date, new NetEnergy(production, consumption, exported, imported, 0))
    }

    private static date(value: string) {
        Settings.throwOnInvalid = true;
        try {
            return DateTime.fromFormat(value, 'yyyy-MM-dd hh:mm:ss ZZZ')
        } catch (error) {
            return DateTime.fromFormat(value, 'MM/dd/yyyy hh:mm', {zone: "utc"})
        }
    }

    to(): [Date, number, number, number, number] {
        return [this.date, this.energy.production, -this.energy.consumption, -this.energy.exported, this.energy.imported]
    }
}

export class NetEnergy {
    production: number
    consumption: number
    exported: number
    imported: number
    stored: number

    constructor(production: number, consumption: number, exported: number, imported: number, stored: number) {
        this.production = production
        this.consumption = consumption
        this.exported = exported
        this.imported = imported
        this.stored = stored
    }

    static sum(energies: NetEnergy[]): NetEnergy {
        const summed = NetEnergy.sumEnergies(energies)
        return new NetEnergy(summed.production, summed.consumption, summed.exported, summed.imported, summed.stored)
    }

    static average(energies: NetEnergy[]): NetEnergy {
        const summed = NetEnergy.sumEnergies(energies)
        const count = energies.length
        return new NetEnergy(summed.production / count, summed.consumption / count, summed.exported / count, summed.imported / count, summed.stored / count)
    }

    private static sumEnergies(energies: NetEnergy[]) {
        return energies.reduce((acc, val) => ({
            production: acc.production + val.production,
            consumption: acc.consumption + val.consumption,
            exported: acc.exported + val.exported,
            imported: acc.imported + val.imported,
            stored: acc.stored + val.stored
        }), {production: 0, consumption: 0, exported: 0, imported: 0, stored: 0})
    }

}
