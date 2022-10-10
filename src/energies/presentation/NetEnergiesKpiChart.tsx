import React from "react";
import {NetEnergy} from "../common/NetEnergy";
import {Chart} from "react-google-charts";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const NetEnergiesKpiChart = ({energies}: NetEnergiesProps) => {
  const result = energies.reduce((acc, val) => ({
    production: acc.production + val.production,
    consumption: acc.consumption + val.consumption,
    exported: acc.exported + val.exported,
    imported: acc.imported + val.imported
  }), {production: 0, consumption: 0, exported: 0, imported: 0})

  const autoConsumptionEnergy = result.production - result.exported

  const prodData = [["Energy", "kWh"], ["Locally consumed", autoConsumptionEnergy], ["Exported", result.exported]]
  const prodOptions = {
    title: "Production",
    pieHole: 0.4,
    is3D: false,
    colors: ['green', 'grey']
  };

  const consData = [["Energy", "kWh"], ["Locally consumed", autoConsumptionEnergy], ["Imported", result.imported]]
  const consOptions = {
    title: "Consumption",
    pieHole: 0.4,
    is3D: false,
    colors: ['green', 'grey']
  };

  return (
      <div>
        <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            options={prodOptions}
            data={prodData}
        />
        <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            options={consOptions}
            data={consData}
        />
      </div>
  )
}

export default NetEnergiesKpiChart
