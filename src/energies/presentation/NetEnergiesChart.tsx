import React from "react";
import {NetEnergy} from "../common/NetEnergy";
import {Chart} from "react-google-charts";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const NetEnergiesChart = ({energies}: NetEnergiesProps) => {
  const data = [["Time", "Production", "Consumption", "Exported", "Imported"]]
  const rows = energies.map((it: NetEnergy) => it.to())

  // @ts-ignore
  rows.forEach((it: []) => data.push(it))

  console.log(data)

  const options = {
    title: "Solar panel tracking",
    vAxis: {title: "Wh"},
    hAxis: {title: "Time"},
    seriesType: "bars",
    isStacked: true,
    colors: ['blue', 'orange', 'grey', 'grey']
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
