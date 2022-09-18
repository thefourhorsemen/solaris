import React from "react";
import {NetEnergy} from "../common/NetEnergy";
import {Chart} from "react-google-charts";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const NetEnergiesDailyChart = ({energies}: NetEnergiesProps) => {
  const data = [["Time", "Production"]]
  const rows = energies.map((it: NetEnergy) => it.toDaily())

  // @ts-ignore
  rows.forEach((it: []) => data.push(it))

  console.log(data)

  const options = {
    title: "Solar panel tracking",
    vAxis: {title: "Wh"},
    hAxis: {title: "Time"},
    seriesType: "bars",
    bar: {groupWidth: "100%"}
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

export default NetEnergiesDailyChart
