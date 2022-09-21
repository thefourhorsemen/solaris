import React from "react";
import {NetEnergy} from "../common/NetEnergy";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const NetEnergiesKpi = ({energies}: NetEnergiesProps) => {

  const result = energies.reduce((acc, val) => ({
    production: acc.production + val.production,
    consumption: acc.consumption + val.consumption,
    exported: acc.exported + val.exported
  }), {production: 0, consumption: 0, exported: 0})

  const autoConsumptionEnergy = result.production - result.exported
  // the percentage of the home energy consumption filled by PV
  const autoProduction = Math.round(autoConsumptionEnergy / result.consumption * 100)
  // the percentage of the energy produced by PV that is consumed by home
  const autoConsumption = Math.round(autoConsumptionEnergy / result.production * 100)

  return (
      <>
        <h1>Energy</h1>
        <p>
          <br/>Produced: {result.production / 1000} kWh ({autoConsumption}% consumed locally)
          <br/>Consumed: {result.consumption / 1000} kWh ({autoProduction}% filled by solar)
        </p>
      </>
  )
}

export default NetEnergiesKpi