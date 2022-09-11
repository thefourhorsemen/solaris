export class NetEnergy {
  date: Date | undefined
  production: number | undefined
  consumption: number | undefined
  exported: number | undefined
  imported: number | undefined

  static of(row: string[]): NetEnergy {
    return {
      date: new Date(row[0]),
      production: parseInt(row[1]),
      consumption: parseInt(row[2]),
      exported: parseInt(row[3]),
      imported: parseInt(row[4])
    }
  }
}
