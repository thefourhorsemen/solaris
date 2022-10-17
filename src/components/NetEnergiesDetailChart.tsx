import React from "react";
import {NetEnergy} from "../models/NetEnergy";
import {Chart} from "react-google-charts";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const NetEnergiesDetailChart = ({energies}: NetEnergiesProps) => {
  const data = [["Time", "Production", "Consumption", "Exported", "Imported"]]
  const rows = energies.map((it: NetEnergy) => it.to())

  // @ts-ignore
  rows.forEach((it: []) => data.push(it))

  const options = {
    title: "Solar panel tracking",
    vAxis: {title: "Wh"},
    hAxis: {title: "Time"},
    legend: {position: 'bottom'},
    seriesType: "bars",
    isStacked: true,
    colors: ['blue', 'orange', 'grey', "#424242"]
  };

  return <Chart
      chartType="ComboChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
  />
}

export default NetEnergiesDetailChart
