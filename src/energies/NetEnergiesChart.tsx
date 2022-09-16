import React from "react";
import {NetEnergy} from "./NetEnergy";
import {Chart} from "react-google-charts";

interface NetEnergyListProps {
  energies: NetEnergy[];
}

const NetEnergiesChart = ({energies}: NetEnergyListProps) => {
  const data = [["Time", "Production", "Consumption", "Exported", "Imported"]]
  const rows = energies.map((it: NetEnergy) => it.to())

  // @ts-ignore
  rows.forEach((it: []) => data.push(it))

  console.log(data)

  const options = {
    title: "Solar panel tracking",
    vAxis: {title: "Wh"},
    hAxis: {title: "Time"},
    seriesType: "bars"
  };

  return (
      <Chart
          chartType="ComboChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
      />
  )
}

export default NetEnergiesChart
