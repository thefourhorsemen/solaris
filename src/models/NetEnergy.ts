import {DateTime} from "luxon"

export class DateNetEnergy {
  date: Date
  energy: NetEnergy

  constructor(date: Date, energy: NetEnergy) {
    this.date = date
    this.energy = energy
  }

  static of(row: string[]): DateNetEnergy {
    const date = DateTime.fromFormat(row[0], 'yyyy-MM-dd hh:mm:ss ZZZ').toJSDate()
    const production = parseInt(row[1])
    const consumption = parseInt(row[2])
    const exported = parseInt(row[3])
    const imported = parseInt(row[4])
    return new DateNetEnergy(date, new NetEnergy(production, consumption, exported, imported))
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

  constructor(production: number, consumption: number, exported: number, imported: number) {
    this.production = production
    this.consumption = consumption
    this.exported = exported
    this.imported = imported
  }

  static sum(energies: NetEnergy[]): NetEnergy {
    const summed = NetEnergy.sumEnergies(energies)
    return new NetEnergy(summed.production, summed.consumption, summed.exported, summed.imported)
  }

  static average(energies: NetEnergy[]): NetEnergy {
    const summed = NetEnergy.sumEnergies(energies)
    const count = energies.length
    return new NetEnergy(summed.production / count, summed.consumption / count, summed.exported / count, summed.imported / count)
  }

  private static sumEnergies(energies: NetEnergy[]) {
    return energies.reduce((acc, val) => ({
      production: acc.production + val.production,
      consumption: acc.consumption + val.consumption,
      exported: acc.exported + val.exported,
      imported: acc.imported + val.imported,
    }), {production: 0, consumption: 0, exported: 0, imported: 0})
  }

}
