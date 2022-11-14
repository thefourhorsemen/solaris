import React, {useState} from "react";
import {DateNetEnergy} from "../models/NetEnergy";
import NetEnergiesDate from "./NetEnergiesDate";
import {DateRange, DateSelection} from "../models/DateSelection";
import {ChartType} from "../models/ChartType";
import EnergiesChart from "./EnergiesChart";

interface NetEnergiesProps {
  energies: DateNetEnergy[];
}

const RenderChart = (chartType: ChartType, currentDate: DateSelection, energies: DateNetEnergy[]) => {
  return <EnergiesChart date={currentDate} energies={energies} chartType={chartType}/>
}

const RenderAll = (energies: DateNetEnergy[]) => {
  const [currentDate, setCurrentDate] = useState(new DateSelection(DateRange.Day, energies[energies.length - 1].date))
  const [chartType, setChartType] = useState(ChartType.MEASURE)

  return <>
    <NetEnergiesDate date={currentDate} setDate={setCurrentDate} setChartType={setChartType}/>
    {RenderChart(chartType, currentDate, energies)}
  </>
}

const EnergiesDisplay = ({energies}: NetEnergiesProps) => {
  if (energies.length === 0) {
    return <div>Nothing to display</div>
  }

  return RenderAll(energies)
}

export default EnergiesDisplay