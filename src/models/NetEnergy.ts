import {DateTime} from "luxon"

export class NetEnergy {
  date: Date
  production: number
  consumption: number
  exported: number
  imported: number

  constructor(date: Date, production: number, consumption: number, exported: number, imported: number) {
    this.date = date
    this.production = production
    this.consumption = consumption
    this.exported = exported
    this.imported = imported
  }

  static of(row: string[]): NetEnergy {
    const date = DateTime.fromFormat(row[0], 'yyyy-MM-dd hh:mm:ss ZZZ').toJSDate()
    const production = parseInt(row[1])
    const consumption = parseInt(row[2])
    const exported = parseInt(row[3])
    const imported = parseInt(row[4])
    return new NetEnergy(date, production, consumption, exported, imported)
  }

  static from(date: Date, obj: { production: number, consumption: number, exported: number, imported: number }): NetEnergy {
    return new NetEnergy(date, obj.production, obj.consumption, obj.exported, obj.imported)
  }

  static average(date: Date, obj: { production: number, consumption: number, exported: number, imported: number, count: number }): NetEnergy {
    return new NetEnergy(date, obj.production / obj.count, obj.consumption / obj.count, obj.exported / obj.count, obj.imported / obj.count)
  }

  static sumEnergies(energies: NetEnergy[]) {
    return energies.reduce((acc, val) => ({
      production: acc.production + val.production,
      consumption: acc.consumption + val.consumption,
      exported: acc.exported + val.exported,
      imported: acc.imported + val.imported,
      count: acc.count + 1
    }), {production: 0, consumption: 0, exported: 0, imported: 0, count: 0})
  }

  to(): [Date, number, number, number, number] {
    return [this.date, this.production, -this.consumption, -this.exported, this.imported]
  }

  toDaily(): [string, number] {
    return [this.date.getHours() + ":" + this.date.getMinutes(), this.production]
  }
}
