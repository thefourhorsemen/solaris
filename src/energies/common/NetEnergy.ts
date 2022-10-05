import {DateTime} from "luxon"

export class NetEnergy {
  date: Date // FIXME use milliseconds from EPOCH
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

  to(): [Date, number, number, number, number] {
    return [this.date, this.production, -this.consumption, -this.exported, this.imported]
  }

  toDaily(): [string, number] {
    return [this.date.getHours() + ":" + this.date.getMinutes(), this.production]
  }
}
