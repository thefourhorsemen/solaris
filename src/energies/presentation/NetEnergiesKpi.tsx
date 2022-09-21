import React from "react";
import {NetEnergy} from "../common/NetEnergy";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const NetEnergiesKpi = ({energies}: NetEnergiesProps) => {

  const result = energies.reduce((acc, val) => ({
    production: acc.production + val.production,
    consumption: acc.consumption + val.consumption,
    imported: acc.imported + val.imported,
    exported: acc.exported + val.exported
  }), {production: 0, consumption: 0, imported: 0, exported: 0})

  const autoConsumptionEnergy = result.production - result.exported
  // the percentage of the home energy consumption filled by PV
  const autoProduction = Math.round(autoConsumptionEnergy / result.consumption * 100)
  // the percentage of the energy produced by PV that is consumed by home
  const autoConsumption = Math.round(autoConsumptionEnergy / result.production * 100)

  return (
      <>
        <h1>Kpis</h1>
        <p>Production: {result.production}</p>
        <p>Consumption: {result.consumption}</p>
        <p>Exported: {result.exported}</p>
        <p>Imported: {result.imported}</p>
        <p>Auto Production: {autoProduction}%</p>
        <p>Auto Consumption: {autoConsumption}%</p>
      </>
  )
}

export default NetEnergiesKpi